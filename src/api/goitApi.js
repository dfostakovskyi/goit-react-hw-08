// src/api/goitApi.js
import axios from "axios";

const goitApi = axios.create({
  baseURL: "https://connections-api.goit.global",
});

export const setAuthHeader = (token) => {
  goitApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  delete goitApi.defaults.headers.common["Authorization"];
};

export default goitApi;
