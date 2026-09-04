"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";

export interface AuthUser {
  name: string;
  isNewUser: boolean;
}

interface AppStateValue {
  dark: boolean;
  toggleDark: () => void;

  loggedIn: boolean;
  user: AuthUser | null;
  login: () => void;
  registerUser: (name: string) => void;
  logout: () => void;

  favorites: Record<string, boolean>;
  toggleFavorite: (id: string, e?: { stopPropagation: () => void }) => void;

  toast: string;
  showToast: (message: string) => void;
}

const AppStateContext = createContext<AppStateValue | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({
    comtam: true,
    dauhu: true,
  });
  const [toast, setToast] = useState("");
  const toastTimer = useRef<number | undefined>(undefined);

  const toggleDark = useCallback(() => setDark((d) => !d), []);

  const showToast = useCallback((message: string) => {
    setToast(message);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(""), 2200);
  }, []);

  const toggleFavorite = useCallback(
    (id: string, e?: { stopPropagation: () => void }) => {
      e?.stopPropagation();
      setFavorites((prev) => {
        const next = { ...prev };
        if (next[id]) {
          delete next[id];
          showToast("Đã bỏ khỏi mục yêu thích");
        } else {
          next[id] = true;
          showToast("Đã lưu vào mục yêu thích");
        }
        return next;
      });
    },
    [showToast],
  );

  const login = useCallback(() => {
    setLoggedIn(true);
    setUser({ name: "Ngọc An", isNewUser: false });
  }, []);

  const registerUser = useCallback((name: string) => {
    setLoggedIn(true);
    setUser({ name: name.trim() || "Ngọc An", isNewUser: true });
  }, []);

  const logout = useCallback(() => {
    setLoggedIn(false);
    setUser(null);
  }, []);

  const value: AppStateValue = {
    dark,
    toggleDark,
    loggedIn,
    user,
    login,
    registerUser,
    logout,
    favorites,
    toggleFavorite,
    toast,
    showToast,
  };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState(): AppStateValue {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
}
