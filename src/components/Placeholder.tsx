import type { CSSProperties, ReactNode } from "react";

interface PhotoPlaceholderProps {
  aspect?: string;
  radius?: number | string;
  label?: string;
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
}

export function PhotoPlaceholder({
  aspect = "4/3",
  radius = 0,
  label,
  style,
  className,
  children,
}: PhotoPlaceholderProps) {
  return (
    <div
      className={className}
      style={{
        position: "relative",
        aspectRatio: aspect,
        borderRadius: radius,
        overflow: "hidden",
        background:
          "repeating-linear-gradient(135deg, var(--ph1, #EDE6DE) 0 12px, var(--ph2, #E4DBD1) 12px 24px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      {label && (
        <span
          style={{
            fontFamily: "ui-monospace, Menlo, monospace",
            fontSize: 12,
            color: "var(--brown, #8B7355)",
          }}
        >
          {label}
        </span>
      )}
      {children}
    </div>
  );
}

interface AvatarPlaceholderProps {
  size?: number;
  style?: CSSProperties;
}

export function AvatarPlaceholder({ size = 34, style }: AvatarPlaceholderProps) {
  return (
    <div
      style={{
        width: size,
        height: size,
        flex: "none",
        borderRadius: 9999,
        background:
          "repeating-linear-gradient(135deg, var(--ph1, #EDE6DE) 0 5px, var(--ph2, #E4DBD1) 5px 10px)",
        ...style,
      }}
    />
  );
}

export function LogoMark({ size = "default" }: { size?: "default" | "small" }) {
  const w = size === "small" ? 28 : 30;
  const h = size === "small" ? 16 : 17;
  return (
    <span
      style={{
        width: w,
        height: h,
        flex: "none",
        position: "relative",
        display: "inline-block",
      }}
    >
      <span
        style={{
          position: "absolute",
          inset: 0,
          border: "2px solid var(--accent, #FF6B35)",
          borderRadius: "2px 2px 999px 999px",
          boxSizing: "border-box",
        }}
      />
      <span
        style={{
          position: "absolute",
          left: 4,
          right: 4,
          top: size === "small" ? 5 : 6,
          height: 2,
          background: "var(--accent, #FF6B35)",
          borderRadius: 999,
          opacity: 0.55,
        }}
      />
    </span>
  );
}
