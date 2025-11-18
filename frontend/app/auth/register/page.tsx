"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [consent, setConsent] = useState(false);
  const [err, setErr] = useState("");

  function handleRegister() {
    if (!name || !email || !password) {
      setErr("Please fill all fields.");
      return;
    }
    if (!consent) {
      setErr("Please consent to data usage to continue.");
      return;
    }

    // mock register
    const user = { id: Date.now().toString(), name, email };
    const token = "mock-jwt-token";
    localStorage.setItem("auth", JSON.stringify({ token, user }));

    // audit
    const log = JSON.parse(localStorage.getItem("auditLog") || "[]");
    log.push({ ts: Date.now(), event: "register", user: email });
    localStorage.setItem("auditLog", JSON.stringify(log));

    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white p-6">
      <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">Create account</h1>
        <p className="text-sm text-gray-500 mb-4">Register as a patient or healthcare provider.</p>

        <div className="space-y-3">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="w-full px-3 py-2 border rounded-md" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full px-3 py-2 border rounded-md" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full px-3 py-2 border rounded-md" />

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={consent} onChange={() => setConsent(c => !c)} className="w-4 h-4" />
            <span>I consent to limited data usage for providing telehealth services.</span>
          </label>

          {err && <div className="text-sm text-red-600">{err}</div>}

          <button onClick={handleRegister} className="w-full py-2 bg-blue-600 text-white rounded-md">Create account</button>

          <div className="text-sm text-center">
            <Link href="/auth/login" className="text-blue-600">Already have an account?</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
