import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAll, createOne, updateOne, deleteOne } from "../api";
import { useState, useMemo } from "react";

const resource = "social_links";

interface SocialLink {
  id: number;
  name: string;
  url: string;
}

const SocialLinks = () => {
  const queryClient = useQueryClient();
  const { data: links = [], isLoading } = useQuery<SocialLink[]>({ queryKey: [resource], queryFn: getAll.bind(null, resource) });
  const [form, setForm] = useState({ name: "", url: "" });
  const [editId, setEditId] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const filteredLinks = useMemo(() =>
    links.filter(l =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.url.toLowerCase().includes(search.toLowerCase())
    ), [links, search]);

  const createMutation = useMutation({
    mutationFn: (data: Omit<SocialLink, 'id'>) => createOne(resource, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [resource] }),
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Omit<SocialLink, 'id'> }) => updateOne(resource, id, data),
    onSuccess: () => {
      setEditId(null);
      setForm({ name: '', url: '' });
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
      updateMutation.mutate({ id: editId, data: form });
    } else {
      createMutation.mutate(form);
    }
    setForm({ name: '', url: '' });
  };

  const exportCSV = () => {
    const header = "Name,URL\n";
    const rows = filteredLinks.map(l =>
      `"${l.name}","${l.url}"`
    ).join("\n");
    const csv = header + rows;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'social_links.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-4 text-primary">Manage Social Links</h1>
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name or URL"
          className="input input-bordered w-full md:w-1/2 px-4 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
        />
        <button
          onClick={exportCSV}
          className="btn-primary px-6 py-2 rounded-lg shadow hover:scale-105 transition"
        >
          Export CSV
        </button>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 mb-6 flex-wrap">
        <input
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          placeholder="Name"
          required
          className="input input-bordered flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
        />
        <input
          value={form.url}
          onChange={e => setForm(f => ({ ...f, url: e.target.value }))}
          placeholder="URL"
          required
          className="input input-bordered flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
        />
        <button type="submit" className="btn-primary px-6 py-2 rounded-lg shadow hover:scale-105 transition">
          {editId ? "Update" : "Add"}
        </button>
        {editId && (
          <button type="button" onClick={() => { setEditId(null); setForm({ name: '', url: '' }); }} className="btn-outline px-6 py-2 rounded-lg">
            Cancel
          </button>
        )}
      </form>
      {isLoading ? (
        <div className="text-center text-lg text-gray-500">Loading...</div>
      ) : (
        <ul className="space-y-4">
          {filteredLinks.map(l => (
            <li key={l.id} className="flex flex-col md:flex-row md:items-center justify-between bg-gray-50 rounded-lg p-4 shadow hover:shadow-md transition">
              <div>
                <b className="text-lg text-primary">{l.name}</b> <span className="text-gray-500">- {l.url}</span>
              </div>
              <div className="flex gap-2 mt-2 md:mt-0">
                <button onClick={() => { setEditId(l.id); setForm({ name: l.name, url: l.url }); }} className="btn-outline px-4 py-1 rounded-lg">Edit</button>
                <button onClick={() => deleteMutation.mutate(l.id)} className="btn-danger px-4 py-1 rounded-lg">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SocialLinks; 