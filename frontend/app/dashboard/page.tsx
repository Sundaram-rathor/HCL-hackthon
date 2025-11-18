"use client";
import React, { useState } from "react";
import Sidebar from "./components/sidebar";
import UserCard from "./components/userCard";
import DoctorCard from "./components/doctorCard";
import Link from "next/link";

export default function DashboardPage() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [active, setActive] = useState("dashboard");
  const [query, setQuery] = useState("");

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    avatarLetter: "J",
    stats: { appointments: 4, prescriptions: 2, doctors: 3 },
  };

  const doctors = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      specialty: "Pulmonologist",
      clinic: "City Health Clinic",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Dr. Mark Lee",
      specialty: "Psychiatrist",
      clinic: "MindWell Center",
      rating: 4.6,
    },
    {
      id: 3,
      name: "Dr. Asha Patel",
      specialty: "General Physician",
      clinic: "Downtown Medical",
      rating: 4.7,
    },
  ];

  const filteredDoctors = doctors.filter(
    (d) =>
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.specialty.toLowerCase().includes(query.toLowerCase()) ||
      d.clinic.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="flex">
        <Sidebar
          show={showSidebar}
          onClose={() => setShowSidebar(false)}
          active={active}
          onNavigate={(k) => {
            setActive(k);
            setShowSidebar(false);
          }}
        />

        <main className="flex-1 p-6 lg:pl-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button
                aria-label="Toggle menu"
                onClick={() => setShowSidebar((s) => !s)}
                className="lg:hidden p-2 rounded-md bg-white border shadow-sm"
              >
                {/* simple menu icon */}
                <svg
                  className="w-5 h-5 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </button>

              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-600">
                  Overview of your profile and consulting doctors
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-4">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search doctors..."
                className="px-3 py-2 border rounded-md bg-white text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              <Link
                href="/consultations"
                className="px-3 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700"
              >
                New Consultation
              </Link>
            </div>
          </div>

          <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <UserCard user={user} />
            </div>

            <div className="lg:col-span-2">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Your Consulting Doctors
                </h2>
                <div className="flex items-center gap-2 sm:hidden">
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search doctors..."
                    className="px-3 py-2 border rounded-md bg-white text-sm w-48 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {filteredDoctors.map((doc) => (
                  <DoctorCard key={doc.id} doctor={doc} />
                ))}

                {filteredDoctors.length === 0 && (
                  <div className="p-6 bg-white rounded-lg border text-gray-600">
                    No doctors found.
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}