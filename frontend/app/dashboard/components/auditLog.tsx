"use client";
import React, { useEffect, useState } from "react";

export default function AuditLog() {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    try {
      const all = JSON.parse(localStorage.getItem("auditLog") || "[]");
      setLogs(all.reverse());
    } catch (e) { setLogs([]); }
  }, []);

  return (
    <section id="audit" className="bg-white rounded-2xl p-4 border shadow-sm">
      <h3 className="text-lg md:text-xl font-semibold tracking-tight text-gray-900">Privacy & Audit Log</h3>
      <p className="text-sm text-gray-500">Recent actions related to your data access and changes.</p>

      <ul className="mt-3 space-y-2 text-sm max-h-56 overflow-auto">
        {logs.length === 0 && <li className="text-gray-500">No activity yet.</li>}
        {logs.map((l, i) => (
          <li key={i} className="p-2 bg-gray-50 rounded-md">
            <div className="text-xs text-gray-500">{new Date(l.ts).toLocaleString()}</div>
            <div className="font-medium">{l.event}</div>
            {l.user && <div className="text-gray-600 text-xs">{l.user}</div>}
            {l.details && <pre className="text-xs text-gray-600 mt-1">{JSON.stringify(l.details)}</pre>}
          </li>
        ))}
      </ul>
    </section>
  );
}
