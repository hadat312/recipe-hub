"use client";

import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { ToastBanner } from "@/components/ToastBanner";
import { useAppState } from "@/state/AppState";

export function Shell({ children }: { children: ReactNode }) {
  const { dark } = useAppState();

  return (
    <div
      data-theme={dark ? "dark" : "light"}
      style={{
        fontFamily: "var(--font-inter), system-ui, sans-serif",
        background: "var(--bg, #F7F3EF)",
        color: "var(--text, #2C3E50)",
        minHeight: "100vh",
      }}
    >
      <Header />
      {children}
      <ToastBanner />
    </div>
  );
}
