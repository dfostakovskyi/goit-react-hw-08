// src/redux/contacts/slice.js

// src/redux/contacts/slice.js

import { createSlice } from "@reduxjs/toolkit";
import {
  fetchContacts,
  addContact,
  deleteContact,
} from "../contacts/operations";
import { logoutThunk } from "../auth/operations";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    // Add this reducer to handle adding multiple contacts
    addContacts(state, action) {
      // Merge existing contacts with new contacts
      state.items = [...state.items, ...action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Contacts
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Single Contact
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loading = false;
      })
      .addCase(addContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(addContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Contact
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle Logout
      .addCase(logoutThunk.fulfilled, (state) => {
        state.items = [];
      });
  },
});

// Export the addContacts action
export const { addContacts } = contactsSlice.actions;

// Existing exports
export const contactsReducer = contactsSlice.reducer;
export { fetchContacts, addContact, deleteContact };

// Default export
export default contactsReducer;
