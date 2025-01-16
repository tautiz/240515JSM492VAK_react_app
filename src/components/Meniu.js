import React from 'react';

function Meniu({ data }) {
  return (
    <nav className="flex space-x-1">
      {data.map((item) => (
        <a
          key={item.id}
          href={item.nuoroda}
          className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-primary/10 dark:hover:bg-primary/20 rounded-lg transition-all duration-200 font-medium"
        >
          {item.pavadinimas}
        </a>
      ))}
    </nav>
  );
}

export default Meniu;