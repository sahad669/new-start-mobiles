import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstants from "../axiosInstants";
import toast from "react-hot-toast";

// Fetch addresses
export const getAddresses = createAsyncThunk(
  "address/get",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axiosInstants.get(`/users/address/${userId}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch addresses",
      );
    }
  },
);

// Add address
export const addAddress = createAsyncThunk(
  "address/add",
  async ({ userId, address }, { rejectWithValue }) => {
    try {
      const res = await axiosInstants.post(`/users/address/add`, {
        userId,
        address,
      });
      toast.success(res.data.message);
      return res.data.addresses;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add address",
      );
    }
  },
);

// Edit address
export const editAddress = createAsyncThunk(
  "address/edit",
  async ({ userId, addressId, address }, { rejectWithValue }) => {
    try {
      const res = await axiosInstants.put(
        `/users/address/${userId}/${addressId}`,
        address,
      );
      toast.success(res.data.message);
      return res.data.addresses;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to edit address",
      );
    }
  },
);

// Delete address
export const deleteAddress = createAsyncThunk(
  "address/delete",
  async ({ userId, addressId }, { rejectWithValue }) => {
    try {
      const res = await axiosInstants.delete(
        `/users/address/${userId}/${addressId}`,
      );
      toast.success(res.data.message);
      return res.data.addresses;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete address",
      );
    }
  },
);

export const setDefaultAddress = createAsyncThunk(
  "address/setDefault",
  async ({ userId, addressId }, { rejectWithValue }) => {
    try {
      const res = await axiosInstants.put(
        `/users/address/default/${userId}/${addressId}`,
      );

      toast.success(res.data.message);

      return res.data.addresses;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed");
    }
  },
);

const addressSlice = createSlice({
  name: "address",
  initialState: {
    addresses: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAddresses.fulfilled, (state, action) => {
        state.addresses = action.payload;
        state.loading = false;
      })
      .addCase(getAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addAddress.fulfilled, (state, action) => {
        state.addresses = action.payload;
        state.loading = false;
      })
      .addCase(addAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(editAddress.fulfilled, (state, action) => {
        state.addresses = action.payload;
        state.loading = false;
      })
      .addCase(editAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.addresses = action.payload;
        state.loading = false;
      })
      .addCase(deleteAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(setDefaultAddress.fulfilled, (state, action) => {
        state.addresses = action.payload;
      });
  },
});

export default addressSlice.reducer;
