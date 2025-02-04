// src/redux/auth/selectors.js

import { createSelector } from "@reduxjs/toolkit";

export const selectToken = (state) => state.auth.token;
export const selectAuthState = (state) => state.auth;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthSuccess = (state) => state.auth.success;
export const selectUser = (state) => state.auth.user;

export const selectIsRefreshing = (state) => state.auth.isRefreshing;

export const selectUserName = createSelector(selectUser, (user) => user.name);
export const selectUserEmail = createSelector(selectUser, (user) => user.email);
export const selectUserAvatar = createSelector(
  selectUser,
  (user) => user.avatar
);

export const selectUserContacts = createSelector(
  selectUser,
  (user) => user.contacts
);
export const selectIsLoggedIn = (state) => {
  return state.auth.isLoggedIn;
};
