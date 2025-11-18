"use client";
import React, { useState } from "react";
import Sidebar from "../dashboard/components/sidebar";
import Link from "next/link";

export default function ProviderPage() {
  const [showSidebar, setShowSidebar] = useState(false);
  const patients = [
    { id: "p1", name: "John Doe", status: "Compliant" },
    { id: "p2", name: "Sara Khan", status: "Missed appointment" },
    { id: "p3", name: "Alex Lee", status: "Needs follow-up" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="flex">
        <Sidebar show={showSidebar} onClose={() => setShowSidebar(false)} />

        <main className="flex-1 p-6 lg:pl-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button
                aria-label="Toggle menu"
                onClick={() => setShowSidebar((s) => !s)}
                className="lg:hidden p-2 rounded-md bg-white border shadow-sm"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>

              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-gray-900">Provider View</h1>
                <p className="text-sm text-gray-600">Assigned patients and compliance status</p>
              </div>
            </div>
          </div>

          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {patients.map(p => (
              <div key={p.id} className="bg-white rounded-lg p-4 border shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{p.name}</div>
                    <div className="text-xs text-gray-500">{p.status}</div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link href={`/dashboard/profile?patient=${p.id}`} className="text-sm text-blue-600">View profile</Link>
                    <Link href={`/consultations`} className="text-sm text-gray-600">Start consult</Link>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}
