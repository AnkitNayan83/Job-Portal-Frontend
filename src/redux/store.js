import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slice/authSlice";
import { alertSlice } from "./slice/alertSlice";

export default configureStore({
  reducer: {
    alerts: alertSlice.reducer,
    auth: authSlice.reducer,
  },
});
