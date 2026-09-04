"use client";

import { useEffect, useState } from "react";

/**
 * Tracks window.innerWidth. Always starts at `initial` (matching what the
 * server rendered) and only switches to the real width after mount — reading
 * `window` during the initial render would make the client's first hydration
 * pass disagree with the server-rendered HTML (a hydration mismatch).
 */
export function useViewportWidth(initial = 1440): number {
  const [width, setWidth] = useState(initial);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return width;
}
