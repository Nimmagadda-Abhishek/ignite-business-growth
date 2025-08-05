import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.PROD ? "https://ignite-business-growth.onrender.com/api" : "/api",
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

export default api;

export const getAll = (resource: string) =>
  api.get(`/${resource}`).then(res => res.data);

export const getOne = (resource: string, id: string | number) =>
  api.get(`/${resource}/${id}`).then(res => res.data);

export const createOne = (resource: string, data: any) =>
  api.post(`/${resource}`, data);

export const updateOne = (resource: string, id: string | number, data: any) =>
  api.put(`/${resource}/${id}`, data);

export const deleteOne = (resource: string, id: string | number) =>
  api.delete(`/${resource}/${id}`);