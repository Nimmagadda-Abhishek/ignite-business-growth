import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAll, createOne, updateOne, deleteOne } from "../api";
import { useState, useMemo } from "react";

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image_url: string;
  category: string;
  client: string;
  technologies: string;
  results: string;
  link: string;
}

const resource = "portfolio";

const Portfolio = () => {
  const queryClient = useQueryClient();
  const { data: items = [], isLoading } = useQuery<PortfolioItem[]>({ queryKey: ['portfolio'], queryFn: getAll.bind(null, resource) });
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ title: "", description: "", image_url: "", category: "", client: "", technologies: "", results: "", link: "" });
  const [editId, setEditId] = useState<number | null>(null);

  const filteredItems = useMemo(() =>
    items.filter(item =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
    ), [items, search]);

  const exportCSV = () => {
    const header = "Title,Description,Image URL,Category,Client,Technologies,Results,Link\n";
    const rows = filteredItems.map(item =>
      `"${item.title}","${item.description.replace(/"/g, '""')}","${item.image_url}","${item.category}","${item.client}","${item.technologies}","${item.results}","${item.link}"`
    ).join("\n");
    const csv = header + rows;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const createMutation = useMutation({
    mutationFn: (data: Omit<PortfolioItem, 'id'>) => createOne(resource, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['portfolio'] }),
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Omit<PortfolioItem, 'id'> }) => updateOne(resource, id, data),
    onSuccess: () => {
      setEditId(null);
      setForm({ title: '', description: '', image_url: '', category: '', client: '', technologies: '', results: '', link: '' });
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
    },
  });
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteOne(resource, id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['portfolio'] }),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      updateMutation.mutate({ id: editId, data: form });
    } else {
      createMutation.mutate(form);
    }
    setForm({ title: '', description: '', image_url: '', category: '', client: '', technologies: '', results: '', link: '' });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-4 text-primary">Manage Portfolio</h1>
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by title or description"
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
          value={form.title}
          onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
          placeholder="Title"
          required
          className="input input-bordered flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
        />
        <input
          value={form.description}
          onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
          placeholder="Description"
          required
          className="input input-bordered flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
        />
        <input
          value={form.image_url}
          onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))}
          placeholder="Image URL"
          className="input input-bordered flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
        />
        <input
          value={form.category}
          onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
          placeholder="Category"
          className="input input-bordered flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
        />
        <input
          value={form.client}
          onChange={e => setForm(f => ({ ...f, client: e.target.value }))}
          placeholder="Client"
          className="input input-bordered flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
        />
        <input
          value={form.technologies}
          onChange={e => setForm(f => ({ ...f, technologies: e.target.value }))}
          placeholder="Technologies (comma separated)"
          className="input input-bordered flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
        />
        <input
          value={form.results}
          onChange={e => setForm(f => ({ ...f, results: e.target.value }))}
          placeholder="Results"
          className="input input-bordered flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
        />
        <input
          value={form.link}
          onChange={e => setForm(f => ({ ...f, link: e.target.value }))}
          placeholder="Project Link"
          className="input input-bordered flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
        />
        <button type="submit" className="btn-primary px-6 py-2 rounded-lg shadow hover:scale-105 transition">
          {editId ? "Update" : "Add"}
        </button>
        {editId && (
          <button type="button" onClick={() => { setEditId(null); setForm({ title: '', description: '', image_url: '', category: '', client: '', technologies: '', results: '', link: '' }); }} className="btn-outline px-6 py-2 rounded-lg">
            Cancel
          </button>
        )}
      </form>
      {isLoading ? (
        <div className="text-center text-lg text-gray-500">Loading...</div>
      ) : (
        <ul className="space-y-4">
          {filteredItems.map(item => (
            <li key={item.id} className="flex flex-col md:flex-row md:items-center justify-between bg-gray-50 rounded-lg p-4 shadow hover:shadow-md transition">
              <div>
                <b className="text-lg text-primary">{item.title}</b> <span className="text-gray-500">- {item.description}</span>
                <div className="text-xs text-gray-400">Category: {item.category}</div>
                <div className="text-xs text-gray-400">Client: {item.client}</div>
                <div className="text-xs text-gray-400">Technologies: {item.technologies}</div>
                <div className="text-xs text-gray-400">Results: {item.results}</div>
                <div className="text-xs text-gray-400">Link: <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-primary underline">{item.link}</a></div>
                <div className="text-xs text-gray-400">Image: <a href={item.image_url} target="_blank" rel="noopener noreferrer" className="text-primary underline">{item.image_url}</a></div>
              </div>
              <div className="flex gap-2 mt-2 md:mt-0">
                <button onClick={() => { setEditId(item.id); setForm({ title: item.title, description: item.description, image_url: item.image_url, category: item.category, client: item.client, technologies: item.technologies, results: item.results, link: item.link }); }} className="btn-outline px-4 py-1 rounded-lg">Edit</button>
                <button onClick={() => deleteMutation.mutate(item.id)} className="btn-danger px-4 py-1 rounded-lg">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Portfolio; 