import React from 'react';
import { NavLink } from 'react-router-dom';

function Meniu({ data }) {

  const activeStyle = {
    fontWeight: 'bold',
    textDecoration: 'underline'
  };

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
      <NavLink to="/user/1" style={({ isActive }) => isActive ? activeStyle : undefined}>User 1</NavLink>
      <NavLink to="/user/2" style={({ isActive }) => isActive ? activeStyle : undefined}>User 2</NavLink>
    </nav>
  );
}

export default Meniu;