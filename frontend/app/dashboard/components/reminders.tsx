"use client";
import React, { useEffect, useState } from "react";

type Reminder = { id: string; text: string; due?: string };

const defaultReminders: Reminder[] = [
  { id: "r1", text: "Annual blood test due", due: "2025-01-10" },
  { id: "r2", text: "Flu vaccine recommended", due: "2024-11-01" },
  { id: "r3", text: "Mental health check-in", due: "2024-12-01" },
];

export default function Reminders() {
  const [reminders, setReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    try {
      const auth = JSON.parse(localStorage.getItem("auth") || "null");
      const key = `reminders_${auth?.user?.email || "anon"}`;
      const stored = JSON.parse(localStorage.getItem(key) || "null");
      setReminders(stored || defaultReminders);
    } catch (e) {
      setReminders(defaultReminders);
    }
  }, []);

  function dismiss(id: string) {
    const next = reminders.filter(r => r.id !== id);
    setReminders(next);
    try {
      const auth = JSON.parse(localStorage.getItem("auth") || "null");
      const key = `reminders_${auth?.user?.email || "anon"}`;
      localStorage.setItem(key, JSON.stringify(next));
      const log = JSON.parse(localStorage.getItem("auditLog") || "[]");
      log.push({ ts: Date.now(), event: "dismiss_reminder", id });
      localStorage.setItem("auditLog", JSON.stringify(log));
    } catch (e) {}
  }

  return (
    <section className="bg-white rounded-2xl p-4 border shadow-sm">
      <h3 className="text-lg md:text-xl font-semibold tracking-tight text-gray-900">Reminders</h3>
      <p className="text-sm text-gray-500">Preventive care reminders</p>

      <ul className="mt-3 space-y-2">
        {reminders.map(r => (
          <li key={r.id} className="flex items-start justify-between bg-gray-50 p-3 rounded-md">
            <div>
              <div className="text-sm font-medium">{r.text}</div>
              {r.due && <div className="text-xs text-gray-500">Due: {r.due}</div>}
            </div>
            <button onClick={() => dismiss(r.id)} className="text-sm text-blue-600">Dismiss</button>
          </li>
        ))}
        {reminders.length === 0 && <li className="text-sm text-gray-500">No reminders. You're up to date.</li>}
      </ul>
    </section>
  );
}
