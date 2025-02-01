// src/redux/auth/operations.js

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const goitApi = axios.create({
  baseURL: "https://connections-api.goit.global",
});

export const setAuthHeader = (token) => {
  goitApi.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

// export const registerThunk = createAsyncThunk(
//   "auth/register",
//   async (credentials, thunkApi) => {
//     try {
//       const { data } = await goitApi.post("users/signup", credentials);
//       saveToken(data.token);
//       setAuthHeader(data.token);
//       return data;
//     } catch (error) {
//       if (error.response && error.response.data.code === 11000) {
//         toast.error("User already exists!");
//         return thunkApi.rejectWithValue(error.message);
//       }
//       return thunkApi.rejectWithValue(error.message);
//     }
//   }
// );

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (credentials, thunkApi) => {
    try {
      console.log("Sending user data:", credentials);
      const { data } = await goitApi.post("users/signup", credentials);
      saveToken(data.token);
      setAuthHeader(data.token);
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

      const userData = await goitApi.get("users/current");

      return { ...data, user: userData.data };
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
      await goitApi.post("users/logout");
      localStorage.removeItem("token");
      delete goitApi.defaults.headers.common.Authorization;
      return "Logged out";
    } catch (error) {
      toast.error("Logout failed!");
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const refreshUserThunk = createAsyncThunk(
  "auth/refresh",
  async (_, thunkApi) => {
    const savedToken = getToken();
    if (!savedToken) {
      return thunkApi.rejectWithValue("Token does not exist");
    }

    setAuthHeader(savedToken);

    try {
      const { data } = await goitApi.get("users/login");
      return data;
    } catch (error) {
      localStorage.removeItem("token");
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
