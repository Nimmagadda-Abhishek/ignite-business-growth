import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAll, createOne, updateOne, deleteOne } from "../api";
import { useState, useMemo } from "react";

const resource = "faqs";

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const Testimonials = () => {
  const queryClient = useQueryClient();
  const { data: faqs = [], isLoading } = useQuery<FAQ[]>({ queryKey: [resource], queryFn: getAll.bind(null, resource) });
  const [form, setForm] = useState({ question: "", answer: "" });
  const [editId, setEditId] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const filteredFaqs = useMemo(() =>
    faqs.filter(f =>
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase())
    ), [faqs, search]);

  const createMutation = useMutation({
    mutationFn: (data: Omit<FAQ, 'id'>) => createOne(resource, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [resource] }),
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Omit<FAQ, 'id'> }) => updateOne(resource, id, data),
    onSuccess: () => {
      setEditId(null);
      setForm({ question: '', answer: '' });
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
    setForm({ question: '', answer: '' });
  };

  const exportCSV = () => {
    const header = "Question,Answer\n";
    const rows = filteredFaqs.map(f =>
      `"${f.question}","${f.answer.replace(/"/g, '""')}"`
    ).join("\n");
    const csv = header + rows;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'faqs.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-4 text-primary">Manage FAQs (Testimonials)</h1>
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by question or answer"
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
          value={form.question}
          onChange={e => setForm(f => ({ ...f, question: e.target.value }))}
          placeholder="Question"
          required
          className="input input-bordered flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
        />
        <input
          value={form.answer}
          onChange={e => setForm(f => ({ ...f, answer: e.target.value }))}
          placeholder="Answer"
          required
          className="input input-bordered flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
        />
        <button type="submit" className="btn-primary px-6 py-2 rounded-lg shadow hover:scale-105 transition">
          {editId ? "Update" : "Add"}
        </button>
        {editId && (
          <button type="button" onClick={() => { setEditId(null); setForm({ question: '', answer: '' }); }} className="btn-outline px-6 py-2 rounded-lg">
            Cancel
          </button>
        )}
      </form>
      {isLoading ? (
        <div className="text-center text-lg text-gray-500">Loading...</div>
      ) : (
        <ul className="space-y-4">
          {filteredFaqs.map(f => (
            <li key={f.id} className="flex flex-col md:flex-row md:items-center justify-between bg-gray-50 rounded-lg p-4 shadow hover:shadow-md transition">
              <div>
                <b className="text-lg text-primary">{f.question}</b> <span className="text-gray-500">- {f.answer}</span>
              </div>
              <div className="flex gap-2 mt-2 md:mt-0">
                <button onClick={() => { setEditId(f.id); setForm({ question: f.question, answer: f.answer }); }} className="btn-outline px-4 py-1 rounded-lg">Edit</button>
                <button onClick={() => deleteMutation.mutate(f.id)} className="btn-danger px-4 py-1 rounded-lg">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Testimonials; 