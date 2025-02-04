import { Link } from "react-router-dom";

function SonineJuosta() {
  const links = [
    { text: "API integracija", url: "/pamoka/api-integration" },
    { text: "Darbas su CSS", url: "/pamoka/css-work"  },
    { text: "Formos pavyzdžiai", url: "/pamoka/forms"  },
    { text: "Advanced Salygos ir React gyvavymo ciklas useEffect", url: "/pamoka/lifecycle"  },
    { text: "Įvykių Pavyzdžiai", url: "/pamoka/events"  },
    { text: "Darbas su Komponentais", url: "/pamoka/components"  },
  ];

  return (
    <div className="card space-y-4 sticky z-50" style={{ top: '104px' }}>
      <h2 className="text-xl font-bold text-primary dark:text-primary-light">Šoninė juosta</h2>
      <ul className="space-y-2">
        { links.map((link, index) => (
          <li key={index} className="hover:translate-x-2 transition-transform">
            <Link to={link.url} className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light">
                {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SonineJuosta;