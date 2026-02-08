import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstants from "../axiosInstants";
import toast from "react-hot-toast";

//add category
export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (data) => {
    try {
      let res = await axiosInstants.post("/Category/addcategory", data);
      toast.success(res.data.message);
      return res.data.newCategory;
    } catch (error) {
      const message = error.response?.data?.message;
      toast.error(message);
    }
  },
);

// edit category
export const editCategory = createAsyncThunk(
  "category/editCategory",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axiosInstants.patch(
        `/Category/editcategory/${id}`,
        data,
      );
      toast.success(res.data.message);
      return res.data.editedCategory;
    } catch (error) {
      const message = error.response?.data?.message;
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

//delete category
export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id) => {
    try {
      let res = await axiosInstants.delete(`/Category/deletecategory/${id}`);
      toast.success(res.data.message);
      return id;
    } catch (error) {
      const message = error.response?.data?.message;
      toast.error(message);
    }
  },
);

// get all category
export const getAllCategory = createAsyncThunk(
  "category/getAllCategory",
  async () => {
    try {
      let res = await axiosInstants.get("/Category/getallcategory");
      return res.data;
    } catch (error) {
      const message = error.response?.data?.message;
      toast.error(message);
    }
  },
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.categories.push(action.payload);
        }
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.categories.findIndex(
          (cat) => cat._id === action.payload._id,
        );

        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(editCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getAllCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(
          (dep) => dep._id !== action.payload,
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
