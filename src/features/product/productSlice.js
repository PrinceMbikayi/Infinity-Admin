import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import productService from "./productService";

// Action pour récupérer les produits
export const getProducts = createAsyncThunk(
  "product/get-products",
  async (thunkAPI) => {
    try {
      return await productService.getProducts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Action pour créer un produit
export const createProducts = createAsyncThunk(
  "product/create-products",
  async (productData, thunkAPI) => {
    console.log({productData})
    try {
      return await productService.createProduct(productData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Action pour supprimer un produit
export const deleteAProduct = createAsyncThunk(
  "product/delete-product",
  async (productId, thunkAPI) => {
    try {
      return await productService.deleteProduct(productId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Action pour mettre à jour un produit
export const updateProduct = createAsyncThunk(
  "product/update-product",
  async ({ productId, productData }, thunkAPI) => {
    try {
      return await productService.updateProduct(productId, productData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Action pour réinitialiser l'état
export const resetState = createAction("Reset_all");

const initialState = {
  products: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Gestion de l'état pour l'action getProducts
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      // Gestion de l'état pour l'action createProducts
      .addCase(createProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdProduct = action.payload;
      })
      .addCase(createProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      // Gestion de l'état pour l'action deleteAProduct
      .addCase(deleteAProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedProduct = action.payload;
        // Mise à jour de la liste des produits après suppression
        state.products = state.products.filter(
          (product) => product._id !== action.payload._id
        );
      })
      .addCase(deleteAProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      // Gestion de l'état pour l'action updateProduct
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedProduct = action.payload;
        // Mise à jour du produit dans la liste
        state.products = state.products.map((product) =>
          product._id === action.payload._id ? action.payload : product
        );
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      // Gestion de l'état pour l'action resetState
      .addCase(resetState, () => initialState);
  },
});

export default productSlice.reducer;
