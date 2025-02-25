# ADR: Login Modal Implementation

## Status
Proposed

## Context
Reikalingas saugus ir patogus vartotojo prisijungimo funkcionalumas, kuris būtų prieinamas per modalinį langą. Sistema turi palaikyti tamsią temą ir atitikti šiuolaikinio dizaino standartus.

## Decision

### 1. Architektūrinė Struktūra

```
src/
├── components/
│   ├── common/
│   │   ├── Modal/
│   │   │   ├── Modal.jsx
│   │   │   ├── Modal.css
│   │   │   └── index.js
│   │   └── Button/
│   └── auth/
│       ├── LoginModal/
│       │   ├── LoginModal.jsx
│       │   ├── LoginModal.css
│       │   ├── LoginModal.test.jsx
│       │   └── index.js
│       ├── LoginForm/
│       └── PasswordField/
├── hooks/
│   ├── useAuth.js
│   └── useForm.js
├── services/
│   └── authService.js
└── utils/
    └── validation.js
```

### 2. Techninės Specifikacijos

#### 2.1 Komponentai
- **Modal** - Bendrinis modalinio lango komponentas
- **LoginModal** - Specifinis prisijungimo modalas
- **LoginForm** - Forma su validacija
- **PasswordField** - Saugus slaptažodžio įvesties laukas

#### 2.2 Slaptažodžio Reikalavimai
- Minimali ilgis: 8 simboliai
- Būtina turėti:
  - Bent vieną didžiąją raidę
  - Bent vieną mažąją raidę
  - Bent vieną skaičių
  - Bent vieną specialų simbolį
- Slaptažodžio stiprumo indikatorius
- Slaptažodžio rodymo/slėpimo funkcija

#### 2.3 Validacija
- Email formato patikrinimas
- Realaus laiko validacija
- Aiškūs klaidų pranešimai

#### 2.4 UI/UX Sprendimai
- Tamsi/šviesi tema naudojant Tailwind CSS klases
- Modernūs šešėliai ir perėjimai
- Responsive dizainas
- Klaviatūros navigacija (Tab, Enter, Esc)
- Loading būsenos indikatoriai

```jsx
// Pavyzdys kaip naudoti Tailwind klases modale
const LoginModal = ({ isOpen, onClose }) => {
  return (
    <div className={`
      fixed inset-0 z-50 
      flex items-center justify-center 
      ${isOpen ? 'animate-fade-in' : 'hidden'}
    `}>
      <div className="
        absolute inset-0 
        bg-background-light/75 dark:bg-background-dark/75 
        backdrop-blur-sm
      "/>
      <div className="
        relative 
        w-full max-w-md 
        bg-background-light dark:bg-background-dark 
        rounded-lg shadow-xl 
        p-6 
        animate-slide-in
      ">
        <h2 className="
          text-2xl font-bold 
          text-gray-900 dark:text-white 
          mb-6
        ">
          Prisijungimas
        </h2>
        
        {/* Login forma */}
        <form className="space-y-4">
          <input 
            type="email" 
            className="
              w-full 
              px-4 py-2 
              border border-gray-300 dark:border-gray-600 
              rounded-lg 
              bg-white dark:bg-gray-800 
              text-gray-900 dark:text-white
              focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark 
              focus:border-transparent
            "
          />
          
          <button 
            type="submit" 
            className="
              w-full 
              px-4 py-2 
              bg-primary-light hover:bg-primary-DEFAULT dark:bg-primary-dark 
              text-white 
              rounded-lg 
              transition-colors 
              focus:ring-2 focus:ring-offset-2 focus:ring-primary-light
            "
          >
            Prisijungti
          </button>
        </form>
        
        {/* Nuorodos */}
        <div className="mt-4 flex justify-between text-sm">
          <a 
            href="#" 
            className="
              text-primary-light hover:text-primary-DEFAULT 
              dark:text-primary-dark dark:hover:text-primary-light
            "
          >
            Pamiršote slaptažodį?
          </a>
          <a 
            href="#" 
            className="
              text-primary-light hover:text-primary-DEFAULT 
              dark:text-primary-dark dark:hover:text-primary-light
            "
          >
            Registracija
          </a>
        </div>
      </div>
    </div>
  );
};
```

### Spalvų ir Animacijų Naudojimas

#### Spalvos
- Pagrindinė: 
  - Šviesi: `primary-light` (#6366f1)
  - Standartinė: `primary-DEFAULT` (#4f46e5)
  - Tamsi: `primary-dark` (#4338ca)
- Antrinė:
  - Šviesi: `secondary-light` (#f43f5e)
  - Standartinė: `secondary-DEFAULT` (#e11d48)
  - Tamsi: `secondary-dark` (#be123c)
- Fonas:
  - Šviesus: `background-light` (#ffffff)
  - Tamsus: `background-dark` (#0f172a)

#### Animacijos
- `animate-fade-in`: Sklandus elemento pasirodymas
- `animate-slide-in`: Elemento įslinkimas iš apačios

#### Šriftai
- Pagrindinis šriftas: 'Inter' su fallback į 'sans-serif'

### 3. Saugumo Priemonės
- HTTPS protokolo naudojimas
- Rate limiting prisijungimo bandymams
- Slaptažodžių hash'avimas su bcrypt
- JWT tokenų naudojimas su refresh mechanizmu

### 4. Vartotojo Keliai
1. **Prisijungimas:**
   - Email + slaptažodis
   - "Prisiminti mane" funkcija
   - Prisijungimo būsenos išsaugojimas

2. **Slaptažodžio atkūrimas:**
   - Email patvirtinimas
   - Saugus atkūrimo procesas
   - Laikinas slaptažodžio keitimo linkas

3. **Registracija:**
   - Email patvirtinimas
   - GDPR sutikimas

## Consequences

### Privalumai
- Vieninga prisijungimo patirtis
- Aukštas saugumo lygis
- Patogus UX
- Lengvas temų keitimas
- Modulinė struktūra lengvam plėtimui

### Trūkumai
- Papildomas kompleksiškumas dėl modalinio lango
- Papildomas validacijos logikos sluoksnis

## Implementation Notes

### 1. Bibliotekos
- React (^18.0.0)
- Formik arba React Hook Form
- Yup validacijai
- TailwindCSS stilizavimui
- React Icons ikonoms

### 2. Testavimas
- Unit testai komponentams
- Integraciniai testai formai
- E2E testai prisijungimo srautui

### 3. Stebėjimas
- Prisijungimo bandymų sekimas
- Klaidų registravimas
- Analytics įvykių sekimas

## References
- [OWASP Authentication Guidelines](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/04-Authentication_Testing)
- [NIST Password Guidelines](https://pages.nist.gov/800-63-3/sp800-63b.html)
- [React Modal Accessibility](https://reactjs.org/docs/accessibility.html#modals-and-keyboard-interactions)
