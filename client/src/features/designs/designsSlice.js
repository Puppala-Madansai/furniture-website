import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = '/api/designs';

// Get all designs
export const fetchDesigns = createAsyncThunk(
  'designs/fetchDesigns',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };
      const response = await axios.get(API_URL, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get single design
export const fetchDesign = createAsyncThunk(
  'designs/fetchDesign',
  async (id, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };
      const response = await axios.get(`${API_URL}/${id}`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create design
export const createDesign = createAsyncThunk(
  'designs/createDesign',
  async (designData, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };
      const response = await axios.post(API_URL, designData, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update design
export const updateDesign = createAsyncThunk(
  'designs/updateDesign',
  async ({ id, designData }, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };
      const response = await axios.put(`${API_URL}/${id}`, designData, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete design
export const deleteDesign = createAsyncThunk(
  'designs/deleteDesign',
  async (id, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };
      await axios.delete(`${API_URL}/${id}`, config);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Generate design with AI
export const generateDesign = createAsyncThunk(
  'designs/generateDesign',
  async (designPrompt, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };
      const response = await axios.post(`${API_URL}/generate`, designPrompt, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  designs: [],
  currentDesign: null,
  generatedDesign: null,
  loading: false,
  error: null,
};

const designsSlice = createSlice({
  name: 'designs',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentDesign: (state) => {
      state.currentDesign = null;
    },
    clearGeneratedDesign: (state) => {
      state.generatedDesign = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all designs
      .addCase(fetchDesigns.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDesigns.fulfilled, (state, action) => {
        state.loading = false;
        state.designs = action.payload;
      })
      .addCase(fetchDesigns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch single design
      .addCase(fetchDesign.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDesign.fulfilled, (state, action) => {
        state.loading = false;
        state.currentDesign = action.payload;
      })
      .addCase(fetchDesign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create design
      .addCase(createDesign.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDesign.fulfilled, (state, action) => {
        state.loading = false;
        state.designs.push(action.payload);
      })
      .addCase(createDesign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update design
      .addCase(updateDesign.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDesign.fulfilled, (state, action) => {
        state.loading = false;
        state.designs = state.designs.map((design) =>
          design._id === action.payload._id ? action.payload : design
        );
        state.currentDesign = action.payload;
      })
      .addCase(updateDesign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete design
      .addCase(deleteDesign.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDesign.fulfilled, (state, action) => {
        state.loading = false;
        state.designs = state.designs.filter(
          (design) => design._id !== action.payload
        );
      })
      .addCase(deleteDesign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Generate design
      .addCase(generateDesign.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateDesign.fulfilled, (state, action) => {
        state.loading = false;
        state.generatedDesign = action.payload;
      })
      .addCase(generateDesign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearCurrentDesign, clearGeneratedDesign } =
  designsSlice.actions;

export default designsSlice.reducer; 