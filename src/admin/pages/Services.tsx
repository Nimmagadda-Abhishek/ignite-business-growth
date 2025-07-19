import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAll, createOne, updateOne, deleteOne } from "../api";
import { useState, useMemo } from "react";

interface Service {
  id: number;
  service_id: string;
  title: string;
  description: string;
  features: string;
  technologies: string;
  pricing: string;
  delivery_time: string;
}

const resource = "services";

const Services = () => {
  const queryClient = useQueryClient();
  const { data: services = [], isLoading } = useQuery<Service[]>({ queryKey: [resource], queryFn: getAll.bind(null, resource) });
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ service_id: "", title: "", description: "", features: "", technologies: "", pricing: "", delivery_time: "" });
  const [editId, setEditId] = useState<number | null>(null);

  const filteredServices = useMemo(() =>
    services.filter(s =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase())
    ), [services, search]);

  const exportCSV = () => {
    const header = "Service ID,Title,Description,Features,Technologies,Pricing,Delivery Time\n";
    const rows = filteredServices.map(s =>
      `"${s.service_id}","${s.title}","${s.description.replace(/"/g, '""')}","${s.features}","${s.technologies}","${s.pricing}","${s.delivery_time}"`
    ).join("\n");
    const csv = header + rows;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'services.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const createMutation = useMutation({
    mutationFn: (data: Omit<Service, 'id'>) => createOne(resource, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [resource] }),
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Omit<Service, 'id'> }) => updateOne(resource, id, data),
    onSuccess: () => {
      setEditId(null);
      setForm({ service_id: '', title: '', description: '', features: '', technologies: '', pricing: '', delivery_time: '' });
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
    setForm({ service_id: '', title: '', description: '', features: '', technologies: '', pricing: '', delivery_time: '' });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-4 text-primary">Manage Services</h1>
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
          value={form.service_id}
          onChange={e => setForm(f => ({ ...f, service_id: e.target.value }))}
          placeholder="Service ID"
          required
          className="input input-bordered flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
        />
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
          value={form.features}
          onChange={e => setForm(f => ({ ...f, features: e.target.value }))}
          placeholder="Features"
          className="input input-bordered flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
        />
        <input
          value={form.technologies}
          onChange={e => setForm(f => ({ ...f, technologies: e.target.value }))}
          placeholder="Technologies"
          className="input input-bordered flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
        />
        <input
          value={form.pricing}
          onChange={e => setForm(f => ({ ...f, pricing: e.target.value }))}
          placeholder="Pricing"
          className="input input-bordered flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
        />
        <input
          value={form.delivery_time}
          onChange={e => setForm(f => ({ ...f, delivery_time: e.target.value }))}
          placeholder="Delivery Time"
          className="input input-bordered flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
        />
        <button type="submit" className="btn-primary px-6 py-2 rounded-lg shadow hover:scale-105 transition">
          {editId ? "Update" : "Add"}
        </button>
        {editId && (
          <button type="button" onClick={() => { setEditId(null); setForm({ service_id: '', title: '', description: '', features: '', technologies: '', pricing: '', delivery_time: '' }); }} className="btn-outline px-6 py-2 rounded-lg">
            Cancel
          </button>
        )}
      </form>
      {isLoading ? (
        <div className="text-center text-lg text-gray-500">Loading...</div>
      ) : (
        <ul className="space-y-4">
          {filteredServices.map(s => (
            <li key={s.id} className="flex flex-col md:flex-row md:items-center justify-between bg-gray-50 rounded-lg p-4 shadow hover:shadow-md transition">
              <div>
                <b className="text-lg text-primary">{s.title}</b> <span className="text-gray-500">- {s.description}</span>
                <div className="text-xs text-gray-400">Service ID: {s.service_id}</div>
                <div className="text-xs text-gray-400">Features: {s.features}</div>
                <div className="text-xs text-gray-400">Technologies: {s.technologies}</div>
                <div className="text-xs text-gray-400">Pricing: {s.pricing}</div>
                <div className="text-xs text-gray-400">Delivery Time: {s.delivery_time}</div>
              </div>
              <div className="flex gap-2 mt-2 md:mt-0">
                <button onClick={() => { setEditId(s.id); setForm({ service_id: s.service_id, title: s.title, description: s.description, features: s.features, technologies: s.technologies, pricing: s.pricing, delivery_time: s.delivery_time }); }} className="btn-outline px-4 py-1 rounded-lg">Edit</button>
                <button onClick={() => deleteMutation.mutate(s.id)} className="btn-danger px-4 py-1 rounded-lg">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Services; 