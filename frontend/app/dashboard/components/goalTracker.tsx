"use client";
import React, { useEffect, useState } from "react";

type Entry = { date: string; steps?: number; waterGlasses?: number; note?: string };

function todayKey() {
  const d = new Date().toISOString().slice(0,10);
  return d;
}

export default function GoalTracker() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [steps, setSteps] = useState<number | "">("");
  const [water, setWater] = useState<number | "">("");
  const [note, setNote] = useState("");

  useEffect(() => {
    try {
      const auth = JSON.parse(localStorage.getItem("auth") || "null");
      const key = `goals_${auth?.user?.email || "anon"}`;
      const stored = JSON.parse(localStorage.getItem(key) || "[]");
      setEntries(stored);
      const today = stored.find((e: Entry) => e.date === todayKey());
      if (today) {
        setSteps(today.steps ?? "");
        setWater(today.waterGlasses ?? "");
        setNote(today.note ?? "");
      }
    } catch (e) {}
  }, []);

  function saveEntry() {
    try {
      const auth = JSON.parse(localStorage.getItem("auth") || "null");
      const key = `goals_${auth?.user?.email || "anon"}`;
      const today = todayKey();
      const newEntry: Entry = { date: today, steps: Number(steps) || 0, waterGlasses: Number(water) || 0, note };
      const others = entries.filter(e => e.date !== today);
      const updated = [newEntry, ...others].slice(0, 30);
      localStorage.setItem(key, JSON.stringify(updated));
      setEntries(updated);

      // audit
      const log = JSON.parse(localStorage.getItem("auditLog") || "[]");
      log.push({ ts: Date.now(), event: "goal_log", user: auth?.user?.email, details: newEntry });
      localStorage.setItem("auditLog", JSON.stringify(log));
    } catch (e) {}
  }

  return (
    <section className="bg-white rounded-2xl p-4 border shadow-sm">
      <h3 className="text-lg md:text-xl font-semibold tracking-tight text-gray-900">Goal Tracker</h3>
      <p className="text-sm text-gray-500">Log daily steps and water intake.</p>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <input value={steps} onChange={(e) => setSteps(e.target.value === "" ? "" : Number(e.target.value))} placeholder="Steps" className="px-3 py-2 border rounded-md" />
        <input value={water} onChange={(e) => setWater(e.target.value === "" ? "" : Number(e.target.value))} placeholder="Water (glasses)" className="px-3 py-2 border rounded-md" />
        <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Short note" className="px-3 py-2 border rounded-md" />
      </div>

      <div className="mt-3 flex gap-3">
        <button onClick={saveEntry} className="px-3 py-2 bg-blue-600 text-white rounded-md">Save</button>
        <button onClick={() => { setSteps(""); setWater(""); setNote(""); }} className="px-3 py-2 border rounded-md">Clear</button>
      </div>

      <div className="mt-4 text-sm">
        <div className="font-medium mb-1">Recent entries</div>
        <ul className="space-y-2 max-h-40 overflow-auto">
          {entries.map(e => (
            <li key={e.date} className="text-xs bg-gray-50 p-2 rounded-md flex justify-between">
              <div>
                <div className="font-medium">{e.date}</div>
                <div className="text-gray-600">Steps: {e.steps} · Water: {e.waterGlasses}</div>
              </div>
              <div className="text-gray-500 ml-2">{e.note}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
