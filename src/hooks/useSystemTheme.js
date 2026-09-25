import { useEffect, useState } from "react";

const getInitialTheme = () => {
  if (typeof window === "undefined" || !window.matchMedia) {
    return false;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const applyTheme = (darkMode) => {
  const theme = darkMode ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);
  document.body.classList.toggle("dark-mode", darkMode);
  document.body.classList.toggle("light-mode", !darkMode);
};

export const useTheme = () => {
  const [darkMode, setDarkMode] = useState(getInitialTheme);

  useEffect(() => {
    applyTheme(darkMode);
  }, [darkMode]);

  return { darkMode, setDarkMode };
};
