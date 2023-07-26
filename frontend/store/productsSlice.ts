import Product from "@/types/Product";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  products: Product[];
};

const initialState: InitialState = {
  products: [],
};

const getProductsQuery = `
  query getAllProducts {
    productCollection(first: 11) {
      edges {
        node {
          name
          id
          imageUrl
          stock
          description
          price
        }
      }
    }
  }
`;

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || "",
      },
      body: JSON.stringify({
        query: getProductsQuery,
        variables: {},
      }),
    });

    const data = await response.json();

    return data.data.productCollection.edges;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });

    builder.addCase(fetchProducts.rejected, (state, action) => {
      console.log({ error: action.error, payload: action.payload });
    });
  },
});

export default productsSlice.reducer;
