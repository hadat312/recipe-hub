"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { RecipeCard } from "@/components/RecipeCard";
import { useAppState } from "@/state/AppState";
import { LEVELS, REGIONS, RECIPES } from "@/data/recipes";
import type { Level } from "@/data/types";

type SortKey = "rating" | "newest" | "time";

export default function ListingPage() {
  const router = useRouter();
  const { favorites, toggleFavorite } = useAppState();
  const [levelSel, setLevelSel] = useState<Level[]>([]);
  const [regionSel, setRegionSel] = useState<string[]>([]);
  const [maxTime, setMaxTime] = useState(180);
  const [sort, setSort] = useState<SortKey>("rating");

  const filtered = useMemo(() => {
    let list = RECIPES.filter(
      (r) =>
        (levelSel.length === 0 || levelSel.includes(r.lv)) &&
        (regionSel.length === 0 || regionSel.includes(r.region)) &&
        r.time <= maxTime,
    );
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === "time") list = [...list].sort((a, b) => a.time - b.time);
    return list;
  }, [levelSel, regionSel, maxTime, sort]);

  const toggleLevel = (lv: Level) =>
    setLevelSel((prev) => (prev.includes(lv) ? prev.filter((v) => v !== lv) : [...prev, lv]));
  const toggleRegion = (name: string) =>
    setRegionSel((prev) => (prev.includes(name) ? prev.filter((v) => v !== name) : [...prev, name]));
  const resetFilters = () => {
    setLevelSel([]);
    setRegionSel([]);
    setMaxTime(180);
  };

  return (
    <main style={{ maxWidth: 1400, margin: "0 auto", padding: "40px 48px 80px" }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "var(--font-lora), Georgia, serif", fontSize: 36, fontWeight: 600, letterSpacing: "-0.02em", margin: "0 0 8px" }}>
          Tất cả công thức
        </h1>
        <p style={{ fontSize: 15, color: "var(--text2, #5A6B7B)", margin: 0 }}>{filtered.length} món phù hợp với bộ lọc của bạn</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 40, alignItems: "start" }}>
        <aside
          style={{
            background: "var(--surface, #fff)",
            border: "1px solid var(--border, #ECF0F1)",
            borderRadius: 12,
            padding: 22,
            position: "sticky",
            top: 96,
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text2, #5A6B7B)", marginBottom: 14 }}>
            Độ khó
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            {LEVELS.map((l) => {
              const on = levelSel.includes(l.lv);
              const count = RECIPES.filter((r) => r.lv === l.lv).length;
              return (
                <div
                  key={l.lv}
                  onClick={() => toggleLevel(l.lv)}
                  style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontSize: 14 }}
                >
                  <span
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 4,
                      border: `1.5px solid ${on ? "var(--accent, #FF6B35)" : "var(--border, #ECF0F1)"}`,
                      background: on ? "var(--accent, #FF6B35)" : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    {on ? "✓" : ""}
                  </span>
                  <span>
                    {l.vi} · {l.en}
                  </span>
                  <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--text2, #5A6B7B)" }}>{count}</span>
                </div>
              );
            })}
          </div>
          <div style={{ height: 1, background: "var(--border, #ECF0F1)", margin: "22px 0" }} />
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text2, #5A6B7B)", marginBottom: 14 }}>
            Vùng miền
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {REGIONS.map((name) => {
              const on = regionSel.includes(name);
              return (
                <span
                  key={name}
                  onClick={() => toggleRegion(name)}
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    borderRadius: 9999,
                    padding: "6px 13px",
                    cursor: "pointer",
                    border: `1px solid ${on ? "var(--accent, #FF6B35)" : "var(--border, #ECF0F1)"}`,
                    background: on ? "var(--accent, #FF6B35)" : "transparent",
                    color: on ? "#fff" : "var(--text2, #5A6B7B)",
                  }}
                >
                  {name}
                </span>
              );
            })}
          </div>
          <div style={{ height: 1, background: "var(--border, #ECF0F1)", margin: "22px 0" }} />
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text2, #5A6B7B)" }}>
              Thời gian
            </span>
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--accent, #FF6B35)" }}>≤ {maxTime} phút</span>
          </div>
          <input
            type="range"
            min={15}
            max={180}
            step={15}
            value={maxTime}
            onChange={(e) => setMaxTime(Number(e.target.value))}
            style={{ width: "100%", accentColor: "#FF6B35" }}
          />
          <div style={{ height: 1, background: "var(--border, #ECF0F1)", margin: "22px 0" }} />
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text2, #5A6B7B)", marginBottom: 10 }}>
            Sắp xếp
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            style={{
              fontFamily: "inherit",
              fontSize: 14,
              width: "100%",
              padding: "10px 12px",
              border: "1px solid var(--border, #ECF0F1)",
              borderRadius: 8,
              background: "var(--surface, #fff)",
              color: "var(--text, #2C3E50)",
            }}
          >
            <option value="rating">Đánh giá cao nhất</option>
            <option value="newest">Mới nhất</option>
            <option value="time">Nhanh nhất</option>
          </select>
          <button
            onClick={resetFilters}
            style={{
              fontFamily: "inherit",
              fontSize: 13,
              fontWeight: 600,
              color: "var(--text2, #5A6B7B)",
              background: "none",
              border: "none",
              padding: "16px 0 0",
              cursor: "pointer",
            }}
          >
            Xoá bộ lọc
          </button>
        </aside>

        <div>
          {filtered.length > 0 ? (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
                {filtered.map((r) => (
                  <RecipeCard
                    key={r.id}
                    recipe={r}
                    onOpen={() => router.push(`/recipes/${r.id}`)}
                    heart={{ on: !!favorites[r.id], onToggle: (e) => toggleFavorite(r.id, e) }}
                  />
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
                <button
                  style={{
                    fontFamily: "inherit",
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--accent, #FF6B35)",
                    background: "none",
                    border: "2px solid var(--accent, #FF6B35)",
                    borderRadius: 8,
                    padding: "12px 28px",
                    cursor: "pointer",
                  }}
                >
                  Tải thêm công thức
                </button>
              </div>
            </>
          ) : (
            <div style={{ border: "1px dashed var(--border, #ECF0F1)", borderRadius: 12, padding: "72px 32px", textAlign: "center" }}>
              <div style={{ width: 48, height: 48, borderRadius: 9999, border: "2px solid var(--border, #ECF0F1)", margin: "0 auto 20px" }} />
              <div style={{ fontFamily: "var(--font-lora), Georgia, serif", fontSize: 22, fontWeight: 600, marginBottom: 8 }}>
                Không tìm thấy món nào
              </div>
              <p style={{ fontSize: 15, color: "var(--text2, #5A6B7B)", margin: "0 0 22px" }}>
                Thử nới rộng thời gian nấu hoặc bỏ một vài bộ lọc.
              </p>
              <button
                onClick={resetFilters}
                style={{
                  fontFamily: "inherit",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#fff",
                  background: "var(--accent, #FF6B35)",
                  border: "none",
                  borderRadius: 8,
                  padding: "12px 24px",
                  cursor: "pointer",
                }}
              >
                Xoá bộ lọc
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
