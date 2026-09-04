"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AvatarPlaceholder } from "@/components/Placeholder";
import { RecipeCard } from "@/components/RecipeCard";
import { useAppState } from "@/state/AppState";
import { findRecipe } from "@/data/recipes";

type Owner = "self" | "other";
type Tab = "recipes" | "favs" | "about";

const MY_RECIPE_IDS = ["bunbo", "dauhu", "chaga", "canhchua"];

export default function ProfilePage() {
  const router = useRouter();
  const { user, favorites } = useAppState();
  const [owner, setOwner] = useState<Owner>("self");
  const [tab, setTab] = useState<Tab>("recipes");

  const isSelf = owner === "self";
  const isNewUser = isSelf && !!user?.isNewUser;

  const profile = isSelf
    ? {
        name: isNewUser ? user?.name || "Ngọc An" : "Ngọc An",
        bio: isNewUser
          ? "Chưa có giới thiệu — thêm vài dòng về căn bếp của bạn."
          : "Nấu cơm nhà cho ba người, thích món Trung và mọi thứ có sả.",
        recipeCount: isNewUser ? 0 : 4,
        followers: isNewUser ? 0 : 342,
        rating: isNewUser ? "—" : "4,7",
        joined: isNewUser ? "hôm nay" : "01/2024",
        about: isNewUser
          ? "Bạn vừa tạo tài khoản. Viết vài dòng giới thiệu để người khác biết bạn nấu gì."
          : "Mình bắt đầu ghi công thức từ 2019 để không quên món mẹ nấu. Giờ thì cả nhà nấu theo ghi chú của mình.",
      }
    : {
        name: "Mợ Hạnh",
        bio: "Ba mươi năm bán bún bò ở chợ Đông Ba. Chia sẻ đúng công thức, không giữ lại gì.",
        recipeCount: 27,
        followers: "5.1k",
        rating: "4,8",
        joined: "03/2022",
        about: "Mợ Hạnh bán bún bò từ năm 1996. Các công thức ở đây là bản mợ dùng ở quán, đã chia nhỏ khẩu phần cho bếp nhà.",
      };

  const myRecipes = MY_RECIPE_IDS.map((id) => findRecipe(id));
  const favRecipes = Object.keys(favorites)
    .map((id) => findRecipe(id))
    .filter(Boolean);

  const tabItems = isNewUser ? [] : tab === "recipes" ? myRecipes : favRecipes;

  const tabs: { key: Tab; label: string }[] = [
    { key: "recipes", label: isSelf ? "Công thức của tôi" : "Công thức" },
    { key: "favs", label: "Yêu thích" },
    { key: "about", label: "Giới thiệu" },
  ];

  const emptyTitle = tab === "recipes" ? "Chưa có công thức nào" : "Chưa lưu công thức nào";
  const emptyBody =
    tab === "recipes" ? "Công thức đầu tiên của bạn sẽ xuất hiện ở đây." : "Bấm hình trái tim trên bất kỳ công thức để lưu lại.";
  const emptyCta = tab === "recipes" ? "Xem công thức để lấy cảm hứng" : "Tìm công thức để lưu";

  const profileFacts = [
    { k: "Chuyên môn", v: isSelf ? "Cơm nhà, món Trung" : "Bún bò, món Huế" },
    { k: "Vùng miền", v: isSelf ? "Hà Nội" : "Huế" },
    { k: "Ngôn ngữ", v: "Tiếng Việt, English" },
  ];

  return (
    <main style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 48px 80px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 28,
          paddingBottom: 32,
          borderBottom: "1px solid var(--hair, rgba(44,62,80,0.09))",
        }}
      >
        <AvatarPlaceholder size={104} style={{ borderRadius: 9999 }} />
        <div style={{ flex: 1 }}>
          <h1 style={{ fontFamily: "var(--font-lora), Georgia, serif", fontSize: 34, fontWeight: 600, letterSpacing: "-0.02em", margin: "0 0 8px" }}>
            {profile.name}
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--text2, #5A6B7B)", margin: "0 0 16px", maxWidth: 520 }}>
            {profile.bio}
          </p>
          <div style={{ display: "flex", gap: 22, fontSize: 14, color: "var(--text2, #5A6B7B)" }}>
            <span>
              <strong style={{ color: "var(--text, #2C3E50)" }}>{profile.recipeCount}</strong> công thức
            </span>
            <span>
              <strong style={{ color: "var(--text, #2C3E50)" }}>{profile.followers}</strong> người theo dõi
            </span>
            <span>
              <strong style={{ color: "var(--text, #2C3E50)" }}>★ {profile.rating}</strong> trung bình
            </span>
            <span style={{ color: "var(--text2, #5A6B7B)" }}>Tham gia {profile.joined}</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "stretch" }}>
          {isSelf ? (
            <button
              style={{
                fontFamily: "inherit",
                fontSize: 14,
                fontWeight: 600,
                color: "var(--text, #2C3E50)",
                background: "var(--surface, #fff)",
                border: "1px solid var(--border, #ECF0F1)",
                borderRadius: 8,
                padding: "11px 20px",
                cursor: "pointer",
              }}
            >
              Sửa hồ sơ
            </button>
          ) : (
            <button
              style={{
                fontFamily: "inherit",
                fontSize: 14,
                fontWeight: 600,
                color: "#fff",
                background: "var(--accent, #FF6B35)",
                border: "none",
                borderRadius: 8,
                padding: "11px 24px",
                cursor: "pointer",
              }}
            >
              Theo dõi
            </button>
          )}
          <button
            onClick={() => {
              setOwner(isSelf ? "other" : "self");
              setTab("recipes");
            }}
            style={{
              fontFamily: "inherit",
              fontSize: 12,
              fontWeight: 500,
              color: "var(--text2, #5A6B7B)",
              background: "none",
              border: "1px dashed var(--border, #ECF0F1)",
              borderRadius: 8,
              padding: "8px 14px",
              cursor: "pointer",
            }}
          >
            {isSelf ? "Xem như hồ sơ người khác" : "Xem như hồ sơ của tôi"}
          </button>
        </div>
      </div>

      <div style={{ display: "flex", gap: 4, margin: "28px 0 26px", borderBottom: "1px solid var(--hair, rgba(44,62,80,0.09))" }}>
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              fontFamily: "inherit",
              fontSize: 15,
              fontWeight: 600,
              background: "none",
              border: "none",
              borderBottom: `2px solid ${tab === t.key ? "var(--accent, #FF6B35)" : "transparent"}`,
              color: tab === t.key ? "var(--text, #2C3E50)" : "var(--text2, #5A6B7B)",
              padding: "12px 16px",
              marginBottom: -1,
              cursor: "pointer",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab !== "about" ? (
        tabItems.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {tabItems.map((r) => (
              <RecipeCard
                key={r.id}
                recipe={r}
                onOpen={() => router.push(`/recipes/${r.id}`)}
                ownerActions={isSelf}
              />
            ))}
          </div>
        ) : (
          <div style={{ border: "1px dashed var(--border, #ECF0F1)", borderRadius: 12, padding: "72px 32px", textAlign: "center" }}>
            <div style={{ width: 48, height: 48, borderRadius: 9999, border: "2px solid var(--border, #ECF0F1)", margin: "0 auto 20px" }} />
            <div style={{ fontFamily: "var(--font-lora), Georgia, serif", fontSize: 22, fontWeight: 600, marginBottom: 8 }}>{emptyTitle}</div>
            <p style={{ fontSize: 15, color: "var(--text2, #5A6B7B)", margin: "0 0 22px" }}>{emptyBody}</p>
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
                padding: "12px 24px",
                cursor: "pointer",
              }}
            >
              {emptyCta}
            </button>
          </div>
        )
      ) : (
        <div style={{ maxWidth: 620 }}>
          <h2 style={{ fontFamily: "var(--font-lora), Georgia, serif", fontSize: 24, fontWeight: 600, margin: "0 0 14px" }}>Về {profile.name}</h2>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: "var(--text2, #5A6B7B)", margin: "0 0 24px" }}>{profile.about}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {profileFacts.map((f) => (
              <div key={f.k} style={{ display: "flex", gap: 16, fontSize: 15 }}>
                <span style={{ width: 150, flex: "none", color: "var(--text2, #5A6B7B)" }}>{f.k}</span>
                <span>{f.v}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
