import { useState, useEffect } from "react";
import { Theme, ThemeProviderContext } from "./theme-context";

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

export const ThemeProvider = ({
  children,
  defaultTheme = Theme.System,
  storageKey = "theme"
}: ThemeProviderProps) => {

  const [theme, setTheme] = useState<Theme>(defaultTheme);

  // load theme from localStorage or use default
  useEffect(() => {
    const stored = localStorage.getItem(storageKey) as Theme;
    if (stored && Object.values(Theme).includes(stored)) {
      setTheme(stored);
    } else {
      setTheme(defaultTheme);
    }
  }, [defaultTheme, storageKey]);

  // save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // apply theme to document root
  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  return (
    <ThemeProviderContext value={{ theme, setTheme }}>
      {children}
    </ThemeProviderContext>
  );
};