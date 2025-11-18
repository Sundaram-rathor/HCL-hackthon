"use client";
import React from "react";

export default function HealthCard({ title, description }:{title: string, description: string}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <button className="px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white text-sm rounded">
        Read More
      </button>
    </div>
  );
}
