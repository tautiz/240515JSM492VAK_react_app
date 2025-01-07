function SonineJuosta() {
  return (
    <div className="card space-y-4">
      <h2 className="text-xl font-bold text-primary dark:text-primary-light">Šoninė juosta</h2>
      <ul className="space-y-2">
        <li className="hover:translate-x-2 transition-transform">
          <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light">
            Nuoroda 1
          </a>
        </li>
        <li className="hover:translate-x-2 transition-transform">
          <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light">
            Nuoroda 2
          </a>
        </li>
        <li className="hover:translate-x-2 transition-transform">
          <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light">
            Nuoroda 3
          </a>
        </li>
      </ul>
    </div>
  );
}

export default SonineJuosta;