"use client";

import { useRouter } from "next/navigation";
import { Footer } from "@/components/Footer";
import { PhotoPlaceholder } from "@/components/Placeholder";
import { RecipeCard } from "@/components/RecipeCard";
import { LEVELS, LV_COLOR, findRecipe } from "@/data/recipes";

const TRENDING_IDS = ["pho", "comtam", "miquang", "dauhu"];

export default function HomePage() {
  const router = useRouter();
  const bunBo = findRecipe("bunbo");

  return (
    <main>
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
          alignItems: "center",
          maxWidth: 1400,
          margin: "0 auto",
          padding: "80px 48px 64px",
        }}
      >
        <div style={{ maxWidth: 520 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--brown, #8B7355)",
              marginBottom: 22,
            }}
          >
            <span style={{ width: 24, height: 1, background: "var(--brown, #8B7355)", display: "inline-block" }} />
            Bếp Việt mỗi ngày
          </div>
          <h1
            style={{
              fontFamily: "var(--font-lora), Georgia, serif",
              fontSize: 60,
              lineHeight: 1.08,
              fontWeight: 600,
              margin: "0 0 20px",
              letterSpacing: "-0.02em",
            }}
          >
            Nấu món nhà,
            <br />
            <em style={{ fontStyle: "italic", color: "var(--accent, #FF6B35)" }}>ngon như mẹ nấu.</em>
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.65, color: "var(--text2, #5A6B7B)", margin: "0 0 32px", maxWidth: 440 }}>
            Hơn 2.400 công thức từ phở, bún bò tới cơm tấm — hướng dẫn từng bước, đo lường chính xác, ghi chú từ người
            nấu thật.
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "var(--surface, #fff)",
              border: "1px solid var(--border, #ECF0F1)",
              borderRadius: 12,
              padding: "8px 8px 8px 18px",
              boxShadow: "var(--sh-md)",
              maxWidth: 460,
            }}
          >
            <span style={{ fontSize: 15, color: "var(--text3, #95A5A6)", flex: 1 }}>Tìm món, nguyên liệu…</span>
            <button
              onClick={() => router.push("/recipes")}
              style={{
                fontFamily: "inherit",
                fontSize: 14,
                fontWeight: 600,
                color: "#fff",
                background: "var(--accent, #FF6B35)",
                border: "none",
                borderRadius: 8,
                padding: "12px 22px",
                cursor: "pointer",
              }}
            >
              Tìm kiếm
            </button>
          </div>
          <div style={{ display: "flex", gap: 24, marginTop: 36 }}>
            <Stat value="2.412" label="Công thức" />
            <div style={{ width: 1, background: "var(--hair, rgba(44,62,80,0.09))" }} />
            <Stat value="18k" label="Người nấu" />
            <div style={{ width: 1, background: "var(--hair, rgba(44,62,80,0.09))" }} />
            <Stat value="4,7" label="Đánh giá TB" />
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <PhotoPlaceholder aspect="4/5" radius={16} label="hero food shot — 1200×1500" />
          <div
            onClick={() => router.push(`/recipes/${bunBo.id}`)}
            style={{
              position: "absolute",
              bottom: -20,
              left: -28,
              background: "var(--surface, #fff)",
              borderRadius: 12,
              padding: "14px 18px",
              boxShadow: "var(--sh-lg)",
              display: "flex",
              alignItems: "center",
              gap: 12,
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                background: "repeating-linear-gradient(135deg, var(--ph1, #EDE6DE) 0 6px, var(--ph2, #E4DBD1) 6px 12px)",
              }}
            />
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Bún bò Huế</div>
              <div style={{ fontSize: 12, color: "var(--text2, #5A6B7B)", marginTop: 2 }}>★ 4,8 · 90 phút · Bán chuyên</div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1400, margin: "0 auto", padding: "24px 48px 64px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 24 }}>
          <h2 style={{ fontFamily: "var(--font-lora), Georgia, serif", fontSize: 28, fontWeight: 600, margin: 0 }}>
            Đang thịnh hành hôm nay
          </h2>
          <span onClick={() => router.push("/recipes")} style={{ fontSize: 14, fontWeight: 500, color: "var(--accent, #FF6B35)", cursor: "pointer" }}>
            Xem tất cả →
          </span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          {TRENDING_IDS.map((id) => {
            const r = findRecipe(id);
            return (
              <RecipeCard
                key={id}
                recipe={r}
                showBadge={false}
                onOpen={() => router.push(`/recipes/${r.id}`)}
              />
            );
          })}
        </div>
      </section>

      <section style={{ maxWidth: 1400, margin: "0 auto", padding: "0 48px 80px" }}>
        <h2 style={{ fontFamily: "var(--font-lora), Georgia, serif", fontSize: 28, fontWeight: 600, margin: "0 0 6px" }}>
          Chọn theo độ khó
        </h2>
        <p style={{ fontSize: 15, color: "var(--text2, #5A6B7B)", margin: "0 0 24px" }}>
          Từ bữa cơm 20 phút tới món cỗ cả buổi chiều.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {LEVELS.map((l) => (
            <div
              key={l.lv}
              onClick={() => router.push("/recipes")}
              className="rh-raise"
              style={{
                background: "var(--surface, #fff)",
                border: "1px solid var(--border, #ECF0F1)",
                borderRadius: 12,
                padding: 22,
                cursor: "pointer",
              }}
            >
              <div style={{ width: 32, height: 4, borderRadius: 9999, background: LV_COLOR[l.lv] }} />
              <div style={{ fontFamily: "var(--font-lora), Georgia, serif", fontSize: 20, fontWeight: 600, margin: "14px 0 4px" }}>{l.vi}</div>
              <div style={{ fontSize: 13, color: "var(--text2, #5A6B7B)" }}>{l.sub}</div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div style={{ fontFamily: "var(--font-lora), Georgia, serif", fontSize: 26, fontWeight: 600 }}>{value}</div>
      <div style={{ fontSize: 13, color: "var(--text2, #5A6B7B)", marginTop: 2 }}>{label}</div>
    </div>
  );
}
