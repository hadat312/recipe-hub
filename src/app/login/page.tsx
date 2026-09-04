"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { LogoMark } from "@/components/Placeholder";
import { useAppState } from "@/state/AppState";

export default function LoginPage() {
  const router = useRouter();
  const { login, showToast } = useAppState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState(false);
  const [authError, setAuthError] = useState("");
  const [busy, setBusy] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const emailError = touched && !email.trim() ? "Vui lòng nhập email." : "";
  const passError = touched && !password.trim() ? "Vui lòng nhập mật khẩu." : "";

  const submit = () => {
    setTouched(true);
    if (!email.trim() || !password.trim()) {
      setAuthError("");
      return;
    }
    setBusy(true);
    setAuthError("");
    timer.current = window.setTimeout(() => {
      if (email.trim().toLowerCase() === "an@bepnha.vn" && password === "1234") {
        login();
        setBusy(false);
        showToast("Chào mừng trở lại, Ngọc An");
        router.push("/profile");
      } else {
        setBusy(false);
        setAuthError("Email hoặc mật khẩu không đúng. Thử an@bepnha.vn / 1234.");
      }
    }, 700);
  };

  return (
    <main style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "72px 24px 96px" }}>
      <div
        style={{
          width: 420,
          background: "var(--surface, #fff)",
          border: "1px solid var(--border, #ECF0F1)",
          borderRadius: 16,
          padding: 40,
          boxShadow: "var(--sh-lg)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
          <LogoMark size="small" />
          <span style={{ fontFamily: "var(--font-lora), Georgia, serif", fontSize: 20, fontWeight: 700 }}>Recipe Hub</span>
        </div>
        <h1 style={{ fontFamily: "var(--font-lora), Georgia, serif", fontSize: 32, fontWeight: 600, letterSpacing: "-0.02em", margin: "0 0 8px" }}>
          Chào bạn trở lại
        </h1>
        <p style={{ fontSize: 15, color: "var(--text2, #5A6B7B)", margin: "0 0 28px" }}>
          Đăng nhập để lưu công thức và chia sẻ món của bạn.
        </p>
        {authError && (
          <div
            style={{
              display: "flex",
              gap: 10,
              background: "rgba(231,76,60,0.08)",
              border: "1px solid rgba(231,76,60,0.25)",
              borderRadius: 8,
              padding: "12px 14px",
              marginBottom: 20,
            }}
          >
            <span style={{ color: "#E74C3C", fontWeight: 700, fontSize: 14 }}>!</span>
            <span style={{ fontSize: 14, lineHeight: 1.5, color: "#C0392B" }}>{authError}</span>
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text2, #5A6B7B)", marginBottom: 7 }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setAuthError("");
              }}
              placeholder="an@bepnha.vn"
              style={{
                fontFamily: "inherit",
                fontSize: 16,
                width: "100%",
                boxSizing: "border-box",
                padding: "12px 14px",
                border: `1px solid ${emailError ? "#E74C3C" : "var(--border, #ECF0F1)"}`,
                borderRadius: 8,
                background: "var(--surface, #fff)",
                color: "var(--text, #2C3E50)",
              }}
            />
            {emailError && <div style={{ fontSize: 13, color: "#E74C3C", marginTop: 6 }}>{emailError}</div>}
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 7 }}>
              <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text2, #5A6B7B)" }}>Mật khẩu</label>
              <span style={{ fontSize: 13, color: "#3498DB", cursor: "pointer" }}>Quên mật khẩu?</span>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setAuthError("");
              }}
              placeholder="1234"
              style={{
                fontFamily: "inherit",
                fontSize: 16,
                width: "100%",
                boxSizing: "border-box",
                padding: "12px 14px",
                border: `1px solid ${passError ? "#E74C3C" : "var(--border, #ECF0F1)"}`,
                borderRadius: 8,
                background: "var(--surface, #fff)",
                color: "var(--text, #2C3E50)",
              }}
            />
            {passError && <div style={{ fontSize: 13, color: "#E74C3C", marginTop: 6 }}>{passError}</div>}
          </div>
          <button
            onClick={submit}
            disabled={busy}
            style={{
              fontFamily: "inherit",
              fontSize: 15,
              fontWeight: 600,
              color: "#fff",
              background: "var(--accent, #FF6B35)",
              border: "none",
              borderRadius: 8,
              padding: 14,
              cursor: "pointer",
              opacity: busy ? 0.6 : 1,
            }}
          >
            {busy ? "Đang đăng nhập…" : "Đăng nhập"}
          </button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "26px 0 20px" }}>
          <div style={{ flex: 1, height: 1, background: "var(--border, #ECF0F1)" }} />
          <span style={{ fontSize: 12, color: "var(--text2, #5A6B7B)" }}>hoặc</span>
          <div style={{ flex: 1, height: 1, background: "var(--border, #ECF0F1)" }} />
        </div>
        <div style={{ textAlign: "center", fontSize: 14, color: "var(--text2, #5A6B7B)" }}>
          Chưa có tài khoản?{" "}
          <span onClick={() => router.push("/register")} style={{ color: "var(--accent, #FF6B35)", fontWeight: 600, cursor: "pointer" }}>
            Tạo tài khoản
          </span>
        </div>
        <div
          style={{
            marginTop: 24,
            padding: "12px 14px",
            background: "var(--sunken, #F1EBE4)",
            borderRadius: 8,
            fontSize: 12,
            lineHeight: 1.6,
            color: "var(--text2, #5A6B7B)",
          }}
        >
          Demo: <strong>an@bepnha.vn</strong> / <strong>1234</strong>. Mật khẩu khác sẽ hiện lỗi.
        </div>
      </div>
    </main>
  );
}
