import { useState, useLayoutEffect } from "react";

const getInitialTheme = () => {
  const savedTheme = window.localStorage.getItem("web-tools-theme");

  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme === "dark";
  }

  return (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
};

const applyTheme = (darkMode) => {
  const theme = darkMode ? "dark" : "light";

  document.body.classList.toggle("dark-mode", darkMode);
  document.body.classList.toggle("light-mode", !darkMode);
  document.documentElement.setAttribute("data-theme", theme);
};

export const useTheme = () => {
  const [darkMode, setDarkMode] = useState(getInitialTheme);

  useLayoutEffect(() => {
    applyTheme(darkMode);
    window.localStorage.setItem("web-tools-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return { darkMode, setDarkMode };
};
