import axios from "axios";

const API_BASE = "https://asian-digital-world.onrender.com/api";

function authHeader() {
  const token = localStorage.getItem("admin_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const getAll = (resource: string) =>
  axios.get(`${API_BASE}/${resource}`, { headers: authHeader() }).then(res => res.data);

export const getOne = (resource: string, id: string | number) =>
  axios.get(`${API_BASE}/${resource}/${id}`, { headers: authHeader() }).then(res => res.data);

export const createOne = (resource: string, data: any) =>
  axios.post(`${API_BASE}/${resource}`, data, { headers: authHeader() });

export const updateOne = (resource: string, id: string | number, data: any) =>
  axios.put(`${API_BASE}/${resource}/${id}`, data, { headers: authHeader() });

export const deleteOne = (resource: string, id: string | number) =>
  axios.delete(`${API_BASE}/${resource}/${id}`, { headers: authHeader() }); 