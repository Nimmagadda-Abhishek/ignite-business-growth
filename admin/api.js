import axios from "axios";

const API_BASE = "http://localhost:3001/api";

function authHeader() {
  const token = localStorage.getItem("admin_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const getAll = (resource) => axios.get(`${API_BASE}/${resource}`, { headers: authHeader() }).then(res => res.data);
export const getOne = (resource, id) => axios.get(`${API_BASE}/${resource}/${id}`, { headers: authHeader() }).then(res => res.data);
export const createOne = (resource, data) => axios.post(`${API_BASE}/${resource}`, data, { headers: authHeader() });
export const updateOne = (resource, id, data) => axios.put(`${API_BASE}/${resource}/${id}`, data, { headers: authHeader() });
export const deleteOne = (resource, id) => axios.delete(`${API_BASE}/${resource}/${id}`, { headers: authHeader() }); 