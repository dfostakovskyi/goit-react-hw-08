// src/redux/auth/operations.js

import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { saveToken, removeToken } from "../../utils/localStorage";
import goitApi, { setAuthHeader, clearAuthHeader } from "../../api/goitApi";

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (credentials, thunkApi) => {
    try {
      const { data } = await goitApi.post("users/signup", credentials);

      setAuthHeader(data.token);
      saveToken(data.token);

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

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (credentials, thunkApi) => {
    try {
      const { data } = await goitApi.post("users/login", credentials);
      saveToken(data.token);
      setAuthHeader(data.token);

      return data;
    } catch (error) {
      toast.error("Login failed!");
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.token;

      if (!token) {
        console.warn("No token found. Skipping logout.");

        setAuthHeader(token);
        await goitApi.post("users/logout");
      }
    } catch (error) {
      console.error("Logout failed:", error);

      if (error.response && error.response.status === 401) {
        console.warn("Token is invalid or expired. Proceeding with logout.");
      } else {
        return thunkApi.rejectWithValue(error.message);
      }
    } finally {
      clearAuthHeader();
      removeToken();
    }

    return "Logged out";
  }
);

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
