// src/redux/contacts/slice.js

import { createSelector } from "@reduxjs/toolkit";

const selectContactsState = (state) => state.contacts;
const selectContacts = createSelector(
  selectContactsState,
  (contactsState) => contactsState.items
);
const selectFilters = (state) => state.filters.name;

const selectFilteredContacts = createSelector(
  selectContacts,
  selectFilters,
  (contacts, name) => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(name.toLowerCase())
    );
  }
);

export {
  selectContactsState,
  selectContacts,
  selectFilters,
  selectFilteredContacts,
};
