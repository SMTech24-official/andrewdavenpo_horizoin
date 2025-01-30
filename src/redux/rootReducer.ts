import { combineReducers } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import userSlice from "@/redux/slice/usersSlice";
import locationSlice from "@/redux/slice/locationSlice";

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  user: userSlice,
  location: locationSlice,
});

export default rootReducer;
