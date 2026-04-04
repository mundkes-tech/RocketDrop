import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { rocketdropService } from '../../services/rocketdropService';

const initialState = {
  products: [],
  drops: [],
  liveDrops: [],
  upcomingDrops: [],
  selectedProduct: null,
  loading: false,
  error: null,
  totalPages: 0,
  currentPage: 0,
};


// Async thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params, { rejectWithValue }) => {
    try {
      const data = await rocketdropService.getProducts(params);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch products');
    }
  }
);

export const fetchProduct = createAsyncThunk(
  'products/fetchProduct',
  async (id, { rejectWithValue }) => {
    try {
      const data = await rocketdropService.getProduct(id);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch product');
    }
  }
);

export const fetchDrops = createAsyncThunk(
  'products/fetchDrops',
  async (_, { rejectWithValue }) => {
    try {
      // Assuming drops are a subset of products with a 'drop' flag
      const data = await rocketdropService.getProducts({ drop: true });
      return data.products || data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch drops');
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setLiveDrops: (state, action) => {
      state.liveDrops = action.payload;
    },
    setUpcomingDrops: (state, action) => {
      state.upcomingDrops = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const { products, totalPages, page } = action.payload;
        state.products = products || action.payload;
        state.totalPages = totalPages || 0;
        state.currentPage = page || 0;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch single product
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch drops
      .addCase(fetchDrops.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDrops.fulfilled, (state, action) => {
        state.drops = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchDrops.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export const {
  setSelectedProduct,
  setLiveDrops,
  setUpcomingDrops,
  setError,
} = productSlice.actions;

export default productSlice.reducer;

// Thunks: fetchProducts, fetchProduct, fetchDrops
