"use client";
import React, { useEffect, useState } from "react";

type User = {
  id?: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  avatarLetter?: string;
  stats?: { appointments: number; prescriptions: number; doctors: number };
  allergies?: string;
  medications?: string;
};

export default function UserCard({ user: initialUser }: { user: User }) {
  const [user, setUser] = useState<User>(initialUser);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    // load stored profile if exists
    try {
      const auth = JSON.parse(localStorage.getItem("auth") || "null");
      if (auth?.user) {
        const stored = JSON.parse(localStorage.getItem(`profile_${auth.user.email}`) || "null");
        if (stored) setUser(prev => ({ ...prev, ...stored }));
      }
    } catch (e) { }
  }, []);

  const name = localStorage.getItem('user')
  const email = localStorage.getItem('email')

  return (
    <aside className="bg-white rounded-2xl p-6 shadow-sm border">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-500 text-white flex items-center justify-center text-2xl font-bold">
          {user.avatarLetter || user.name?.charAt(0)?.toUpperCase() || "U"}
        </div>

        <div className="flex-1 min-w-0">
          <div className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900">{name}</div>
          <div className="text-sm md:text-base text-gray-500">{user.location}</div>
          <div className="mt-2 text-sm text-gray-600">{email} · {user.phone}</div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        <div className="text-center">
          <div className="text-sm text-gray-500">Appointments</div>
          <div className="mt-1 font-semibold text-gray-900">{user.stats?.appointments ?? 0}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-500">Prescriptions</div>
          <div className="mt-1 font-semibold text-gray-900">{user.stats?.prescriptions ?? 0}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-500">Doctors</div>
          <div className="mt-1 font-semibold text-gray-900">{user.stats?.doctors ?? 0}</div>
        </div>
      </div>

      <div className="mt-5">
        {!editing ? (
          <>
            <div className="text-sm text-gray-600"><strong>Allergies:</strong> {user.allergies || "Not set"}</div>
            <div className="mt-2 text-sm text-gray-600"><strong>Medications:</strong> {user.medications || "Not set"}</div>
            <div className="mt-4 flex gap-3">
              <button onClick={() => setEditing(true)} className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-md">Edit</button>
              <button onClick={() => {
                // view audit log
                window.location.href = "/dashboard#audit";
              }} className="px-3 py-2 border rounded-md">Audit</button>
            </div>
          </>
        ) : (
          <div className="space-y-3">
            <input value={user.allergies || ""} onChange={(e) => setUser({ ...user, allergies: e.target.value })} placeholder="Allergies (comma separated)" className="w-full px-3 py-2 border rounded-md" />
            <input value={user.medications || ""} onChange={(e) => setUser({ ...user, medications: e.target.value })} placeholder="Current medications" className="w-full px-3 py-2 border rounded-md" />
            <div className="flex gap-3">
              <button className="px-3 py-2 bg-green-600 text-white rounded-md">Save</button>
              <button onClick={() => setEditing(false)} className="px-3 py-2 border rounded-md">Cancel</button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
