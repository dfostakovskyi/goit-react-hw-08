import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = "https://67958023aad755a134ec1f90.mockapi.io/contacts";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(baseUrl);
      console.log("Contacts fetched: ", data);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contact, thunkAPI) => {
    try {
      const { data } = await axios.post(baseUrl, contact);
      console.log("Contact added: ", data);
      return data;
    } catch (e) {
      console.error("Error adding contact: ", e);
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, thunkAPI) => {
    try {
      console.log("Trying to delete contact ID:", contactId);
      const { data } = await axios.delete(`${baseUrl}/${contactId}`);
      console.log("Contact deleted: ", data);
      return contactId;
    } catch (e) {
      console.error("Error deleting contact: ", e);
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export default { fetchContacts, addContact, deleteContact };
