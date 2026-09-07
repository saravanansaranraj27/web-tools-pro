import { useState, useEffect } from "react";

export const useTheme = () => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light",
    );
  }, [darkMode]);

  return { darkMode, setDarkMode };
};
