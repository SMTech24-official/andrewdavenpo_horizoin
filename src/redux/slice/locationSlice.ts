// initial state will be city and state of user

import { createSlice } from "@reduxjs/toolkit";

interface LocationState {
  city: string;
  state: string;
}

const initialState: LocationState = {
  city: "",
  state: "",
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation(state, action) {
      state.city = action.payload.city;
      state.state = action.payload.state;
    },
  },
});

export const { setLocation } = locationSlice.actions;

export default locationSlice.reducer;
