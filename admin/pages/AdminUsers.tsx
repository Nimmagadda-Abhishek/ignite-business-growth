import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAll, createOne, updateOne, deleteOne } from "../api";
import { useState, useMemo } from "react";

const resource = "admin_users";

interface AdminUser {
  id: number;
  username: string;
}

const AdminUsers = () => {
  const queryClient = useQueryClient();
  const { data: users = [], isLoading } = useQuery<AdminUser[]>({ queryKey: [resource], queryFn: getAll.bind(null, resource) });
  const [form, setForm] = useState({ username: "", password: "" });
  const [editId, setEditId] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const filteredUsers = useMemo(() =>
    users.filter(u =>
      u.username.toLowerCase().includes(search.toLowerCase())
    ), [users, search]);

  const createMutation = useMutation({
    mutationFn: (data: { username: string; password: string }) => createOne(resource, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [resource] }),
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: { username: string; password?: string } }) => updateOne(resource, id, data),
    onSuccess: () => {
      setEditId(null);
      setForm({ username: '', password: '' });
      queryClient.invalidateQueries({ queryKey: [resource] });
    },
  });
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteOne(resource, id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [resource] }),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      // Only send password if provided
      const data: { username: string; password?: string } = { username: form.username };
      if (form.password) data.password = form.password;
      updateMutation.mutate({ id: editId, data });
    } else {
      createMutation.mutate({ username: form.username, password: form.password });
    }
    setForm({ username: '', password: '' });
  };

  const exportCSV = () => {
    const header = "Username\n";
    const rows = filteredUsers.map(u =>
      `"${u.username}"`
    ).join("\n");
    const csv = header + rows;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'admin_users.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-4 text-primary">Manage Admin Users</h1>
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by username"
          className="input input-bordered w-full md:w-1/2 px-4 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
        />
        <button
          onClick={exportCSV}
          className="btn-primary px-6 py-2 rounded-lg shadow hover:scale-105 transition"
        >
          Export CSV
        </button>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          value={form.username}
          onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
          placeholder="Username"
          required
          className="input input-bordered flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
        />
        <input
          value={form.password}
          onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
          placeholder={editId ? "New Password (leave blank to keep current)" : "Password"}
          type="password"
          className="input input-bordered flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
        />
        <button type="submit" className="btn-primary px-6 py-2 rounded-lg shadow hover:scale-105 transition">
          {editId ? "Update" : "Add"}
        </button>
        {editId && (
          <button type="button" onClick={() => { setEditId(null); setForm({ username: '', password: '' }); }} className="btn-outline px-6 py-2 rounded-lg">
            Cancel
          </button>
        )}
      </form>
      {isLoading ? (
        <div className="text-center text-lg text-gray-500">Loading...</div>
      ) : (
        <ul className="space-y-4">
          {filteredUsers.map(u => (
            <li key={u.id} className="flex flex-col md:flex-row md:items-center justify-between bg-gray-50 rounded-lg p-4 shadow hover:shadow-md transition">
              <div>
                <b className="text-lg text-primary">{u.username}</b>
              </div>
              <div className="flex gap-2 mt-2 md:mt-0">
                <button onClick={() => { setEditId(u.id); setForm({ username: u.username, password: '' }); }} className="btn-outline px-4 py-1 rounded-lg">Edit</button>
                <button onClick={() => deleteMutation.mutate(u.id)} className="btn-danger px-4 py-1 rounded-lg">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminUsers; 