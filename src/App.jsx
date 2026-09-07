import { useState } from "react";
import { useTheme } from "./hooks/useTheme";
import Navbar from "./components/Navbar";
import Intro from "./components/Intro";
import PasswordTool from "./components/PasswordTool";
import StatusTool from "./components/StatusTool";
import WordCounter from "./components/WordCounter";
import MdReader from "./components/MdReader";
import Footer from "./components/Footer";
import "./index.css";

function App() {
  const { darkMode, setDarkMode } = useTheme();
  const [activePage, setActivePage] = useState("intro");

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {activePage === "intro" && <Intro setActivePage={setActivePage} />}
      {activePage === "password" && <PasswordTool />}
      {activePage === "status" && <StatusTool />}
      {activePage === "wordcounter" && <WordCounter />}
      {activePage === "mdreader" && <MdReader />}

      <Footer />
    </div>
  );
}

export default App;
