import React, { createContext, useState, useContext, useCallback } from 'react';

const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  // Naudojame useCallback, kad toggleTheme nebūtų perskaičiuojamas kiekvieną kartą
  const toggleTheme = useCallback(() => {
    console.log('toggleTheme', theme);
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}