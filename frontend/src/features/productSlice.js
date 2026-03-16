import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstants from "../axiosInstants";
import toast from "react-hot-toast";

//add product
export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (formData) => {
    try {
      const res = await axiosInstants.post("Products/addproduct", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(res.data.message);
      return res.data.product;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to add product";
      toast.error(message);
      throw error;
    }
  },
);
// get all products
export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async () => {
    try {
      let res = await axiosInstants.get("Products/getallproduct");
      return res.data.products;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to add brand";
      toast.error(message);
      throw error;
    }
  },
);
//edit product
export const editProduct = createAsyncThunk(
  "product/editProduct",
  async ({ id, data }) => {
    try {
      const res = await axiosInstants.patch(
        `/Products/editproduct/${id}`,
        data,
      );
      toast.success(res.data.message);
      return res.data.product;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to add brand";
      toast.error(message);
      throw error;
    }
  },
);
// delete product
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id) => {
    try {
      let res = await axiosInstants.delete(`/Products/deleteproduct/${id}`);
      toast.success(res.data.message);
      return id;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to add brand";
      toast.error(message);
      throw error;
    }
  },
);

// 🔎 GET FILTERED PRODUCTS
export const getFilteredProducts = createAsyncThunk(
  "product/getFilteredProducts",
  async (filters) => {
    try {
      // Remove empty values
      const cleanedFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== "" && v != null),
      );

      const query = new URLSearchParams(cleanedFilters).toString();

      const res = await axiosInstants.get(`/Products?${query}`);

      return res.data; // your controller returns products array
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to filter products";
      toast.error(message);
      throw error;
    }
  },
);
// get product by id
export const getProductById = createAsyncThunk(
  "product/getProductById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstants.get(`/Products/getbyid/${id}`);
      return res.data.product;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to get product";

      toast.error(message);

      return rejectWithValue(message);
    }
  },
);
const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    viewProduct: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload; // replace with fetched products
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(
          (item) => item._id === action.payload._id,
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (item) => item._id !== action.payload,
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getFilteredProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFilteredProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload; // filtered products replace list
      })
      .addCase(getFilteredProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.viewProduct = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default productSlice.reducer;
