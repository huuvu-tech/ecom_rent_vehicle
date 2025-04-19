// src/store/slices/productSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Product } from '../../types';
import { mockApi } from '../../services/mockApi';

interface ProductState {
  items: Product[];
  loading: boolean;
  error: string | null;
  selectedProduct: Product | null;
  selectedProductLoading: boolean;
  selectedProductError: string | null;
  rentalStatus: {
    loading: boolean;
    error: string | null;
    success: boolean;
    message: string | null;
  };
}

const initialState: ProductState = {
  items: [],
  loading: false,
  error: null,
  selectedProduct: null,
  selectedProductLoading: false,
  selectedProductError: null,
  rentalStatus: {
    loading: false,
    error: null,
    success: false,
    message: null,
  },
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      return await mockApi.getProducts();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id: string, { rejectWithValue }) => {
    try {
      return await mockApi.getProductById(id);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const rentProduct = createAsyncThunk(
  'products/rentProduct',
  async ({ id, days }: { id: string; days: number }, { rejectWithValue }) => {
    try {
      return await mockApi.rentProduct(id, days);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
      state.selectedProductError = null;
    },
    clearRentalStatus: (state) => {
      state.rentalStatus = initialState.rentalStatus;
    },
  },
  extraReducers: (builder) => {
    // Fetch Products
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

    // Fetch Product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.selectedProductLoading = true;
        state.selectedProductError = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selectedProductLoading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.selectedProductLoading = false;
        state.selectedProductError = action.payload as string;
      })

    // Rent Product
      .addCase(rentProduct.pending, (state) => {
        state.rentalStatus.loading = true;
        state.rentalStatus.error = null;
        state.rentalStatus.success = false;
        state.rentalStatus.message = null;
      })
      .addCase(rentProduct.fulfilled, (state, action) => {
        state.rentalStatus.loading = false;
        state.rentalStatus.success = true;
        state.rentalStatus.message = action.payload.message;
      })
      .addCase(rentProduct.rejected, (state, action) => {
        state.rentalStatus.loading = false;
        state.rentalStatus.error = action.payload as string;
      });
  },
});

export const { clearSelectedProduct, clearRentalStatus } = productSlice.actions;
export default productSlice.reducer;