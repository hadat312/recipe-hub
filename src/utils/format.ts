import { LV_COLOR } from "../data/recipes";
import type { Recipe } from "../data/types";

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} phút`;
  const hh = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `${hh} giờ ${rest} phút` : `${hh} giờ`;
}

export function formatRating(rating: number): string {
  return String(rating).replace(".", ",");
}

export function formatMeta(r: Recipe): string {
  return `★ ${formatRating(r.rating)} · ${formatDuration(r.time)} · ${r.level}`;
}

export function levelColor(r: Recipe): string {
  return LV_COLOR[r.lv];
}

export function prepCookSplit(r: Recipe): { prep: string; cook: string } {
  const prepMinutes = Math.max(5, Math.round((r.time * 0.22) / 5) * 5);
  return {
    prep: formatDuration(prepMinutes),
    cook: formatDuration(r.time - prepMinutes),
  };
}

const COUNTABLE_UNITS = new Set([
  "khúc", "hoa", "thanh", "bó", "quả", "củ", "cây", "miếng",
  "con", "lá", "bìa", "cái", "tệp", "thìa", "xiên",
]);

export function formatQty(n: number, unit: string): string {
  if (COUNTABLE_UNITS.has(unit)) {
    const half = Math.round(n * 2) / 2;
    const whole = Math.floor(half);
    if (half === whole) return String(whole);
    return whole > 0 ? `${whole}½` : "½";
  }
  const v = Math.round(n * 100) / 100;
  return String(v).replace(".", ",");
}

export function stepTimerLabel(timer: number): string {
  return timer ? ` · ${timer} phút` : "";
}
