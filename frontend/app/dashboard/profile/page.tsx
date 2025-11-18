"use client";
import React, { useState } from "react";
import Sidebar from "../../dashboard/components/sidebar";
import UserCard from "../components/userCard";

export default function ProfilePage() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [bio, setBio] = useState("Passionate about staying healthy and active. I prefer teleconsultations in the evenings.");
  const [editing, setEditing] = useState(false);

  
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    avatarLetter: "J",
    stats: { appointments: 4, prescriptions: 2, doctors: 3 },
  };

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
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-gray-900">My Profile</h1>
                <p className="text-sm text-gray-600">Manage your personal details and preferences.</p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <UserCard user={user} />
            </div>

            <div className="lg:col-span-2">
              <section className="bg-white rounded-2xl p-6 shadow-sm border">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg md:text-xl font-semibold tracking-tight text-gray-900">About</h2>
                  <div className="flex items-center gap-2">
                    {!editing ? (
                      <button onClick={() => setEditing(true)} className="text-sm px-3 py-1 border rounded-md">Edit</button>
                    ) : (
                      <div className="flex gap-2">
                        <button onClick={() => setEditing(false)} className="text-sm px-3 py-1 bg-green-600 text-white rounded-md">Save</button>
                        <button onClick={() => { setEditing(false); }} className="text-sm px-3 py-1 border rounded-md">Cancel</button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  {!editing ? (
                    <p className="text-sm text-gray-700">{bio}</p>
                  ) : (
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full h-32 p-3 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                  )}
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm text-gray-500">Email</h3>
                    <div className="mt-1 text-gray-900">{user.email}</div>
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-500">Phone</h3>
                    <div className="mt-1 text-gray-900">{user.phone}</div>
                  </div>
                </div>
              </section>

              <section className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-semibold text-gray-900">Preferences</h2>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Preferred Consultation Mode</div>
                      <div className="mt-1 text-gray-900">Teleconsultation</div>
                    </div>

                    <div>
                      <div className="text-sm text-gray-500">Notification</div>
                      <div className="mt-1 text-gray-900">Email & SMS</div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
