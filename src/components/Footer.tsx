export function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--hair, rgba(44,62,80,0.09))",
        padding: "40px 48px",
        display: "flex",
        alignItems: "center",
        gap: 28,
        maxWidth: 1400,
        margin: "0 auto",
        fontSize: 13,
        color: "var(--text2, #5A6B7B)",
      }}
    >
      <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 22, height: 12, flex: "none", position: "relative", display: "inline-block" }}>
          <span
            style={{
              position: "absolute",
              inset: 0,
              border: "1.5px solid var(--accent, #FF6B35)",
              borderRadius: "2px 2px 999px 999px",
              boxSizing: "border-box",
            }}
          />
          <span
            style={{
              position: "absolute",
              left: 3,
              right: 3,
              top: 4,
              height: 1.5,
              background: "var(--accent, #FF6B35)",
              borderRadius: 999,
              opacity: 0.55,
            }}
          />
        </span>
        <span style={{ fontFamily: "var(--font-lora), Georgia, serif", fontSize: 16, fontWeight: 700, color: "var(--text, #2C3E50)" }}>
          Recipe Hub
        </span>
      </span>
      <span>Giới thiệu</span>
      <span>Liên hệ</span>
      <span>Quyền riêng tư</span>
      <div style={{ flex: 1 }} />
      <span>VI · EN · JA</span>
      <span>© 2026</span>
    </footer>
  );
}
