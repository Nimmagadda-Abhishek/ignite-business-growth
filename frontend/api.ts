import axios from "axios";

const api = axios.create({
  baseURL: "https://ignite-business-growth.vercel.app/api",
});

export default api;

function authHeader() {
  const token = localStorage.getItem("admin_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const getAll = (resource: string) =>
  api.get(`/${resource}`, { headers: authHeader() }).then(res => res.data);

export const getOne = (resource: string, id: string | number) =>
  api.get(`/${resource}/${id}`, { headers: authHeader() }).then(res => res.data);

export const createOne = (resource: string, data: any) =>
  api.post(`/${resource}`, data, { headers: authHeader() });

export const updateOne = (resource: string, id: string | number, data: any) =>
  api.put(`/${resource}/${id}`, data, { headers: authHeader() });

export const deleteOne = (resource: string, id: string | number) =>
  api.delete(`/${resource}/${id}`, { headers: authHeader() }); 