"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function ContactSupportPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-6">
        <header className="mb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-gray-900">Contact Support</h1>
          <p className="text-sm text-gray-600 mt-1">Describe your issue and our team will get back to you.</p>
        </header>

        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          {!sent ? (
            <>
              <div className="grid gap-4">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="px-3 py-2 border rounded-md text-sm"
                />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="px-3 py-2 border rounded-md text-sm"
                />
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help?"
                  className="px-3 py-2 border rounded-md text-sm h-36"
                />
              </div>

              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={() => {
                    // no backend: simulate send
                    setSent(true);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  Send Message
                </button>

                <Link href="/dashboard" className="text-sm text-gray-600 hover:underline">
                  Back to Dashboard
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="text-lg font-semibold text-gray-900">Thanks — message sent</div>
              <p className="mt-2 text-sm text-gray-600">Our support team will reach out to you shortly.</p>
              <div className="mt-4">
                <Link href="/dashboard" className="px-4 py-2 bg-blue-600 text-white rounded-md">
                  Back to Dashboard
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 text-sm text-gray-500">
          Prefer email? Reach us at <a className="text-blue-600">support@example.com</a>
        </div>
      </div>
    </div>
  );
}
