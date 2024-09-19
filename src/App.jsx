import { Route, Routes } from "react-router";
import Header from "./components/Header";
import Home from "./pages/Home";
import Results from "./pages/Results";
import { useContext, useState } from "react";
import { DarkModeContext } from "./Context/DarkMode";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <>
      <>
        <main data-theme={darkMode ? "dark" : "light"} className="h-screen">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </main>
      </>
    </>
  );
}

export default App;
