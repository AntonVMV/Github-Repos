import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk

export const reposFetch = createAsyncThunk<
  IReposData,
  string,
  { rejectValue: string }
>("repos/reposFetch", async (language: string, thunkApi) => {
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
});

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
  extraReducers: (builder) => {
    builder
      .addCase(reposFetch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(reposFetch.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(reposFetch.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = "Unknown Error";
        }
      });
  },
});

export default reposSlice.reducer;
