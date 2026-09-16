import { useEffect, useState } from "react";

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

  document.documentElement.setAttribute("data-theme", theme);
  document.body.classList.toggle("dark-mode", darkMode);
  document.body.classList.toggle("light-mode", !darkMode);
};

const initialDarkMode = getInitialTheme();

applyTheme(initialDarkMode);

export const useTheme = () => {
  const [darkMode, setDarkMode] = useState(initialDarkMode);

  useEffect(() => {
    applyTheme(darkMode);
    window.localStorage.setItem("web-tools-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return { darkMode, setDarkMode };
};
