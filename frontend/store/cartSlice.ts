import CartItem from "@/types/CartItem";
import { CheckoutLineItem } from "@/types/CheckoutLineItem";
import { Order } from "@/types/Order";
import Product from "@/types/Product";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { RootState } from ".";

type InitialState = {
  cartItems: CartItem[];
  shippingTotal: number;
  grandTotal: number;
  checkoutLoading: boolean;
};

const initialState: InitialState = {
  cartItems: [],
  shippingTotal: 19.99,
  grandTotal: 0.0,
  checkoutLoading: false,
};

const placeOrderQuery = `
  mutation placeOrder($order: OrderCreateInput!) {
    orderCreate(input: $order) {
      order {
        id,
      }
    }
  }
`;

const stripeCheckoutQuery = `
  mutation StripeCheckout($line_items: [CheckoutLineItem!]!) {
    checkout(line_items: $line_items) {
      url
    }
  }
`;

const updateProductStockQuery = `
  mutation updateProductStock($id: ID!) {
    productUpdate(by: { id: $id }, input: { stock: { decrement: 1 } }) {
      product {
        id
        name
        stock
      }
    }
  }
`;

export const checkout = createAsyncThunk(
  "products/checkout",
  async ({ line_items }: { line_items: CheckoutLineItem[] }, thunk) => {
    const state = thunk.getState() as RootState;

    console.log(state);

    const checkoutResponse = await fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || "",
      },
      body: JSON.stringify({
        query: stripeCheckoutQuery,
        variables: {
          line_items: line_items.map((item) => ({
            quantity: item.quantity,
            price_data: {
              ...item.price_data,
              unit_amount: item.price_data.unit_amount * 100,
            },
          })),
        },
      }),
    });

    const data = await checkoutResponse.json();

    console.log(data);

    const order: Order = {
      currency: "USD",
      grandTotal: line_items.reduce(
        (prev, curr) => prev + curr.price_data.unit_amount,
        0
      ),
      shippingTotal: parseInt(state.cart.shippingTotal.toString()),
      items: line_items.map((item) => ({
        itemTotal: item.price_data.unit_amount,
        lineTotal: item.quantity * item.price_data.unit_amount,
        name: item.price_data.product_data.name,
        quantity: item.quantity,
      })),
    };

    const orderResponse = await fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || "",
      },
      body: JSON.stringify({
        query: placeOrderQuery,
        variables: {
          order,
        },
      }),
    });

    const orderResponseData = await orderResponse.json();

    console.log(orderResponseData);

    const ordersString = localStorage.getItem("orders");

    if (ordersString) {
      const orders = JSON.parse(ordersString) as Order[];
      orders.push(order);
      localStorage.setItem("orders", JSON.stringify(orders));
    } else {
      localStorage.setItem("orders", JSON.stringify([order]));
    }

    for (const items of order.items) {
      const product = state.products.products.find(
        (x) => x.node.name === items.name
      );

      if (!product) break;

      const updateProductStockResponse = await fetch(
        "http://localhost:4000/graphql",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || "",
          },
          body: JSON.stringify({
            query: updateProductStockQuery,
            variables: {
              id: product.node.id,
            },
          }),
        }
      );

      const updateProductStockData = await updateProductStockResponse.json();

      console.log(updateProductStockData);
    }

    return { url: data.data.checkout.url };
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    initializeCart: (state) => {
      const cartString = localStorage.getItem("cart");

      if (cartString) {
        state.cartItems = JSON.parse(cartString);
      } else {
        state.cartItems = [];
      }
    },
    addToCart: (
      state,
      action: PayloadAction<{ product: Product; quantity: number }>
    ) => {
      const { imageUrl, name, price, stock } = action.payload.product.node;
      const { quantity } = action.payload;
      const cartItem = state.cartItems.find((item) => item.node.name === name);

      if (cartItem) {
        const totalQuantity = cartItem.node.quantity + quantity;
        if (totalQuantity >= cartItem.node.stock) return;
        cartItem.node.quantity += quantity;
        return;
      }

      state.cartItems.push({
        node: { imageUrl, name, price, stock, quantity },
      });

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action: PayloadAction<{ name: string }>) => {
      const index = state.cartItems.findIndex(
        (item) => item.node.name === action.payload.name
      );

      state.cartItems.splice(index, 1);

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.setItem("cart", JSON.stringify([]));
    },
    modifyQuantity: (
      state,
      action: PayloadAction<{ type: "add" | "substract"; name: string }>
    ) => {
      const { type, name } = action.payload;
      const cartItem = state.cartItems.find((item) => item.node.name === name);

      if (!cartItem) return;

      if (type === "add") {
        if (cartItem.node.quantity >= cartItem.node.stock) {
          toast.error("Out of Stock");
          return;
        }
        cartItem.node.quantity += 1;
      } else {
        if (cartItem.node.quantity === 1) {
          state.cartItems.splice(state.cartItems.indexOf(cartItem), 1);
          return;
        }
        cartItem.node.quantity -= 1;
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    calculateGrandTotal: (state) => {
      state.grandTotal =
        state.cartItems.reduce(
          (total, item) => total + item.node.price * item.node.quantity,
          0
        ) + state.shippingTotal;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkout.pending, (state) => {
      state.checkoutLoading = true;
    });

    builder.addCase(checkout.fulfilled, (state, action) => {
      window.location.href = action.payload.url;

      state.checkoutLoading = false;
      state.cartItems = [];
      localStorage.setItem("cart", JSON.stringify([]));
      state.grandTotal = 0.0;
    });

    builder.addCase(checkout.rejected, (state, action) => {
      console.log({ error: action.error, payload: action.payload });
    });
  },
});

export const {
  addToCart,
  clearCart,
  removeFromCart,
  modifyQuantity,
  calculateGrandTotal,
  initializeCart,
} = cartSlice.actions;

export default cartSlice.reducer;
