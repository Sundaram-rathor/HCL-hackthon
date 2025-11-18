"use client";
import React, { useState } from "react";
import DoctorCard from "../dashboard/components/doctorCard";
import Link from "next/link";

export default function ConsultationsPage() {
  const [query, setQuery] = useState("");

  const doctors = [
    { id: 1, name: "Dr. Priya Sharma", specialty: "Pulmonologist", clinic: "City Health Clinic", rating: 4.8 },
    { id: 2, name: "Dr. Mark Lee", specialty: "Psychiatrist", clinic: "MindWell Center", rating: 4.6 },
    { id: 3, name: "Dr. Asha Patel", specialty: "General Physician", clinic: "Downtown Medical", rating: 4.7 },
    { id: 4, name: "Dr. Rahul Mehta", specialty: "Cardiologist", clinic: "HeartCare Clinic", rating: 4.9 },
    { id: 5, name: "Dr. Neha Gupta", specialty: "Dermatologist", clinic: "SkinPlus", rating: 4.5 },
  ];

  const filtered = doctors.filter(
    (d) =>
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.specialty.toLowerCase().includes(query.toLowerCase()) ||
      d.clinic.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">New Consultation</h1>
            <p className="text-sm text-gray-600 mt-1">Choose a doctor to start a consultation.</p>
          </div>

          <div className="flex items-center gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search doctors, specialty or clinic..."
              className="px-3 py-2 border rounded-md bg-white text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <Link href="/dashboard" className="text-sm text-gray-600 hover:underline">Back to Dashboard</Link>
          </div>
        </header>

        <section>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((doc) => (
              <DoctorCard key={doc.id} doctor={doc} />
            ))}

            {filtered.length === 0 && (
              <div className="p-6 bg-white rounded-lg border text-gray-600">No doctors match your search.</div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
