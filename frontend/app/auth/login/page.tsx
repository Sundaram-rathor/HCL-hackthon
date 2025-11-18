"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  function handleLogin() {
    if (!email || !password) {
      setErr("Please provide email and password.");
      return;
    }

    // mock verify: accept any credentials
    const user = { id: "u1", name: "John Doe", email };
    const token = "mock-jwt-token";
    localStorage.setItem("auth", JSON.stringify({ token, user }));
    // audit
    const log = JSON.parse(localStorage.getItem("auditLog") || "[]");
    log.push({ ts: Date.now(), event: "login", user: email });
    localStorage.setItem("auditLog", JSON.stringify(log));

    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white p-6">
      <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-2">Sign in</h1>
        <p className="text-sm text-gray-500 mb-4">Use your account to access the dashboard.</p>

        <div className="space-y-3">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border rounded-md"
          />
          {err && <div className="text-sm text-red-600">{err}</div>}

          <button onClick={handleLogin} className="w-full py-2 bg-blue-600 text-white rounded-md">Sign in</button>

          <div className="text-sm text-center">
            <Link href="/auth/register" className="text-blue-600">Create an account</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
