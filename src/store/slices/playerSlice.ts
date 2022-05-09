import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

//Thunk

type Player = "playerOne" | "playerTwo";

interface UserObj {
  player: Player;
  name: string;
}

export const playerFetch = createAsyncThunk(
  "players/playerFetch",
  async (user: UserObj, thunkApi) => {
    thunkApi.dispatch(setLoading(user.player));
    try {
      // const result = await axios.get(
      //   `https://api.github.com/users/${user.name}`
      // );
      const result = await axios.all([
        axios.get(`https://api.github.com/users/${user.name}`),
        axios.get(`https://api.github.com/users/${user.name}/repos`),
      ]);

      console.log(result);

      return {
        player: user.player,
        data: result[0].data,
        repos: result[1].data,
      };
    } catch (error) {
      return thunkApi.rejectWithValue({
        player: user.player,
        error: error instanceof Error ? error.message : "Unknown Error",
      });
    }
  }
);

//Slice

export interface IPlayerData {
  id: number;
  avatar_url: string;
  html_url: string;
  login: string;
  name: string;
  public_repos: number;
  location: string;
  followers: number;
  following: number;
}

export interface IPlayer {
  data: IPlayerData | null;
  repos: any[];
  loading: boolean;
  error: null | string;
}

interface IPlayersState {
  playerOne: IPlayer;
  playerTwo: IPlayer;
}

const initialState: IPlayersState = {
  playerOne: {
    data: null,
    repos: [],
    loading: false,
    error: null,
  },
  playerTwo: {
    data: null,
    repos: [],
    loading: false,
    error: null,
  },
};

export const playerSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<Player>) => {
      state[action.payload].loading = true;
    },
    clearPlayer: (state, action: PayloadAction<Player>) => {
      state[action.payload].data = null;
      state[action.payload].error = null;
    },
  },
  extraReducers: {
    [playerFetch.fulfilled.type]: (
      state,
      action: PayloadAction<{ player: Player; data: IPlayerData; repos: any[] }>
    ) => {
      const player = action.payload.player;
      state[player].data = action.payload.data;
      state[player].repos = action.payload.repos;
      state[player].loading = false;
      state[player].error = null;
    },
    [playerFetch.rejected.type]: (
      state,
      action: PayloadAction<{ player: Player; error: string }>
    ) => {
      const player = action.payload.player;
      state[player].data = null;
      state[player].loading = false;
      state[player].error = action.payload.error;
    },
  },
});

export default playerSlice.reducer;

export const { clearPlayer, setLoading } = playerSlice.actions;
