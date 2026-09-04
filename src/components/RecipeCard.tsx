"use client";

import type { MouseEvent } from "react";
import type { Recipe } from "../data/types";
import { formatMeta, levelColor } from "../utils/format";

interface HeartControl {
  on: boolean;
  onToggle: (e: MouseEvent) => void;
}

interface RecipeCardProps {
  recipe: Recipe;
  onOpen: () => void;
  /** Show the coloured difficulty-level pill. The homepage's trending row omits it. */
  showBadge?: boolean;
  /** Favourite heart toggle, shown top-right over the image. */
  heart?: HeartControl;
  /** "Sửa / Xoá" links shown next to the meta line (profile only). */
  ownerActions?: boolean;
}

export function RecipeCard({
  recipe,
  onOpen,
  showBadge = true,
  heart,
  ownerActions = false,
}: RecipeCardProps) {
  const meta = formatMeta(recipe);
  const color = levelColor(recipe);

  return (
    <div onClick={onOpen} style={{ cursor: "pointer" }} className="rh-fade-in">
      <div
        className="rh-lift"
        style={{
          background: "var(--surface, #fff)",
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "var(--sh-sm)",
        }}
      >
        <div
          style={{
            position: "relative",
            aspectRatio: "4/3",
            background:
              "repeating-linear-gradient(135deg, var(--ph1, #EDE6DE) 0 10px, var(--ph2, #E4DBD1) 10px 20px)",
          }}
        >
          {showBadge && (
            <span
              style={{
                position: "absolute",
                top: 12,
                left: 12,
                fontSize: 11,
                fontWeight: 600,
                color: "#fff",
                background: color,
                borderRadius: 9999,
                padding: "5px 11px",
              }}
            >
              {recipe.level}
            </span>
          )}
          {heart && (
            <span
              onClick={heart.onToggle}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                width: 32,
                height: 32,
                borderRadius: 9999,
                background: "var(--surface, #fff)",
                boxShadow: "var(--sh-sm)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                color: heart.on ? "var(--accent, #FF6B35)" : "var(--text2, #5A6B7B)",
              }}
            >
              {heart.on ? "♥" : "♡"}
            </span>
          )}
        </div>
        <div style={{ padding: 16 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--brown, #8B7355)",
            }}
          >
            {recipe.region}
          </div>
          <div
            style={{
              fontFamily: "var(--font-lora), Georgia, serif",
              fontSize: 18,
              fontWeight: 600,
              margin: "6px 0 8px",
              lineHeight: 1.3,
            }}
          >
            {recipe.title}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 13, color: "var(--text2, #5A6B7B)" }}>{meta}</span>
            {ownerActions && (
              <span style={{ display: "flex", gap: 10, fontSize: 12, fontWeight: 600 }}>
                <span style={{ color: "#3498DB" }}>Sửa</span>
                <span style={{ color: "#E74C3C" }}>Xoá</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
