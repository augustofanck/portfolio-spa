import React, { useEffect, useMemo, useState } from "react";
import { ThemeContext, type Theme } from "./theme";

function getInitialTheme(): Theme {
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") return saved;

  const prefersDark = window.matchMedia?.(
    "(prefers-color-scheme: dark)"
  )?.matches;

  return prefersDark ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

  useEffect(() => {
    const root = document.documentElement;

    root.classList.add("theme-transition");
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    const timeout = window.setTimeout(() => {
      root.classList.remove("theme-transition");
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
