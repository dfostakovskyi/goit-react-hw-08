// src/redux/contacts/operations.js

import { createAsyncThunk } from "@reduxjs/toolkit";
import goitApi, { setAuthHeader } from "../../api/goitApi";
import { selectToken } from "../auth/selectors";

// Fetch all contacts
export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    const token = selectToken(thunkAPI.getState());

    if (!token) {
      console.error("No token found!");
      return thunkAPI.rejectWithValue("No token found");
    }

    // Встановлюємо заголовок авторизації
    setAuthHeader(token);

    try {
      const { data } = await goitApi.get("/contacts");
      console.log("Contacts fetched: ", data);
      return data;
    } catch (e) {
      console.error("Error fetching contacts:", e);
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// Add a new contact
export const addContact = createAsyncThunk(
  "contacts/add",
  async (contactData, thunkAPI) => {
    const token = selectToken(thunkAPI.getState());

    if (!token) {
      console.error("No token found!");
      return thunkAPI.rejectWithValue("No token found");
    }

    // Встановлюємо заголовок авторизації
    setAuthHeader(token);

    try {
      const response = await goitApi.post("/contacts", contactData);
      console.log("Contact added: ", response.data);
      return response.data;
    } catch (error) {
      console.error("Error adding contact:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Delete a contact
export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, thunkAPI) => {
    const token = selectToken(thunkAPI.getState());

    if (!token) {
      console.error("No token found!");
      return thunkAPI.rejectWithValue("No token found");
    }

    // Встановлюємо заголовок авторизації
    setAuthHeader(token);

    try {
      console.log("Trying to delete contact ID:", contactId);
      await goitApi.delete(`/contacts/${contactId}`);
      console.log("Contact deleted:", contactId);
      return contactId;
    } catch (e) {
      console.error("Error deleting contact:", e);
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export default { fetchContacts, addContact, deleteContact };
