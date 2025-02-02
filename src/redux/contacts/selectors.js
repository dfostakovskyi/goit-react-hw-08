// src\redux\contacts\selectors.js
import { createSelector } from "@reduxjs/toolkit";

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
    console.log("Селектор selectFilteredContacts викликано");
    const { name, number } = filters;

    // Нормалізуємо телефонний фільтр
    const normalizedFilterPhone = number ? number.replace(/\D/g, "") : "";

    return contacts.filter((contact) => {
      const matchesName = name
        ? contact.name.toLowerCase().includes(name.toLowerCase())
        : true;

      let matchesPhone = true;
      if (normalizedFilterPhone) {
        if (contact.number) {
          const normalizedContactPhone = contact.number.replace(/\D/g, "");
          matchesPhone = normalizedContactPhone.includes(normalizedFilterPhone);
        } else {
          matchesPhone = false;
        }
      }

      return matchesName && matchesPhone;
    });
  }
);

export {
  selectContactsState,
  selectContacts,
  selectFilters,
  selectFilteredContacts,
};
