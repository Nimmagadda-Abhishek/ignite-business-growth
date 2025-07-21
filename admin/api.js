import axios from "axios";

const api = axios.create({
  baseURL: "https://ignite-business-growth.vercel.app/api",
});

function authHeader() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const getAll = (resource) => api.get(`/${resource}`, { headers: authHeader() }).then(res => res.data);
export const getOne = (resource, id) => api.get(`/${resource}/${id}`, { headers: authHeader() }).then(res => res.data);
export const createOne = (resource, data) => api.post(`/${resource}`, data, { headers: authHeader() });
export const updateOne = (resource, id, data) => api.put(`/${resource}/${id}`, data, { headers: authHeader() });
export const deleteOne = (resource, id) => api.delete(`/${resource}/${id}`, { headers: authHeader() }); 