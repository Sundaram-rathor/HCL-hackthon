"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  show?: boolean;
  onClose?: () => void;
  active?: string;
  onNavigate?: (key: string) => void;
};

const items = [
  { key: "dashboard", label: "Dashboard", href: "/dashboard" },
  { key: "profile", label: "My Profile", href: "/dashboard/profile" },
  { key: "willingness", label: "Willingness Card", href: "/dashboard/willingness" },
  { key: "provider", label: "Provider View", href: "/provider" },
];

export default function Sidebar({ show = false, onClose, active, onNavigate }: Props) {
  const router = useRouter();

  function handleLogout() {
    // clear auth and redirect to login
    try {
      localStorage.removeItem("auth");
      // keep audit log but mark logout
      const log = JSON.parse(localStorage.getItem("auditLog") || "[]");
      log.push({ ts: Date.now(), event: "logout" });
      localStorage.setItem("auditLog", JSON.stringify(log));
    } catch (e) {}
    router.push("/auth/login");
    onClose?.();
  }

  return (
    <>
      {/* overlay for small screens */}
      <div
        className={`fixed inset-0 bg-black/30 z-30 transition-opacity ${show ? "opacity-100" : "opacity-0 pointer-events-none"} lg:hidden`}
        onClick={onClose}
      />

      <aside
        className={`fixed z-40 left-0 top-0 h-full w-72 bg-white border-r shadow-md transform transition-transform ${
          show ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:shadow-none`}
      >
        <div className="h-full flex flex-col p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold">
              H
            </div>
            <div>
              <div className="text-lg font-semibold">HealthApp</div>
              <div className="text-xs text-gray-500">Your wellness hub</div>
            </div>
          </div>

          <nav className="flex-1">
            <ul className="space-y-1">
              {items.map((it) => {
                const isActive = active === it.key;
                const baseCls = `w-full text-left flex items-center gap-3 px-3 py-2 rounded-md ${
                  isActive ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"
                }`;

                // prefer Link-based navigation
                return (
                  <li key={it.key}>
                    <Link href={it.href} className={baseCls} onClick={onClose}>
                      <span className="w-6 h-6 flex items-center justify-center text-sm">{/* icon */}</span>
                      <span className="text-sm font-medium">{it.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-6 space-y-3">
            <Link
              href="/public-health"
              onClick={onClose}
              className="w-full block px-3 py-2 text-sm bg-yellow-50 text-yellow-700 rounded-md border text-center"
            >
              Public Health Info
            </Link>

            <button
              onClick={handleLogout}
              className="w-full px-3 py-2 text-sm bg-red-50 text-red-700 rounded-md border"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
