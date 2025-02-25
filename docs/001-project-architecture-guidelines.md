# 001-project-architecture-guidelines.md

## 1. Introduction
Šis dokumentas pateikia projekto architektūros gaires ir apibrėžia geriausias praktikas kuriant naują funkcionalumą React projekte. Šios gairės skirtos užtikrinti, kad kiekvienas papildymas ar nauja funkcija būtų kuriama nuosekliai, atsižvelgiant į esamą projekto struktūrą, ADR (Architectural Decision Records) dokumentaciją bei galimybę pernaudoti esamas bibliotekas.

## 2. Directory Structure and Organization
- **Component Organization:** Visi React komponentai turėtų būti suskirstyti į atskiras direktorijas, pvz., `components/`, `pages/`, `hooks/` ir `contexts/`. Tai padeda palaikyti atskirą atsakomybę bei pagerina kodo skaitomumą.
- **Assets and Utilities:** Laikykite bendrus stilius, paveikslėlius, bei utilitinius failus atskirose direktorijose, pvz., `assets/` ir `utils/`.
- **Modular Design:** Siekiama sukurti mažus, lengvai pernaudojamus modulius, užtikrinančius komponentų atkuriamumą ir testuojamumą.

### 2.1 Detailed Project Structure
```
src/
├── assets/                 # Static files (images, fonts, global styles)
│   ├── images/
│   ├── fonts/
│   └── styles/
│       ├── global.css     # Global styles
│       └── variables.css  # CSS variables and themes
├── components/            # Shared/reusable components
│   ├── common/           # Very common components (buttons, inputs)
│   │   ├── Button/
│   │   │   ├── Button.jsx
│   │   │   ├── Button.test.jsx
│   │   │   └── Button.css
│   │   └── Input/
│   └── feature/          # Feature-specific components
│       └── UserProfile/
├── hooks/                # Custom React hooks
│   ├── useAuth.js
│   └── useForm.js
├── pages/                # Page components
│   ├── Home/
│   │   ├── Home.jsx
│   │   ├── Home.test.jsx
│   │   └── Home.css
│   └── Dashboard/
├── services/            # API services and external integrations
│   ├── api.js          # API configuration
│   └── authService.js  # Authentication service
├── store/              # State management (Redux/Context)
│   ├── actions/
│   ├── reducers/
│   └── index.js
├── utils/              # Utility functions and helpers
│   ├── validation.js
│   └── formatting.js
├── constants/          # Application constants
│   ├── routes.js
│   └── config.js
└── types/             # TypeScript type definitions (if using TS)
    └── index.d.ts

tests/                 # Test configuration and helpers
├── setup.js
└── mocks/

docs/                  # Project documentation
├── adr/              # Architecture Decision Records
├── api/              # API documentation
└── guides/           # Development guides
```

### 2.2 Naming Conventions
- **Komponentų Failai:** PascalCase (pvz., `UserProfile.jsx`)
- **Utility Failai:** camelCase (pvz., `formatDate.js`)
- **Stilių Failai:** Toks pat pavadinimas kaip komponento (pvz., `UserProfile.css`)
- **Test Failai:** Komponento pavadinimas su `.test` priesaga (pvz., `UserProfile.test.jsx`)

### 2.3 Component Structure Guidelines
- Kiekvienas komponentas turėtų būti savo direktorijoje su susijusiais failais:
```
ComponentName/
├── ComponentName.jsx      # Pagrindinis komponento failas
├── ComponentName.css     # Komponento stiliai
├── ComponentName.test.jsx # Komponento testai
├── index.js             # Eksportuoja komponentą
└── types.ts             # TypeScript tipai (jei naudojama)
```

### 2.4 Code Organization Within Files
- Imports turėtų būti sugrupuoti šia tvarka:
  1. React ir kitos core bibliotekos
  2. Third-party komponentai ir utilities
  3. Projekto komponentai
  4. Stiliai ir assets
  5. Tipai (TypeScript)

### 2.5 State Management Structure
- **Local State:** Komponento viduje naudojant `useState`
- **Shared State:** Context API arba Redux store
- **API State:** React Query/SWR bibliotekos

### 2.6 Environment Configuration
```
project-root/
├── .env                  # Default env variables
├── .env.development      # Development specifinės env variables
├── .env.production       # Production specifinės env variables
└── .env.test            # Testing specifinės env variables
```

## 3. Architectural Decision Records (ADR)
- **Prieš pradedant kurti naują funkciją:** Visada patikrinkite, ar nėra jau sukurtos ADR dokumentacijos (pvz., failai pavadinimu `001-project-architecture-guidelines.md`, `002-project-architecture-guidelines.md` ar panašūs). ADR dokumentacija padeda užtikrinti, kad naujos technologijos, bibliotekos ar sprendimai atitiktų bendrą projekto architektūrą.
- **Dokumentavimas:** Visi reikšmingi sprendimai bei pasirinkimai turėtų būti dokumentuojami per ADR, įskaitant priežastis ir alternatyvas.

## 4. Library and Dependency Evaluation
- **Pernaudojamumas:** Prieš diegdami naują biblioteką arba modulių sistemą, patikrinkite esamas priklausomybes. Įvertinkite, ar galima išplėsti arba pritaikyti jau naudojamas bibliotekas naujai funkcionalumui.
- **Atnaujinimai:** Reguliariai peržiūrėkite priklausomybes ir siekite naudoti jų naujausias stabilias versijas, siekiant užtikrinti optimalią našumo ir saugumo lygį.
- **Pritaikomumas:** Naujo funkcionalumo kūrime stenkitės išnaudoti esamus sprendimus, kad išvengtumėte perteklinių implementacijų ir sulėtintumėte projekto augimą.

## 5. Code Quality and Testing
- **Linting ir Formatting:** Naudokite įrankius, tokius kaip ESLint ir Prettier, kad užtikrintumėte kodo vientisumą ir mažiausią klaidų kiekį.
- **Unit Testing:** Kiekvienam komponentui ir funkcionalumui turėtų būti sukurtas tinkamas vienetinis testavimas, siekiant išlaikyti aukštą projekto kokybę.
- **Code Reviews:** Prieš įtraukiant naujus pakeitimus į pagrindinę kodo bazę, būtina atlikti kodo peržiūras, kad visos gairės ir standartai būti būtų laikomasi.

## 6. Performance and Optimization
- **Code Splitting:** Naudokite React.lazy ir Suspense, kad suskaidytumėte kodo paketą ir sumažintumėte pradinių įkrovos laiką.
- **Memoization:** Kur įmanoma, naudokite React.memo arba useMemo siekiant optimizuoti komponentų atvaizdavimą.

## 7. Future Scalability and Maintenance
- **Modular Architecture:** Užtikrinkite, kad nauji funkcionalumai būtų kuriami kaip nepriklausomi moduliai, kad būtų lengva juos atnaujinti arba integruoti su kitomis sistemos dalimis.
- **Documentation:** Dokumentuokite visus pakeitimus ir naujus sprendimus, siekiant užtikrinti, kad ateityje kitos komandos nariai galėtų lengvai suprasti projekto evoliuciją.

## 8. Conclusion
Šios gairės skirtos užtikrinti, kad projektas vystytųsi nuosekliai, atsižvelgiant į bendras architektūrines gaires ir geriausias praktikas. Prieš pradedant kurti naują funkcionalumą, visada:
- Patikrinkite ADR dokumentaciją.
- Įvertinkite galimybes pernaudoti jau egzistuojančias bibliotekas.
- Dokumentuokite visus svarbius sprendimus.