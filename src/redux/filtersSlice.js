//src\redux\filtersSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
};

const slice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    changeFilter: (state, action) => {
      state.name = action.payload.toLowerCase();
    },
  },
});

export default slice.reducer;
export const { changeFilter } = slice.actions;
export const selectFilters = (state) => state.filters.name;
