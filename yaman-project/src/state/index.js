import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  secretkey: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.secretkey = null;
    },
  },
});

export const bookingSlice = createSlice({
  name: "booking",
  initialState: { booking: {} },
  reducers: {
    setBooking: (state, action) => {
      state.booking = action?.payload;
      // console.log(action.payload.records);
    },
  },
});



//Functions to use in Application to handle auth
export const { setLogin, setLogout } = authSlice.actions;
export const { setBooking } = bookingSlice.actions;

export const authReducers = authSlice.reducer;
export const bookingReducers = bookingSlice.reducer;
