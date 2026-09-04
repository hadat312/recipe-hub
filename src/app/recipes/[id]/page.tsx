"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AvatarPlaceholder } from "@/components/Placeholder";
import { useAppState } from "@/state/AppState";
import { COMMENTS, findRecipe } from "@/data/recipes";
import {
  formatQty,
  formatRating,
  levelColor,
  prepCookSplit,
  stepTimerLabel,
} from "@/utils/format";
import type { Comment, Recipe } from "@/data/types";

const SCALES = [0.5, 1, 2] as const;

interface IngredientRow {
  idx: number;
  qty: string;
  name: string;
  on: boolean;
}

interface LayoutProps {
  recipe: Recipe;
  prep: string;
  cook: string;
  isFav: boolean;
  onToggleFav: () => void;
  servings: number;
  scale: number;
  setScale: (v: number) => void;
  ingredientRows: IngredientRow[];
  onToggleIngredient: (idx: number) => void;
}

export default function DetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const recipe = findRecipe(params.id);

  return (
    <main style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 48px 80px" }}>
      <div
        onClick={() => router.push("/recipes")}
        style={{ fontSize: 14, fontWeight: 500, color: "var(--text2, #5A6B7B)", cursor: "pointer", marginBottom: 20 }}
      >
        ← Về danh sách
      </div>

      {/* Keyed by recipe.id so the ingredient checklist and portion scale reset
          automatically on a fresh mount when navigating between recipes —
          no effect needed to manually reset that state. */}
      <RecipeDetailBody key={recipe.id} recipe={recipe} />
    </main>
  );
}

function RecipeDetailBody({ recipe }: { recipe: Recipe }) {
  const { favorites, toggleFavorite } = useAppState();
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [scale, setScale] = useState<number>(1);

  const { prep, cook } = prepCookSplit(recipe);
  const isFav = !!favorites[recipe.id];
  const servings = Math.round(4 * scale);

  const toggleIngredient = (idx: number) =>
    setChecked((prev) => {
      const next = { ...prev };
      if (next[idx]) delete next[idx];
      else next[idx] = true;
      return next;
    });

  const ingredientRows: IngredientRow[] = recipe.ing.map((ing, idx) => ({
    idx,
    qty: `${formatQty(ing.q * scale, ing.u)} ${ing.u}`,
    name: ing.name,
    on: !!checked[idx],
  }));

  const layoutProps: LayoutProps = {
    recipe,
    prep,
    cook,
    isFav,
    onToggleFav: () => toggleFavorite(recipe.id),
    servings,
    scale,
    setScale,
    ingredientRows,
    onToggleIngredient: toggleIngredient,
  };

  return <RecipeDetailView {...layoutProps} />;
}

function FavoriteButton({ isFav, onToggle }: { isFav: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      style={{
        position: "absolute",
        top: 16,
        right: 16,
        fontFamily: "inherit",
        fontSize: 14,
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: "var(--surface, #fff)",
        border: "none",
        borderRadius: 9999,
        padding: "11px 18px",
        cursor: "pointer",
        boxShadow: "var(--sh-md)",
        color: "var(--text, #2C3E50)",
      }}
    >
      {isFav ? "♥" : "♡"} {isFav ? "Đã lưu" : "Lưu công thức"}
    </button>
  );
}

function ScaleSwitcher({ scale, setScale }: { scale: number; setScale: (v: number) => void }) {
  return (
    <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--border, #ECF0F1)", borderRadius: 8, overflow: "hidden" }}>
      {SCALES.map((v) => (
        <button
          key={v}
          onClick={() => setScale(v)}
          style={{
            fontFamily: "inherit",
            fontSize: 12,
            fontWeight: 600,
            border: "none",
            padding: "6px 11px",
            cursor: "pointer",
            background: scale === v ? "var(--accent, #FF6B35)" : "transparent",
            color: scale === v ? "#fff" : "var(--text2, #5A6B7B)",
          }}
        >
          {v === 0.5 ? "½×" : `${v}×`}
        </button>
      ))}
    </div>
  );
}

function IngredientRowView({ row, onToggle }: { row: IngredientRow; onToggle: (idx: number) => void }) {
  return (
    <div
      onClick={() => onToggle(row.idx)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 11,
        cursor: "pointer",
        fontSize: 15,
        color: row.on ? "var(--text2, #5A6B7B)" : "var(--text, #2C3E50)",
        textDecoration: row.on ? "line-through" : "none",
      }}
    >
      <span
        style={{
          width: 18,
          height: 18,
          flex: "none",
          borderRadius: 4,
          border: `1.5px solid ${row.on ? "var(--accent, #FF6B35)" : "var(--border, #ECF0F1)"}`,
          background: row.on ? "var(--accent, #FF6B35)" : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: 11,
          fontWeight: 700,
        }}
      >
        {row.on ? "✓" : ""}
      </span>
      <span>
        <strong style={{ fontWeight: 600 }}>{row.qty}</strong> {row.name}
      </span>
    </div>
  );
}

function CommentRow({ comment }: { comment: Comment }) {
  return (
    <div style={{ display: "flex", gap: 14 }}>
      <AvatarPlaceholder size={38} />
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 14, fontWeight: 600 }}>{comment.name}</span>
          <span style={{ fontSize: 12, color: "var(--accent, #FF6B35)" }}>{comment.stars}</span>
          <span style={{ fontSize: 12, color: "var(--text2, #5A6B7B)" }}>{comment.when}</span>
        </div>
        <p style={{ fontSize: 15, lineHeight: 1.65, margin: "6px 0 0", color: "var(--text2, #5A6B7B)" }}>{comment.text}</p>
      </div>
    </div>
  );
}

function FactGrid({ recipe, prep, cook, servings }: { recipe: Recipe; prep: string; cook: string; servings: number }) {
  const facts = [
    { k: "Sơ chế", v: prep },
    { k: "Nấu", v: cook },
    { k: "Khẩu phần", v: `${servings} người` },
    { k: "Độ khó", v: recipe.level },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, paddingBottom: 20, borderBottom: "1px solid var(--border, #ECF0F1)" }}>
      {facts.map((f) => (
        <div key={f.k}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text2, #5A6B7B)" }}>{f.k}</div>
          <div style={{ fontFamily: "var(--font-lora), Georgia, serif", fontSize: 20, fontWeight: 600, marginTop: 3 }}>{f.v}</div>
        </div>
      ))}
    </div>
  );
}

function RecipeDetailView({
  recipe,
  prep,
  cook,
  isFav,
  onToggleFav,
  servings,
  scale,
  setScale,
  ingredientRows,
  onToggleIngredient,
}: LayoutProps) {
  return (
    <>
      <div
        style={{
          position: "relative",
          aspectRatio: "21/9",
          borderRadius: 16,
          overflow: "hidden",
          background: "repeating-linear-gradient(135deg, var(--ph1, #EDE6DE) 0 12px, var(--ph2, #E4DBD1) 12px 24px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 32,
        }}
      >
        <span style={{ fontFamily: "ui-monospace, Menlo, monospace", fontSize: 12, color: "var(--brown, #8B7355)" }}>
          recipe hero — 1600×686
        </span>
        <FavoriteButton isFav={isFav} onToggle={onToggleFav} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 48, alignItems: "start" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: "#fff", background: levelColor(recipe), borderRadius: 9999, padding: "5px 12px" }}>
              {recipe.level}
            </span>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--brown, #8B7355)" }}>
              {recipe.region}
            </span>
          </div>
          <h1 style={{ fontFamily: "var(--font-lora), Georgia, serif", fontSize: 44, lineHeight: 1.12, fontWeight: 600, letterSpacing: "-0.02em", margin: "0 0 16px" }}>
            {recipe.title}
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.65, color: "var(--text2, #5A6B7B)", margin: "0 0 24px", maxWidth: 620 }}>{recipe.blurb}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 14, paddingBottom: 28, borderBottom: "1px solid var(--hair, rgba(44,62,80,0.09))" }}>
            <AvatarPlaceholder size={40} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{recipe.author}</div>
              <div style={{ fontSize: 12, color: "var(--text2, #5A6B7B)" }}>
                ★ {formatRating(recipe.rating)} · {recipe.comments} bình luận
              </div>
            </div>
          </div>

          <h2 style={{ fontFamily: "var(--font-lora), Georgia, serif", fontSize: 26, fontWeight: 600, margin: "36px 0 20px" }}>Cách làm</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {recipe.steps.map((s) => (
              <div key={s.n} style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 20, alignItems: "start" }}>
                <div
                  style={{
                    aspectRatio: "4/3",
                    borderRadius: 8,
                    background: "repeating-linear-gradient(135deg, var(--ph1, #EDE6DE) 0 8px, var(--ph2, #E4DBD1) 8px 16px)",
                  }}
                />
                <div>
                  <div style={{ fontFamily: "var(--font-lora), Georgia, serif", fontSize: 15, fontWeight: 600, color: "var(--accent, #FF6B35)", marginBottom: 6 }}>
                    Bước {s.n}
                    {stepTimerLabel(s.timer)}
                  </div>
                  <p style={{ fontSize: 16, lineHeight: 1.75, margin: 0, color: "var(--text, #2C3E50)" }}>{s.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: "var(--sunken, #F1EBE4)", borderRadius: 12, padding: 24, marginTop: 36 }}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--brown, #8B7355)", marginBottom: 10 }}>
              Ghi chú của người nấu
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0, color: "var(--text2, #5A6B7B)" }}>
              Xương nên chần nước sôi 3 phút rồi rửa sạch trước khi hầm — nước dùng trong hơn hẳn. Nếu không có sả tươi,
              dùng 1 thìa sả băm đông lạnh, nhưng cho vào muộn hơn 10 phút.
            </p>
          </div>

          <h2 style={{ fontFamily: "var(--font-lora), Georgia, serif", fontSize: 26, fontWeight: 600, margin: "44px 0 20px" }}>
            Bình luận ({recipe.comments})
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {COMMENTS.map((c) => (
              <CommentRow key={c.name} comment={c} />
            ))}
          </div>
        </div>

        <aside style={{ position: "sticky", top: 96, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ background: "var(--surface, #fff)", border: "1px solid var(--border, #ECF0F1)", borderRadius: 12, padding: 22 }}>
            <FactGrid recipe={recipe} prep={prep} cook={cook} servings={servings} />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "20px 0 14px" }}>
              <span style={{ fontFamily: "var(--font-lora), Georgia, serif", fontSize: 20, fontWeight: 600 }}>Nguyên liệu</span>
              <ScaleSwitcher scale={scale} setScale={setScale} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {ingredientRows.map((row) => (
                <IngredientRowView key={row.idx} row={row} onToggle={onToggleIngredient} />
              ))}
            </div>
          </div>
          <button
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
            }}
          >
            Bắt đầu nấu
          </button>
        </aside>
      </div>
    </>
  );
}
