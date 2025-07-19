import { createSlice } from "@reduxjs/toolkit";

// userSlice
const storedUser = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const userInitialState = {
  userInfo: storedUser,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState, // ✅ correct key
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    registerFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

// propertySlice
const propertyInitialState = {
  propertyInfo: [],
  loading: false,
  error: null,
};

const propertySlice = createSlice({
  name: "property",
  initialState: propertyInitialState, // ✅ correct key
  reducers: {
    propertyStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    propertySuccess: (state, action) => {
      state.loading = false;
      state.propertyInfo = action.payload;
    },
    propertyFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// optional: your slider settings (keep as is)
const settings = {
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: true,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
    { breakpoint: 768, settings: { slidesToShow: 2 } },
    { breakpoint: 480, settings: { slidesToShow: 1 } },
  ],
};

export const {
  loginStart,
  loginSuccess,
  loginFail,
  registerStart,
  registerSuccess,
  registerFail,
  logout,
} = userSlice.actions;

export const { propertyStart, propertySuccess, propertyFail } =
  propertySlice.actions;

export const userReducer = userSlice.reducer;
export const propertyReducer = propertySlice.reducer;
