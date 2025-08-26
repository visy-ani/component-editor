"use client";

import { useState, useEffect } from "react";

export function useTheme() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    const root = window.document.documentElement;

    if (localTheme) {
      setTheme(localTheme);
      root.classList.add(localTheme);
    } else {
      root.classList.add("light"); // Default to light theme
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    const root = window.document.documentElement;

    root.classList.remove(theme);
    root.classList.add(newTheme);
    window.localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return { theme, toggleTheme };
}
