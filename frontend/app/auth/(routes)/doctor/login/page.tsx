"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        ("https://hcl-hackthon.vercel.app/") + "/api/doctor/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      alert("Login successful!");
      setLoading(false);

      // TODO: dashboard redirect
      // router.push("/dashboard");

    } catch (err) {
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      {/* Left Side */}
      <aside className="w-full md:w-1/2 bg-white px-6 sm:px-12 md:px-20 py-12 flex flex-col justify-between">

        <header>
          <div className="text-indigo-600 font-semibold text-xl">Soul</div>
        </header>

        <main className="mt-8 max-w-xl">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-600 leading-tight">
            Doctor Login
          </h1>

          <p className="mt-4 text-gray-500">
            Access your account and continue your health journey.
          </p>

          <form className="mt-6" onSubmit={handleSubmit}>

            <div className="mb-1 text-indigo-500 font-medium flex items-center">
              <svg
                className="w-4 h-4 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Email Section
            </div>

            <div className="border border-gray-200 rounded-md overflow-hidden">
              <label className="block px-4 py-3 border-b border-gray-200">
                <div className="text-sm text-gray-400">Email Address</div>
                <input
                  type="email"
                  className="mt-1 w-full outline-none bg-transparent text-indigo-600 font-medium"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>

              <label className="block px-4 py-3">
                <div className="text-sm text-gray-400">Password</div>
                <input
                  type="password"
                  className="mt-1 w-full outline-none bg-transparent text-gray-800"
                  placeholder="************"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

            <div className="mt-6 flex items-center gap-4">
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white rounded shadow-md hover:bg-indigo-700"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              <Link
                href="/auth/admin/register"
                className="px-5 py-2 border border-indigo-400 text-indigo-600 rounded"
              >
                Sign Up
              </Link>
            </div>

          </form>
        </main>

        <footer className="text-xs text-gray-400 mt-8">
          &copy; {new Date().getFullYear()} Soul — All rights reserved
        </footer>
      </aside>

      {/* Right Side */}
      <section className="hidden md:flex w-full md:w-1/2 bg-gray-100 relative">
        <div className="flex items-center justify-center w-full">
          <div className="max-w-lg w-full">
            <Image
              src="/doctor.png"
              alt="Illustration"
              width={500}
              height={420}
              priority
            />
          </div>
        </div>
      </section>

    </div>
  );
}
