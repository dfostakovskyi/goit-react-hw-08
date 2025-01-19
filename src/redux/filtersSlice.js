// filtersSlice.js має включати:
// редьюсери редьюсер changeFilter
// функцію-селектор selectNameFilter

//src\redux\filtersSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: "",
};

const slice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changeFilter: (state, action) => {
      state.filters = action.payload.toLowerCase();
    },
  },
});

export default slice.reducer;
export const { changeFilter } = slice.actions;
export const selectFilters = (state) => state.filters.filters;
