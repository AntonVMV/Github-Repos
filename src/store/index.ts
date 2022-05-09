import { configureStore } from "@reduxjs/toolkit";
import reposReducer from "./slices/reposSlice";
import playerReducer from "./slices/playerSlice";

export const store = configureStore({
  reducer: {
    repos: reposReducer,
    players: playerReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
