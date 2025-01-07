import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm mt-12">
      <div className="container mx-auto px-4 py-6 text-center text-gray-600 dark:text-gray-400">
        © {currentYear} Mano Reaktas. Visos teisės saugomos.
      </div>
    </footer>
  );
}

export default Footer;
