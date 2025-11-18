"use client";
import React, { useEffect, useState, useRef } from "react";

export default function MessageModal({
  doctor,
  onClose,
}: {
  doctor: { id: number; name: string } | null;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<{ id: string; sender: string; text: string; ts: number }[]>([]);
  const [text, setText] = useState("");
  const scroller = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!doctor) return;
    try {
      const key = `messages_${doctor.id}`;
      const stored = JSON.parse(localStorage.getItem(key) || "[]");
      setMessages(stored);
      setTimeout(() => scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" }), 50);
    } catch (e) {
      setMessages([]);
    }
  }, [doctor]);

  function send() {
    if (!doctor || !text.trim()) return;
    const m = { id: Date.now().toString(), sender: "you", text: text.trim(), ts: Date.now() };
    const next = [...messages, m];
    setMessages(next);
    try {
      const key = `messages_${doctor.id}`;
      localStorage.setItem(key, JSON.stringify(next));
      // also add audit entry
      const log = JSON.parse(localStorage.getItem("auditLog") || "[]");
      log.push({ ts: Date.now(), event: "sent_message", to: doctor.name, text: m.text });
      localStorage.setItem("auditLog", JSON.stringify(log));
    } catch (e) {}
    setText("");
    setTimeout(() => scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" }), 50);
  }

  if (!doctor) return null;

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-xl border p-4 z-10 flex flex-col max-h-[80vh]">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="text-lg font-extrabold tracking-tight text-gray-900">{doctor.name}</div>
            <div className="text-sm text-gray-500">Message the doctor directly</div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              Close
            </button>
          </div>
        </div>

        <div ref={scroller} className="flex-1 overflow-auto p-2 space-y-2 bg-gray-50 rounded-md">
          {messages.length === 0 && <div className="text-sm text-gray-500 text-center py-6">No messages yet. Say hello 👋</div>}
          {messages.map((m) => (
            <div key={m.id} className={`max-w-[80%] p-2 rounded-md ${m.sender === "you" ? "ml-auto bg-blue-600 text-white" : "bg-white border text-gray-800"}`}>
              <div className="text-xs opacity-80">{m.sender === "you" ? "You" : m.sender}</div>
              <div className="mt-1 text-sm">{m.text}</div>
              <div className="text-[10px] text-gray-400 mt-1 text-right">{new Date(m.ts).toLocaleTimeString()}</div>
            </div>
          ))}
        </div>

        <div className="mt-3 flex gap-2 items-center">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={2}
            placeholder="Write a message..."
            className="flex-1 px-3 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm"
          />
          <button onClick={send} className="px-4 py-2 bg-blue-600 text-white rounded-md">Send</button>
        </div>
      </div>
    </div>
  );
}
