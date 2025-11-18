"use client";
import React from "react";

type User = {
  name: string;
  email: string;
  phone: string;
  location: string;
  avatarLetter?: string;
  stats?: { appointments: number; prescriptions: number; doctors: number };
};

export default function UserCard({ user }: { user: User }) {
  return (
    <aside className="bg-white rounded-2xl p-6 shadow-sm border">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-500 text-white flex items-center justify-center text-2xl font-bold">
          {user.avatarLetter || user.name?.charAt(0)?.toUpperCase() || "U"}
        </div>

        <div>
          <div className="text-lg font-semibold text-gray-900">{user.name}</div>
          <div className="text-sm text-gray-500">{user.location}</div>
          <div className="mt-2 text-sm text-gray-600">{user.email} · {user.phone}</div>
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

      <div className="mt-5 flex gap-3">
        <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-md">View Profile</button>
        <button className="px-3 py-2 border rounded-md">Edit</button>
      </div>
    </aside>
  );
}
