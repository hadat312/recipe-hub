"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogoMark } from "@/components/Placeholder";
import { useAppState } from "@/state/AppState";

export default function RegisterPage() {
  const router = useRouter();
  const { registerUser, showToast } = useAppState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [terms, setTerms] = useState(false);
  const [touched, setTouched] = useState(false);

  const nameError = touched && !name.trim() ? "Nhập họ tên của bạn." : "";
  const emailError = touched && !email.includes("@") ? "Email chưa hợp lệ." : "";
  const passError = touched && pass.length < 4 ? "Mật khẩu cần ít nhất 4 ký tự." : "";
  const termsError = touched && !terms ? "Cần đồng ý điều khoản để tiếp tục." : "";

  const submit = () => {
    setTouched(true);
    if (!name.trim() || !email.includes("@") || pass.length < 4 || !terms) return;
    registerUser(name);
    showToast("Tài khoản đã được tạo");
    router.push("/profile");
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
          Tham gia Recipe Hub
        </h1>
        <p style={{ fontSize: 15, color: "var(--text2, #5A6B7B)", margin: "0 0 28px" }}>
          Miễn phí. Bắt đầu bằng công thức đầu tiên của bạn.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text2, #5A6B7B)", marginBottom: 7 }}>
              Họ và tên
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nguyễn Ngọc An"
              style={{
                fontFamily: "inherit",
                fontSize: 16,
                width: "100%",
                boxSizing: "border-box",
                padding: "12px 14px",
                border: `1px solid ${nameError ? "#E74C3C" : "var(--border, #ECF0F1)"}`,
                borderRadius: 8,
                background: "var(--surface, #fff)",
                color: "var(--text, #2C3E50)",
              }}
            />
            {nameError && <div style={{ fontSize: 13, color: "#E74C3C", marginTop: 6 }}>{nameError}</div>}
          </div>
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text2, #5A6B7B)", marginBottom: 7 }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ban@email.com"
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
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "var(--text2, #5A6B7B)", marginBottom: 7 }}>
              Mật khẩu
            </label>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Ít nhất 4 ký tự"
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
          <div onClick={() => setTerms((t) => !t)} style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", marginTop: 4 }}>
            <span
              style={{
                width: 18,
                height: 18,
                flex: "none",
                borderRadius: 4,
                border: `1.5px solid ${terms ? "var(--accent, #FF6B35)" : "var(--border, #ECF0F1)"}`,
                background: terms ? "var(--accent, #FF6B35)" : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              {terms ? "✓" : ""}
            </span>
            <span style={{ fontSize: 13, lineHeight: 1.5, color: "var(--text2, #5A6B7B)" }}>
              Tôi đồng ý với Điều khoản sử dụng và Chính sách quyền riêng tư.
            </span>
          </div>
          {termsError && <div style={{ fontSize: 13, color: "#E74C3C" }}>{termsError}</div>}
          <button
            onClick={submit}
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
              marginTop: 4,
            }}
          >
            Tạo tài khoản
          </button>
        </div>
        <div style={{ textAlign: "center", fontSize: 14, color: "var(--text2, #5A6B7B)", marginTop: 22 }}>
          Đã có tài khoản?{" "}
          <span onClick={() => router.push("/login")} style={{ color: "var(--accent, #FF6B35)", fontWeight: 600, cursor: "pointer" }}>
            Đăng nhập
          </span>
        </div>
      </div>
    </main>
  );
}
