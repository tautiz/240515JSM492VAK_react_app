import React, {useState, useEffect} from 'react';
import Meniu from './Meniu';

const menuItems = [
  { id: 1, pavadinimas: "Pirmas", nuoroda: "#" },
  { id: 2, pavadinimas: "Antras", nuoroda: "#" },
  { id: 3, pavadinimas: "Trecias", nuoroda: "#" },
  { id: 4, pavadinimas: "Ketvirtas", nuoroda: "#" },
];

function Header() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Meniu data={menuItems} />
          <input type='button'
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label={darkMode ? 'Įjungti šviesią temą' : 'Įjungti tamsią temą'}
            value={darkMode ? '🌞' : '🌙'}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
