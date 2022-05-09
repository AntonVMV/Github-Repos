import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk

export const reposFetch = createAsyncThunk(
  "repos/reposFetch",
  async (language: string, thunkApi) => {
    try {
      const { data } = await axios.get(
        `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
      );
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error instanceof Error ? error.message : "unknown"
      );
    }
  }
);

//Store
interface IReposData {
  incomplete_results: boolean;
  items: any[];
  total_count: number;
}

interface IReposSlice {
  data: IReposData | null;
  loading: boolean;
  error: string | null;
}

const initialState: IReposSlice = {
  data: null,
  loading: false,
  error: null,
};

export const reposSlice = createSlice({
  name: "repos",
  initialState,
  reducers: {},
  extraReducers: {
    [reposFetch.pending.type]: (state) => {
      state.loading = true;
    },
    [reposFetch.fulfilled.type]: (state, action: PayloadAction<IReposData>) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    },
    [reposFetch.rejected.type]: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default reposSlice.reducer;
