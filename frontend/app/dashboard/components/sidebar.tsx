"use client";
import React from "react";

type Props = {
  show?: boolean;
  onClose?: () => void;
  active?: string;
  onNavigate?: (key: string) => void;
};

const items = [
  { key: "dashboard", label: "Dashboard", icon: "M3 12h18" },
  { key: "profile", label: "My Profile", icon: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" },
  { key: "willingness", label: "Willingness Card", icon: "M12 2l3 7h7l-5.5 4 2 7L12 17l-6.5 3 2-7L2 9h7l3-7z" },
  { key: "logout", label: "Logout", icon: "M16 17l5-5m0 0l-5-5m5 5H9" },
];

export default function Sidebar({ show = false, onClose, active, onNavigate }: Props) {
  return (
    <>
      {/* overlay for small screens */}
      <div
        className={`fixed inset-0 bg-black/30 z-30 transition-opacity ${show ? "opacity-100" : "opacity-0 pointer-events-none"} lg:hidden `}
        onClick={onClose}
      />

      <aside
        className={`fixed z-40 left-0 top-0 h-full w-72 bg-white  border-r shadow-md transform transition-transform ${
          show ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:shadow-none`}
      >
        <div className="h-full flex flex-col p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold">
              H
            </div>
            <div>
              <div className="text-lg font-semibold text-black">HealthApp</div>
              <div className="text-xs text-gray-500">Your wellness hub</div>
            </div>
          </div>

          <nav className="flex-1">
            <ul className="space-y-1">
              {items.map((it) => {
                const isActive = active === it.key;
                return (
                  <li key={it.key}>
                    <button
                      onClick={() => onNavigate?.(it.key)}
                      className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-md ${
                        isActive ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {/* small svg placeholder */}
                      <span className="w-6 h-6 flex items-center justify-center text-sm">{/* icon */}</span>
                      <span className="text-sm font-medium">{it.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-6">
            <button className="w-full px-3 py-2 text-sm bg-red-50 text-red-700 rounded-md border">Contact Support</button>
          </div>
        </div>
      </aside>
    </>
  );
}
