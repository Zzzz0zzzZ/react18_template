import { configureStore } from '@reduxjs/toolkit';
import commonSlice from "./slices/commonSlice"

// configureStore创建一个redux数据
export const store = configureStore({
  reducer: {
    common: commonSlice,
  },
});

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch