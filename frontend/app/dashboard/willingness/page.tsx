"use client";
import React, { useMemo, useState } from "react";
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
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [selected, setSelected] = useState<typeof healthData[number] | null>(null);

  const tags = useMemo(() => {
    const unique = Array.from(new Set(healthData.map((h) => h.tag).filter(Boolean)));
    return ["All", ...unique];
  }, [healthData]);

  const filtered = healthData.filter((d) => {
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      d.title.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q) ||
      (d.tag && d.tag.toLowerCase().includes(q));
    const matchesTag = !activeTag || activeTag === "All" ? true : d.tag === activeTag;
    return matchesQuery && matchesTag;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-gray-900">
              Willingness Card
            </h1>
            <p className="text-sm text-gray-600">
              Manage your consultation preferences and consent.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 items-center">
              <span className="text-sm text-gray-500 mr-2">Filter:</span>
              {tags.map((t) => {
                const active = t === activeTag || (t === "All" && activeTag === null);
                return (
                  <button
                    key={t}
                    onClick={() => setActiveTag(t === "All" ? null : t)}
                    className={`text-sm px-3 py-1 rounded-full transition ${
                      active
                        ? "bg-blue-600 text-white"
                        : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
                    }`}
                    aria-pressed={active}
                  >
                    {t}
                  </button>
                );
              })}
              <span className="ml-3 text-sm text-gray-500">Results: {filtered.length}</span>
            </div>
          </div>

          <div className="w-full md:w-96">
            <label className="relative block">
              <span className="sr-only">Search topics</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search health topics..."
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-200 bg-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                aria-label="Search health topics"
              />
              <svg
                className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M21 21l-4.35-4.35"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="11"
                  cy="11"
                  r="6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </label>
          </div>
        </header>

        <section>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item, index) => (
              <div
                key={index}
                role="button"
                tabIndex={0}
                onClick={() => setSelected(item)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setSelected(item);
                }}
                className="transform transition hover:-translate-y-1 focus:-translate-y-1 outline-none"
              >
                <HealthCard
                  title={item.title}
                  description={item.description}
                  tag={item.tag}
                />
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="mt-8 bg-white border rounded-lg p-6 text-center text-gray-600">
              No topics match your search. Try a different keyword or clear filters.
            </div>
          )}
        </section>
      </div>

      {/* Modal: simple accessible overlay */}
      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selected.title}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          />
          <div className="relative max-w-2xl w-full bg-white rounded-2xl shadow-xl border p-6 z-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{selected.title}</h2>
                <div className="mt-2 text-sm text-gray-600">{selected.tag}</div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 18L18 6M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-4 text-gray-700 leading-relaxed">
              {selected.description}
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setSelected(null)}
                className="px-4 py-2 border rounded-md text-sm"
              >
                Close
              </button>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
              >
                Read more
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}