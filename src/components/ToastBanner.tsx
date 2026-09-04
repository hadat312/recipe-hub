"use client";

import { useAppState } from "../state/AppState";

export function ToastBanner() {
  const { toast } = useAppState();
  if (!toast) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 32,
        left: "50%",
        zIndex: 90,
        display: "flex",
        alignItems: "center",
        gap: 12,
        background: "#2C3E50",
        color: "#fff",
        borderRadius: 10,
        padding: "14px 20px",
        boxShadow: "0 10px 15px rgba(0,0,0,0.25)",
        animation: "rh-toast 220ms ease both",
      }}
    >
      <span style={{ color: "#2ECC71", fontWeight: 700 }}>✓</span>
      <span style={{ fontSize: 14, fontWeight: 500 }}>{toast}</span>
    </div>
  );
}
