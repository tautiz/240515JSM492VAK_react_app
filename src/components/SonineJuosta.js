function SonineJuosta() {
  const hrTexts = [
    "Darbas su CSS",
    "Formos pavyzdžiai",
    "Advanced Salygos ir React gyvavimo ciklas useEffect()",
    "Įvykių Pavyzdžiai",
    "Darbas su Komponentais",
    "Intro",
  ];

  return (
    <div className="card space-y-4 sticky z-50" style={{ top: '104px' }}>
      <h2 className="text-xl font-bold text-primary dark:text-primary-light">Šoninė juosta</h2>
      <ul className="space-y-2">
        { hrTexts.map((text, index) => (
          <li key={index} className="hover:translate-x-2 transition-transform">
            <a href={'#' + text.replace(/\s+/g, '')} className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light">
              {text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SonineJuosta;