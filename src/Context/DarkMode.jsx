import { createContext, useState } from "react";

export const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  // eslint-disable-next-line no-unused-vars
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    // setDarkMode((prev) => !prev);
    setDarkMode(!darkMode);
    console.log(darkMode);
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
