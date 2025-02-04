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
        <NavLink 
          key={item.id}
          to={item.nuoroda} 
          style={({ isActive }) => isActive ? activeStyle : undefined}
          className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-primary/10 dark:hover:bg-primary/20 rounded-lg transition-all duration-200 font-medium"
        >
          {item.pavadinimas}
        </NavLink>
    ))}
    </nav>
  );
}

export default Meniu;