Toliau pateikiama papildoma pamokos medžiaga, kuri išplėstų jūsų žinias apie Advanced React Routing. Ši medžiaga apima kelis svarbius aspektus – nuo apsaugotų maršrutų, dinamiško maršrutų generavimo ir nested (įdėtų) maršrutų iki lazy loading, animacijų bei klaidų tvarkymo. Aptarsime, kaip šie metodai yra panaudojami realiuose projektuose, pavyzdžiui, sudėtinguose administraciniuose dashboard'uose, e-komercijos platformose ir turinio valdymo sistemose.

---

## Advanced React Routing: Išplėstinės Temos

### 1. Apsaugoti Maršrutai (Protected Routes)

**Aprašymas:**  
Realiuose projektuose, pavyzdžiui, administravimo panelėse ar asmeniniuose profiliuose, būtina užtikrinti, kad tik autorizuoti vartotojai turėtų prieigą prie tam tikrų puslapių. Tam sukuriama speciali komponentų sistema, kuri patikrina vartotojo autentifikacijos būseną prieš leidžiant pasiekti apsaugotą turinį.

**Pavyzdys:**

```jsx
// useAuth.js – custom hook, tikrinantis autentifikaciją
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

export const useAuth = () => {
  return useContext(AuthContext);
};
```

```jsx
// AuthContext.js
import React, { createContext, useState } from 'react';

// Sukuriame AuthContext su numatytomis reikšmėmis
export const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {}
});

// AuthProvider komponentas – dalinasi autentifikacijos būsena su vaikų komponentais
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Prisijungimo funkcija – realiuose projektuose čia gali būti API užklausa
  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  // Atsijungimo funkcija – išvalo autentifikacijos informaciją
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
```

```jsx
// PrivateRoute.js – apsaugotas maršrutas
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './useAuth';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
```

**Naudojimas App.js faile:**

```jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import PrivateRoute from './PrivateRoute';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default App;
```

**Realiame gyvenime:**  
Apsaugoti maršrutai yra būtini, kai kuriate banko sistemas, medicinos aplikacijas ar bet kokius projektus, kur vartotojų duomenys yra jautrūs. Jie padeda išvengti neleistinos prieigos ir užtikrina, kad vartotojai pamatys tik tai, kas jiems leidžiama.

---

### 2. Nested (Įdėti) Maršrutai

**Aprašymas:**  
Įdėti maršrutai leidžia organizuoti aplikacijos struktūrą hierarchiškai. Pavyzdžiui, turinio valdymo sistemoje turite pagrindinį puslapį, kuriame yra sub-sistemų meniu – kiekviena sistema gali turėti savo puslapius, kuriuos lengva išdėstyti naudojant nested routes.

**Pavyzdys:**

```jsx
// ParentLayout.js – pagrindinis layout'as su įdėtais maršrutais
import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

const ParentLayout = () => {
  return (
    <div>
      <nav>
        <NavLink to="overview">Overview</NavLink>
        <NavLink to="details">Details</NavLink>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default ParentLayout;
```

```jsx
// App.js – nested routes konfigūracija
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ParentLayout from './layouts/ParentLayout';
import Overview from './pages/Overview';
import Details from './pages/Details';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/section" element={<ParentLayout />}>
        <Route path="overview" element={<Overview />} />
        <Route path="details" element={<Details />} />
      </Route>
    </Routes>
  );
};

export default App;
```

**Realiame gyvenime:**  
Nested maršrutai ypač naudingi kuriant sudėtingas aplikacijas, tokias kaip el. prekybos svetainės, kur reikia skirtingų kategorijų, subkategorijų bei produktų puslapių. Tai padeda lengviau valdyti bendrą UI išdėstymą.

---

### 3. Dinaminis Maršrutų Generavimas

**Aprašymas:**  
Dinaminiai maršrutai leidžia kurti maršrutus, kurie priklauso nuo kintamų duomenų, pvz., vartotojų ID, produktų ID ar straipsnių slug. Tai ypač svarbu, kai turite didelį turinį, gautą iš API.

**Pavyzdys:**

```jsx
// UserProfile.js – dinaminis maršrutas su parametru :userId
import React from 'react';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
  const { userId } = useParams();

  // Tarkime, kad čia būtų API užklausa, gauta vartotojo informacija
  return (
    <div>
      <h2>Vartotojo profilis</h2>
      <p>Vartotojo ID: {userId}</p>
    </div>
  );
};

export default UserProfile;
```

```jsx
// App.js – dinaminis maršrutas
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserProfile from './pages/UserProfile';

const App = () => {
  return (
    <Routes>
      <Route path="/user/:userId" element={<UserProfile />} />
    </Routes>
  );
};

export default App;
```

**Realiame gyvenime:**  
Dinaminiai maršrutai yra būtini socialiniuose tinkluose, e-komercijos platformose ar naujienų portaluose, kur kiekvienas vartotojas ar produktas turi unikalų identifikatorių.

---

### 4. Lazy Loading ir Code Splitting

**Aprašymas:**  
Lazy loading leidžia iškraipyti aplikacijos našumą, kraunant komponentus tik tada, kai jie iš tikrųjų reikalingi. Tai ypač svarbu didelėse aplikacijose, kur pradinio bundle dydis gali būti labai didelis.

**Pavyzdys:**

```jsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

const App = () => {
  return (
    <Suspense fallback={<div>Kraunama...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Suspense>
  );
};

export default App;
```

**Realiame gyvenime:**  
Lazy loading naudojamas moderniose aplikacijose, ypač mobiliuosiuose projektuose ir dideliuose portalų tinkluose, siekiant sumažinti pradinio įkrovimo laiką ir pagerinti vartotojo patirtį.

---

### 5. Maršrutų Animacijos ir Perėjimai

**Aprašymas:**  
Animacijos tarp maršrutų keitimo suteikia sklandesnę ir labiau interaktyvią vartotojo patirtį. Su biblioteka, pvz., React Transition Group, galite lengvai pritaikyti perėjimo efektus.

**Pavyzdys:**

```jsx
// AnimationsWrapper.js – naudojant React Transition Group
import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useLocation, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';

const AnimationsWrapper = () => {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition key={location.pathname} classNames="fade" timeout={300}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default AnimationsWrapper;
```

Papildomai pridėkite CSS efektus:

```css
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  opacity: 1;
  transition: opacity 300ms;
}
.fade-exit {
  opacity: 1;
}
.fade-exit-active {
  opacity: 0;
  transition: opacity 300ms;
}
```

**Realiame gyvenime:**  
Animacijos naudojamos, kai norima pabrėžti sklandų navigacijos perėjimą, pvz., turinio svetainėse ar interaktyviuose žemėlapiuose, kur vartotojo patirtis turi būti kuo malonesnė.

---

### 6. Klaidų Tvarkymas Maršrutuose

**Aprašymas:**  
Net ir gerai suplanuotose aplikacijose gali kilti klaidų. Naudojant Error Boundaries kartu su maršrutais, galite efektyviai tvarkyti netikėtas klaidas ir rodyti tinkamus pranešimus vartotojui.

**Pavyzdys:**

```jsx
// ErrorBoundary.js – klasės komponentas, gaudantis klaidas
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, info) {
    // Galima išsiųsti klaidos log'us į serverį
    console.error("Klaida: ", error, info);
  }
  
  render() {
    if (this.state.hasError) {
      return <h2>Kažkas nepavyko. Bandykite vėliau.</h2>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
```

Naudojimas maršrutų konfigūracijoje:

```jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default App;
```

**Realiame gyvenime:**  
Klaidos tvarkymas yra būtinas produktų, kuriuose svarbi stabilumo ir vartotojo pasitikėjimo išlaikymas, pavyzdžiui, finansinėse ar sveikatos priežiūros sistemose.

---

## Išvada

Advanced React Routing ne tik suteikia papildomų galimybių organizuoti aplikacijos struktūrą, bet ir leidžia kurti saugesnes, našesnes bei labiau interaktyvias sistemas. Toliau pateikti pavyzdžiai rodo, kaip:
- **Apsaugoti maršrutai** užtikrina, kad jautri informacija būtų pasiekiama tik autentifikuoti vartotojai.
- **Nested ir dinaminiai maršrutai** padeda kurti hierarchiškas struktūras, lengvai pritaikomas prie didelio turinio.
- **Lazy loading** ir **animacijos** pagerina vartotojo patirtį, sumažinant įkrovimo laiką ir suteikiant sklandžius perėjimus.
- **Error Boundaries** padeda valdyti netikėtas klaidas ir išlaikyti aplikacijos stabilumą.

Realiuose projektuose tokie sprendimai yra būtini norint kurti profesionalias sistemas, kuriose svarbu saugumas, našumas ir vartotojo patirtis. Rekomenduoju gilintis į kiekvieną iš šių temų, eksperimentuoti su pavyzdžiais ir integruoti šiuos metodus į savo projektus – tai padės tapti tikru React specialistu ir suteiks pranašumą kuriant sudėtingas, modernias aplikacijas.