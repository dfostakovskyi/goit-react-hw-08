// src/redux/contacts/operations.js

import { createAsyncThunk } from "@reduxjs/toolkit";
import goitApi, { setAuthHeader } from "../../api/goitApi";
import { selectToken } from "../auth/selectors";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    const token = selectToken(thunkAPI.getState());

    if (!token) {
      console.error("No token found!");
      return thunkAPI.rejectWithValue("No token found");
    }

    setAuthHeader(token);

    try {
      const { data } = await goitApi.get("/contacts");

      return data;
    } catch (e) {
      console.error("Error fetching contacts:", e);
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/add",
  async (contactData, thunkAPI) => {
    const token = selectToken(thunkAPI.getState());

    if (!token) {
      console.error("No token found!");
      return thunkAPI.rejectWithValue("No token found");
    }

    setAuthHeader(token);

    try {
      const response = await goitApi.post("/contacts", contactData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, thunkAPI) => {
    const token = selectToken(thunkAPI.getState());

    if (!token) {
      console.error("No token found!");
      return thunkAPI.rejectWithValue("No token found");
    }

    setAuthHeader(token);

    try {
      await goitApi.delete(`/contacts/${contactId}`);
      return contactId;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export default { fetchContacts, addContact, deleteContact };
