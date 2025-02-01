// src/redux/auth/operations.js

import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { saveToken, removeToken } from "../../utils/localStorage";
import goitApi, { setAuthHeader, clearAuthHeader } from "../../api/goitApi";

// Реєстрація користувача
export const registerThunk = createAsyncThunk(
  "auth/register",
  async (credentials, thunkApi) => {
    try {
      console.log("Sending user data:", credentials);
      const { data } = await goitApi.post("users/signup", credentials);

      setAuthHeader(data.token);
      saveToken(data.token); // Зберігаємо токен, якщо потрібно

      return data;
    } catch (error) {
      console.error(
        "Registration error:",
        error.response?.data || error.message
      );
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// Вхід користувача
export const loginThunk = createAsyncThunk(
  "auth/login",
  async (credentials, thunkApi) => {
    try {
      const { data } = await goitApi.post("users/login", credentials);
      saveToken(data.token);
      console.log("Token saved:", data.token);
      setAuthHeader(data.token);

      return data;
    } catch (error) {
      toast.error("Login failed!");
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// Вихід користувача
export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, thunkApi) => {
    try {
      console.log("🚀 Logging out...");

      const token = thunkApi.getState().auth.token;
      console.log("🔑 Current Token:", token);

      if (!token) {
        console.warn("⚠️ No token found. Skipping logout.");
        return thunkApi.rejectWithValue("No token found");
      }

      setAuthHeader(token);
      await goitApi.post("users/logout");

      clearAuthHeader();
      removeToken();

      return "Logged out";
    } catch (error) {
      console.error("❌ Logout failed:", error);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// Оновлення користувача
export const refreshUserThunk = createAsyncThunk(
  "auth/refresh",
  async (_, thunkApi) => {
    const savedToken = localStorage.getItem("token");
    if (!savedToken) {
      return thunkApi.rejectWithValue("Token does not exist");
    }

    setAuthHeader(savedToken);

    try {
      const { data } = await goitApi.get("users/current");
      return data;
    } catch (error) {
      localStorage.removeItem("token");
      clearAuthHeader();
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export default goitApi;
