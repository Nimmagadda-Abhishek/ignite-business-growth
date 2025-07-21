import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAll, deleteOne } from "../api";
import { useState, useMemo } from "react";

const resource = "contact_submissions";

interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  submitted_at: string;
}

const ContactSubmissions = () => {
  const queryClient = useQueryClient();
  const { data: submissions = [], isLoading } = useQuery<ContactSubmission[]>({ queryKey: [resource], queryFn: getAll.bind(null, resource) });
  const [search, setSearch] = useState("");

  const filtered = useMemo(() =>
    submissions.filter(s =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.phone.toLowerCase().includes(search.toLowerCase()) ||
      s.message.toLowerCase().includes(search.toLowerCase())
    ), [submissions, search]);

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteOne(resource, id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [resource] }),
  });

  const exportCSV = () => {
    const header = "Name,Email,Phone,Message,Submitted At\n";
    const rows = filtered.map(s =>
      `"${s.name}","${s.email}","${s.phone}","${s.message.replace(/"/g, '""')}","${s.submitted_at}"`
    ).join("\n");
    const csv = header + rows;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contact_submissions.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-4 text-primary">Contact Form Submissions</h1>
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name, email, phone, or message"
          className="input input-bordered w-full md:w-1/2 px-4 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
        />
        <button
          onClick={exportCSV}
          className="btn-primary px-6 py-2 rounded-lg shadow hover:scale-105 transition"
        >
          Export CSV
        </button>
      </div>
      {isLoading ? (
        <div className="text-center text-lg text-gray-500">Loading...</div>
      ) : (
        <ul className="space-y-4">
          {filtered.map(s => (
            <li key={s.id} className="flex flex-col md:flex-row md:items-center justify-between bg-gray-50 rounded-lg p-4 shadow hover:shadow-md transition">
              <div>
                <b className="text-lg text-primary">{s.name}</b> <span className="text-gray-500">({s.email}, {s.phone})</span>
                <div className="text-xs text-gray-400">{s.submitted_at}</div>
                <div className="mt-2 text-gray-700">{s.message}</div>
              </div>
              <div className="flex gap-2 mt-2 md:mt-0">
                <button onClick={() => deleteMutation.mutate(s.id)} className="btn-danger px-4 py-1 rounded-lg">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContactSubmissions; 