// store.js містить логіку створення redux стейту, а також логіку, пов'язану з налаштуванням redux-persist
//  Кінцева структура redux стейту має бути наступний об'єкт:
// {
//   contacts: { items: [] },
//   filters: { name: "" }
// }
// Назви властивостей contacts та filters формуються в методі configureStore
// Значення цих властивостей - це initialState слайсів контактів та фільтрів.

import { configureStore } from "@reduxjs/toolkit";

import contactsReducer from "./contactsSlice";
import filtersReducer from "./filtersSlice";

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filters: filtersReducer,
  },
});

export { store };
