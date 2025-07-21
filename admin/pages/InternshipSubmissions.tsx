import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAll, deleteOne } from "../api";
import { useState, useMemo } from "react";

const resource = "internship_submissions";

interface InternshipSubmission {
  id: number;
  name: string;
  email: string;
  phone: string;
  program: string;
  university: string;
  year_of_study: string;
  duration: string;
  resume_path: string;
  skills: string;
  experience: string;
  cover_letter: string;
  submitted_at: string;
}

const InternshipSubmissions = () => {
  const queryClient = useQueryClient();
  const { data: submissions = [], isLoading } = useQuery<InternshipSubmission[]>({ queryKey: [resource], queryFn: getAll.bind(null, resource) });
  const [search, setSearch] = useState("");

  const filtered = useMemo(() =>
    submissions.filter(s =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.phone.toLowerCase().includes(search.toLowerCase()) ||
      s.program.toLowerCase().includes(search.toLowerCase()) ||
      s.university.toLowerCase().includes(search.toLowerCase()) ||
      s.skills.toLowerCase().includes(search.toLowerCase()) ||
      s.experience.toLowerCase().includes(search.toLowerCase()) ||
      s.cover_letter.toLowerCase().includes(search.toLowerCase())
    ), [submissions, search]);

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteOne(resource, id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [resource] }),
  });

  const exportCSV = () => {
    const header = "Name,Email,Phone,Program,University,Year of Study,Duration,Skills,Experience,Cover Letter,Submitted At\n";
    const rows = filtered.map(s =>
      `"${s.name}","${s.email}","${s.phone}","${s.program}","${s.university}","${s.year_of_study}","${s.duration}","${s.skills}","${s.experience}","${s.cover_letter}","${s.submitted_at}"`
    ).join("\n");
    const csv = header + rows;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'internship_submissions.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-4 text-primary">Internship Applications</h1>
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by any field"
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
                <div className="text-xs text-gray-400">{s.program} | {s.university} | {s.year_of_study} | {s.duration}</div>
                <div className="text-xs text-gray-400">{s.submitted_at}</div>
                <div className="mt-2 text-gray-700"><b>Skills:</b> {s.skills}</div>
                <div className="mt-2 text-gray-700"><b>Experience:</b> {s.experience}</div>
                <div className="mt-2 text-gray-700"><b>Cover Letter:</b> {s.cover_letter}</div>
                {s.resume_path && (
                  <div className="mt-2">
                    <a
                      href={`/uploads/${s.resume_path.split('uploads/').pop()?.replace(/\\/g, '/')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Download Resume
                    </a>
                  </div>
                )}
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

export default InternshipSubmissions; 