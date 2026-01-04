import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { appApi } from "../features/ApplicationApi";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [appApi.reducerPath]: appApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appApi.middleware),
});

export default store;