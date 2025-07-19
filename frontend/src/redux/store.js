import { configureStore } from "@reduxjs/toolkit";
import { propertyReducer, userReducer } from "./slice";

const store = configureStore({
  reducer: {
    user: userReducer,
    property: propertyReducer,
  },
});

export default store;
