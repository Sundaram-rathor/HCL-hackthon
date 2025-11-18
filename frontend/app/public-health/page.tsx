"use client";
import React from "react";
import Link from "next/link";

export default function PublicHealthPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-5xl mx-auto px-6">
        <header className="mb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">Public Health Information</h1>
          <p className="text-sm text-gray-600 mt-1">General guidance, hotlines and privacy policy.</p>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="bg-white rounded-2xl p-6 shadow-sm border">
            <h2 className="font-semibold text-lg md:text-xl">Hotlines & Immediate Help</h2>
            <ul className="mt-3 text-sm space-y-2">
              <li>National Suicide Prevention Lifeline: 988 (US)</li>
              <li>Emergency: 911</li>
              <li>Local Health Department: contact your local clinic</li>
            </ul>
          </section>

          <section className="bg-white rounded-2xl p-6 shadow-sm border">
            <h2 className="font-semibold text-lg md:text-xl">Privacy Policy (summary)</h2>
            <p className="text-sm text-gray-600 mt-3">
              This app stores minimal mock data locally. In production, we use secure authentication (hashed passwords, JWT),
              encrypted transport (TLS), audit logging and explicit consent for data usage.
            </p>
            <div className="mt-4">
              <Link href="/dashboard" className="text-sm text-blue-600">Back to Dashboard</Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
