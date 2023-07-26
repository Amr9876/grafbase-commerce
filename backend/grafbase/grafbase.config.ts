import { g, config } from "@grafbase/sdk";

const currency = g.enum("Currency", ["USD", "EUR", "GBP"]);

const orderItem = g.type("OrderItem", {
  name: g.string(),
  lineTotal: g.int(),
  itemTotal: g.int(),
  quantity: g.int(),
});

const order = g.model("Order", {
  items: g.ref(orderItem).optional().list().optional(),
  shippingTotal: g.int(),
  grandTotal: g.int(),
  currency: g.enumRef(currency),
});

const product = g
  .model("Product", {
    name: g.string(),
    slug: g.string().unique(),
    description: g.string(),
    imageUrl: g.url().optional(),
    stock: g.int(),
    price: g.int(),
  })
  .search();

const checkoutSession = g.type("CheckoutSession", {
  url: g.url(),
});

const productData = g.input("ProductData", {
  name: g.string(),
  images: g.string().list(),
});

const priceData = g.input("PriceData", {
  currency: g.enumRef(currency),
  product_data: g.inputRef(productData),
  unit_amount: g.float(),
});

const checkoutLineItem = g.input("CheckoutLineItem", {
  price_data: g.inputRef(priceData),
  quantity: g.int(),
});

g.mutation("checkout", {
  args: { line_items: g.inputRef(checkoutLineItem).list() },
  returns: g.ref(checkoutSession),
  resolver: "checkout",
});

export default config({
  schema: g,
});
