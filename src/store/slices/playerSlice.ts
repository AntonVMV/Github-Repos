import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface UserObj {
  player: Player;
  name: string;
}

interface PlayerFetchData {
  player: Player;
  data: IPlayerData;
  repos: any[];
}

interface PlayerFetchError {
  player: Player;
  error: string;
}

interface IPlayersState {
  playerOne: IPlayer;
  playerTwo: IPlayer;
}

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

//Thunk

type Player = "playerOne" | "playerTwo";

export const playerFetch = createAsyncThunk<
  PlayerFetchData,
  UserObj,
  { rejectValue: PlayerFetchError }
>("players/playerFetch", async (user: UserObj, thunkApi) => {
  thunkApi.dispatch(setLoading(user.player));
  try {
    const result = await axios.all([
      axios.get(`https://api.github.com/users/${user.name}`),
      axios.get(`https://api.github.com/users/${user.name}/repos`),
    ]);

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
});

//Slice

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
  extraReducers: (builder) => {
    builder
      .addCase(playerFetch.fulfilled, (state, action) => {
        const player = action.payload.player;
        state[player].data = action.payload.data;
        state[player].repos = action.payload.repos;
        state[player].loading = false;
        state[player].error = null;
      })
      .addCase(playerFetch.rejected, (state, action) => {
        if (action.payload) {
          const player = action.payload.player;
          state[player].data = null;
          state[player].loading = false;
          state[player].error = action.payload.error;
        }
      });
  },
});

export default playerSlice.reducer;

export const { clearPlayer, setLoading } = playerSlice.actions;
