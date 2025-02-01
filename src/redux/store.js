// src/redux/store.js

import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "./contacts/slice";
import filtersReducer from "./filters/slice";
import { authReducer } from "./auth/slice";

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filters: filtersReducer,
    auth: authReducer,
  },
});

export { store };
