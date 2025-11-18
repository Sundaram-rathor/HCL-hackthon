"use client";
import React, { useState } from "react";
import HealthCard from "./components/card";

export default function HealthPage() {
  const healthData = [
    {
      title: "COVID-19 Updates",
      description:
        "Stay informed about the latest COVID-19 guidelines and vaccination information.",
      tag: "Updates",
    },
    {
      title: "Seasonal Flu Prevention",
      description:
        "Learn about steps you can take to prevent the seasonal flu and when to get vaccinated.",
      tag: "Prevention",
    },
    {
      title: "Mental Health Awareness",
      description:
        "Explore resources and support options for maintaining good mental health.",
      tag: "Wellness",
    },
  ];

  const [query, setQuery] = useState("");

  const filtered = healthData.filter(
    (d) =>
      d.title.toLowerCase().includes(query.toLowerCase()) ||
      d.description.toLowerCase().includes(query.toLowerCase()) ||
      (d.tag && d.tag.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Health & Wellness
            </h1>
            <p className="mt-2 text-gray-600">
              Latest updates, prevention tips, and mental health resources.
            </p>
          </div>

          
        </header>

        <section>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item, index) => (
              <HealthCard
                key={index}
                title={item.title}
                description={item.description}
                tag={item.tag}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
