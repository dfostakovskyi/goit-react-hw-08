// src\redux\filters\slice.js

import { createSelector, createSlice, current } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    name: "",
    number: "",
  },
  reducers: {
    changeFilter(state, action) {
      const { field, value } = action.payload;

      if (field) {
        state[field] = value;
      } else {
        console.error(
          "Поле 'field' є невизначеним або порожнім",
          action.payload
        );
      }
    },
  },
});

const selectContactsState = (state) => state.contacts;
const selectContacts = createSelector(
  selectContactsState,
  (contactsState) => contactsState.items
);
const selectFilters = (state) => state.filters;

const selectFilteredContacts = createSelector(
  selectContacts,
  selectFilters,
  (contacts, filters) => {
    const { name, number } = filters;

    return contacts.filter((contact) => {
      const matchesName = name
        ? contact.name.toLowerCase().includes(name.toLowerCase())
        : false;
      const matchesPhone =
        number && contact.number ? contact.number.includes(number) : false;

      return matchesName || matchesPhone;
    });
  }
);

export {
  selectContactsState,
  selectContacts,
  selectFilters,
  selectFilteredContacts,
};

export const { changeFilter } = filtersSlice.actions;
export default filtersSlice.reducer;
