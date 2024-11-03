import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import bannerService from "./bannerService";

// Action to get banners
export const getBanners = createAsyncThunk(
  "banner/get-banners",
  async (thunkAPI) => {
    try {
      const response = await bannerService.getBanners();
      return response; // Return the response directly
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Action to get single banner
export const getBanner = createAsyncThunk(
  "banner/get-banner",
  async (id, thunkAPI) => {
    try {
      return await bannerService.getBanner(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Action to create a banner
export const createBanner = createAsyncThunk(
  "banner/create-banner", 
  async (bannerData, thunkAPI) => {
    try {
      return await bannerService.createBanner(bannerData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Action to delete a banner
export const deleteABanner = createAsyncThunk(
  "banner/delete-banner",
  async (bannerId, thunkAPI) => {
    try {
      return await bannerService.deleteBanner(bannerId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Action to update a banner
export const updateBanner = createAsyncThunk(
  "banner/update-banner",
  async ({ bannerId, bannerData }, thunkAPI) => {
    try {
      return await bannerService.updateBanner(bannerId, bannerData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Action to reset state
export const resetState = createAction("Reset_all");

const initialState = {
  banners: [],
  banner: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const bannerSlice = createSlice({
  name: "banners",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBanners.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getBanners.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.banners =  action.payload; // Handle both response formats
       
      })
      .addCase(getBanners.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
       
        state.message = action.payload?.message || action.error?.message;
       
      })
      .addCase(getBanner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.banner = action.payload;
      })
      .addCase(getBanner.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createBanner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdBanner = action.payload;
      })
      .addCase(createBanner.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateBanner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedBanner = action.payload;
      })
      .addCase(updateBanner.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteABanner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteABanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedBanner = action.payload;
      })
      .addCase(deleteABanner.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default bannerSlice.reducer;
