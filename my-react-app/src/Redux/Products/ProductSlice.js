import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch("https://dummyjson.com/products?limit=1000");
    const data = await response.json();
    return data.products;
  }
);
export const fetchProductsbyCategories = createAsyncThunk(
  "products/fetchProductsbyCategories",
  async (category) => {
    const response = await fetch(
      `https://dummyjson.com/products/category/${category}?limit=1000`
    );
    const data = await response.json();
    return data.products;
  }
);
export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    const response = await fetch("https://dummyjson.com/products/categories");
    const data = await response.json();
    return data;
  }
);
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id) => {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    const data = await response.json();
    console.log("Fetched product data:", data);
    return data;
  }
);
const initialState = {
  items: [],
  categories: [],
  loading: false,
  error: null,
};
const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
      state.error = null;
    });
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(fetchProductsbyCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
      state.error = null;
    });
    builder.addCase(fetchProductsbyCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProductsbyCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.items.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index >= 0) {
        state.items[index] = action.payload;
      } else {
        state.items.push(action.payload);
      }
    });
  },
});
export default ProductSlice.reducer;
