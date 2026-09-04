"use client";

import { useRouter } from "next/navigation";
import { useAppState } from "../state/AppState";
import { useViewportWidth } from "../hooks/useViewportWidth";
import { AvatarPlaceholder, LogoMark } from "./Placeholder";

export function Header() {
  const router = useRouter();
  const { dark, toggleDark, loggedIn, user, logout } = useAppState();
  const width = useViewportWidth();
  const showSearch = width >= 1150;
  const hideSearch = width < 1150;
  const showNav = width >= 1040;

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        display: "flex",
        alignItems: "center",
        gap: 20,
        height: 72,
        padding: "0 32px",
        background: "var(--bg, #F7F3EF)",
        borderBottom: "1px solid var(--hair, rgba(44,62,80,0.09))",
        overflow: "hidden",
      }}
    >
      <div
        onClick={() => router.push("/")}
        style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", flex: "none" }}
      >
        <LogoMark />
        <span
          style={{
            fontFamily: "var(--font-lora), Georgia, serif",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "-0.01em",
            whiteSpace: "nowrap",
          }}
        >
          Recipe Hub
        </span>
      </div>

      {showNav && (
        <nav
          style={{
            display: "flex",
            gap: 26,
            fontSize: 14,
            fontWeight: 500,
            color: "var(--text2, #5A6B7B)",
            whiteSpace: "nowrap",
            flex: "none",
          }}
        >
          <span onClick={() => router.push("/")} style={{ cursor: "pointer" }}>
            Trang chủ
          </span>
          <span onClick={() => router.push("/recipes")} style={{ cursor: "pointer" }}>
            Công thức
          </span>
          <span onClick={() => router.push("/recipes")} style={{ cursor: "pointer" }}>
            Vùng miền
          </span>
          <span onClick={() => router.push("/recipes")} style={{ cursor: "pointer" }}>
            Bộ sưu tập
          </span>
        </nav>
      )}

      <div style={{ flex: 1 }} />

      {showSearch && (
        <div
          onClick={() => router.push("/recipes")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "var(--surface, #fff)",
            border: "1px solid var(--border, #ECF0F1)",
            borderRadius: 8,
            padding: "9px 14px",
            flex: "none",
            width: 240,
            boxSizing: "border-box",
            whiteSpace: "nowrap",
            cursor: "pointer",
          }}
        >
          <span
            style={{
              width: 12,
              height: 12,
              flex: "none",
              border: "1.5px solid var(--text2, #5A6B7B)",
              borderRadius: 9999,
              display: "inline-block",
            }}
          />
          <span style={{ fontSize: 14, color: "var(--text3, #95A5A6)" }}>Tìm món, nguyên liệu…</span>
        </div>
      )}
      {hideSearch && (
        <button
          onClick={() => router.push("/recipes")}
          title="Tìm công thức"
          style={{
            flex: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 38,
            height: 38,
            background: "var(--surface, #fff)",
            border: "1px solid var(--border, #ECF0F1)",
            borderRadius: 9999,
            cursor: "pointer",
          }}
        >
          <span
            style={{
              width: 13,
              height: 13,
              border: "1.5px solid var(--text2, #5A6B7B)",
              borderRadius: 9999,
              display: "inline-block",
            }}
          />
        </button>
      )}

      <button
        onClick={toggleDark}
        title="Đổi giao diện sáng/tối"
        style={{
          flex: "none",
          fontFamily: "inherit",
          fontSize: 15,
          lineHeight: 1,
          background: "var(--surface, #fff)",
          border: "1px solid var(--border, #ECF0F1)",
          borderRadius: 9999,
          width: 38,
          height: 38,
          cursor: "pointer",
          color: "var(--text2, #5A6B7B)",
        }}
      >
        {dark ? "☀" : "☾"}
      </button>

      {loggedIn ? (
        <div style={{ display: "flex", alignItems: "center", gap: 12, flex: "none" }}>
          <div
            onClick={() => router.push("/profile")}
            style={{ display: "flex", alignItems: "center", gap: 9, cursor: "pointer" }}
          >
            <AvatarPlaceholder size={34} />
            <span style={{ fontSize: 14, fontWeight: 600 }}>{user?.name ?? "Ngọc An"}</span>
          </div>
          <button
            onClick={() => {
              logout();
              router.push("/");
            }}
            style={{
              fontFamily: "inherit",
              fontSize: 13,
              fontWeight: 500,
              color: "var(--text2, #5A6B7B)",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Đăng xuất
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: 16, flex: "none" }}>
          <span
            onClick={() => router.push("/login")}
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "var(--text2, #5A6B7B)",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            Đăng nhập
          </span>
          <button
            onClick={() => router.push("/login")}
            style={{
              fontFamily: "inherit",
              fontSize: 14,
              fontWeight: 600,
              color: "#fff",
              background: "var(--accent, #FF6B35)",
              border: "none",
              borderRadius: 8,
              padding: "11px 20px",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            Chia sẻ công thức
          </button>
        </div>
      )}
    </header>
  );
}
