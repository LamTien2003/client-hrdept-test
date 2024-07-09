import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { setupListeners } from "@reduxjs/toolkit/query";

import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,

    // Use with RTK
    // [apiSlice.reducerPath]: apiSlice.reducer,
  },
  // Use with RTK
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
