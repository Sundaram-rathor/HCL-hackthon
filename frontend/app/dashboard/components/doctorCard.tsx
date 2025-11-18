"use client";
import React from "react";

type Doctor = {
  id: number;
  name: string;
  specialty: string;
  clinic: string;
  rating?: number;
};

export default function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <article className="bg-white rounded-xl p-4 border shadow-sm hover:shadow-md transition">
      <div className="flex items-start gap-4">
        <div className="flex-none w-12 h-12 rounded-md bg-gradient-to-br from-green-400 to-teal-400 text-white flex items-center justify-center font-semibold">
          {doctor.name.charAt(0)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900 truncate">{doctor.name}</h3>
            <div className="text-xs text-gray-500">{doctor.rating ? `${doctor.rating}★` : "—"}</div>
          </div>

          <p className="text-sm text-gray-600 mt-1">{doctor.specialty} · {doctor.clinic}</p>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-xs text-gray-500">Available for consultation</div>
            <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700">Consult</button>
          </div>
        </div>
      </div>
    </article>
  );
}
