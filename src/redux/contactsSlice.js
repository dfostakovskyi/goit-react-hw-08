//contactsSlice.js має включати:
// редьюсери addContact та deleteContact
// функцію-селектор selectContacts

import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";

const initialState = {
  phoneBook: [
    { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
    { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
    { id: "id-3", name: "Eden Clements", number: "645-17-79" },
    { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
  ],
  filters: "",
};

const slice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact: (state, action) => {
      state.phoneBook.push(action.payload);
    },
    deleteContact: (state, action) => {
      state.phoneBook = state.phoneBook.filter(
        (contact) => contact.id !== action.payload
      );
    },
    changeFilter: (state, action) => {
      state.filters = action.payload.toLowerCase();
    },
  },
});

export const { addContact, deleteContact, changeFilter } = slice.actions;
export const contactsReducer = slice.reducer;

export const selectContacts = (state) => state.contacts.phoneBook;

export const selectFilters = (state) => state.contacts.filters;

export default contactsReducer;
