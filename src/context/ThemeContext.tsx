import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextProps {
  darkTheme: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--main-bg-color',
      darkTheme ? '#242424' : '#f5f6f6'
    );
  }, [darkTheme]);

  const toggleTheme = () => {
    setDarkTheme((prevTheme) => !prevTheme);
  };

  const themeContextValues = {
    darkTheme,
    toggleTheme,
  };

  return <ThemeContext.Provider value={themeContextValues}>{children}</ThemeContext.Provider>;
};

const useThemeContext = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a Theme Provider');
  }
  return context;
};

export { useThemeContext, ThemeProvider };
