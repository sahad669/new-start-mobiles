import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstants from "../axiosInstants";
import toast from "react-hot-toast";

// add brand
export const addBrand = createAsyncThunk("brand/addBrand", async (data) => {
  try {
    let res = await axiosInstants.post("/mobileBrands/add", data);
    toast.success(res.data.message);
    return res.data.newBrand;
  } catch (error) {
    const message = error.response?.data?.message || "Failed to add brand";
    toast.error(message);
    throw error;
  }
});

//edit Brand
export const editBrand = createAsyncThunk(
  "brand/editBrand",
  async ({ id, data }) => {
    try {
      const res = await axiosInstants.patch(`/mobileBrands/editbrand/${id}`, data);
      toast.success(res.data.message);
      return res.data.editedBrand;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to add brand";
      toast.error(message);
      throw error;
    }
  },
);

// delete Brand
export const deleteBrand = createAsyncThunk("brand/deleteBrand", async (id) => {
  try {
    let res = await axiosInstants.delete(`/mobileBrands/deletebrand/${id}`);
    toast.success(res.data.message);
    return id;
  } catch (error) {
    const message = error.response?.data?.message || "Failed to add brand";
    toast.error(message);
    throw error;
  }
});

//get all Brands
export const getAllBrand = createAsyncThunk("brand/getAllBrand", async () => {
  try {
    let res = await axiosInstants.get("/mobileBrands/getallbrand");
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || "Failed to add brand";
    toast.error(message);
    throw error;
  }
});

const brandSlice = createSlice({
  name: "brand",
  initialState: {
    brands: [],
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(addBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBrand.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.brands.push(action.payload);
        }
      })
      .addCase(addBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editBrand.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.brands.findIndex(
          (brnd) => brnd._id === action.payload._id,
        );
        if (index !== -1) {
          state.brands[index] = action.payload;
        }
      })
      .addCase(editBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = state.brands.filter(
          (brnd) => brnd._id !== action.payload,
        );
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload;
      })
      .addCase(getAllBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default brandSlice.reducer;
