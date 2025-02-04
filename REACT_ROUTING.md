Žemiau pateikiama išsami **React Router** mokymų programa, kurioje pateikiama teorinė informacija, pavyzdžiai, geriausios praktikos ir realaus projekto demonstracija.

---

# React Router Mokymų Programa

Ši programa padės suprasti, kaip veikia navigacija su **React Router**, kaip kurti dinamiškus maršrutus ir kaip praktiškai sukurti kelių puslapių aplikaciją.

---

## 1. Įvadas į React Router

### Kas yra React Router?
- **React Router** – tai populiari biblioteka, skirta kurti vieno puslapio (SPA) aplikacijas su dinamiška navigacija.
- Leidžia deklaratyviai aprašyti maršrutus, nesudėtingai integruojasi su React, o aplikacija neužkrauna puslapio iš naujo keičiantis turiniui.

### Kada naudoti React Router?
- Kurdami didesnes ir sudėtingesnes aplikacijas, kuriose yra keletas puslapių ar komponentų, kurių turinys priklauso nuo URL.
- Kai reikia dinamiškai rodyti turinį pagal URL parametrus, pvz., naudotojo profiliai, produktų detalės ir pan.

---

## 2. Teorija: Navigacija su React Router

### Pagrindiniai komponentai:
- **BrowserRouter** – aukščiausio lygio komponentas, kuris turi apgaubti visą jūsų aplikaciją. Naudoja HTML5 istorijos API, kad tvarkytų URL.
- **Routes** ir **Route** – naudojami deklaratyviai aprašyti, kurie komponentai turi būti rodomi priklausomai nuo URL.
- **Link** ir **NavLink** – naudojami navigacijai tarp maršrutų be puslapio perkrovimo.
- **useNavigate** – hook, leidžiantis programiškai pereiti į kitą maršrutą (pvz., po formos pateikimo).

### Dinaminiai maršrutai:
- Naudojami, kai URL dalis yra kintama, pvz., `/user/:id` ar `/product/:productId`.
- **useParams** hook padeda išgauti parametrus iš URL, kad būtų galima dinamiškai renderinti turinį.

---

## 3. Geriausios praktikos naudojant React Router

- **Struktūrizuokite komponentus:** Laikykite maršrutus ir navigacijos komponentus atskirai nuo kitų puslapių, kad kodas būtų aiškus ir lengvai prižiūrimas.
- **Nested Routes:** Naudokite įdėtus maršrutus, kai turite sub-komponentus, priklausančius nuo pagrindinio puslapio.
- **Code Splitting:** Naudokite `React.lazy` ir `Suspense`, kad iškraipytumėte didelius modulius ir sumažintumėte pradinių failų dydį.
- **Apsauga ir autorizacija:** Kurkite apsaugotus maršrutus (private routes) tikrinimui, ar vartotojas turi teisę pasiekti tam tikrą puslapį.
- **Declarative approach:** Rašykite maršrutus deklaratyviai, kad aiškiai matytumėte, kuris URL rodo kurį komponentą.

---

## 4. Praktinė dalis: Kelių puslapių aplikacijos kūrimas su navigacija

### Projekto struktūra
Pavyzdinė projekto struktūra gali atrodyti taip:

```
my-react-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── Navbar.js
│   ├── pages/
│   │   ├── Home.js
│   │   ├── About.js
│   │   ├── Contact.js
│   │   └── UserPage.js
│   ├── App.js
│   └── index.js
└── package.json
```

### 4.1. Priklausomybių įdiegimas
Pirmiausia, įdiekite `react-router-dom`:

```bash
npm install react-router-dom
```

### 4.2. Projekto failų pavyzdžiai

#### **index.js**
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

#### **App.js**
```jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import UserPage from './pages/UserPage';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        {/* Pagrindiniai puslapiai */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* Dinaminis maršrutas */}
        <Route path="/user/:id" element={<UserPage />} />
      </Routes>
    </div>
  );
};

export default App;
```

#### **components/Navbar.js**
```jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const activeStyle = {
    fontWeight: 'bold',
    textDecoration: 'underline'
  };

  return (
    <nav>
      <ul>
        <li><NavLink to="/" end style={({ isActive }) => isActive ? activeStyle : undefined}>Home</NavLink></li>
        <li><NavLink to="/about" style={({ isActive }) => isActive ? activeStyle : undefined}>About</NavLink></li>
        <li><NavLink to="/contact" style={({ isActive }) => isActive ? activeStyle : undefined}>Contact</NavLink></li>
        <li><NavLink to="/user/1" style={({ isActive }) => isActive ? activeStyle : undefined}>User 1</NavLink></li>
        <li><NavLink to="/user/2" style={({ isActive }) => isActive ? activeStyle : undefined}>User 2</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;
```

#### **pages/Home.js**
```jsx
import React from 'react';

const Home = () => {
  return (
    <div>
      <h2>Home Page</h2>
      <p>Sveiki atvykę į mūsų pagrindinį puslapį!</p>
    </div>
  );
};

export default Home;
```

#### **pages/About.js**
```jsx
import React from 'react';

const About = () => {
  return (
    <div>
      <h2>About Page</h2>
      <p>Sužinokite daugiau apie mūsų aplikaciją ir komandą.</p>
    </div>
  );
};

export default About;
```

#### **pages/Contact.js**
```jsx
import React from 'react';

const Contact = () => {
  return (
    <div>
      <h2>Contact Page</h2>
      <p>Susisiekite su mumis dėl bet kokių klausimų ar pasiūlymų.</p>
    </div>
  );
};

export default Contact;
```

#### **pages/UserPage.js**
```jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const UserPage = () => {
  // Iš URL ištraukiamas dinaminis parametras "id"
  const { id } = useParams();

  return (
    <div>
      <h2>User Page</h2>
      <p>Rodymas informacijos apie vartotoją su ID: {id}</p>
    </div>
  );
};

export default UserPage;
```

### 4.3. Dinaminio maršruto paaiškinimas
- **Dinaminis maršrutas**: `/user/:id` leidžia rodyti skirtingą turinį priklausomai nuo perduoto parametro. Pvz., `/user/1` ir `/user/2` rodo skirtingus naudotojų duomenis.
- **useParams** hook išgauna `id` iš URL, kurį galima panaudoti komponento viduje (pvz., duomenų užklausai iš serverio).

---

## 5. Išplėstinės temos ir patarimai

### Programinė navigacija
Naudokite `useNavigate` hook, kad programiškai nukreiptumėte vartotoją, pavyzdžiui, po sėkmingos formos pateikimo:

```jsx
import { useNavigate } from 'react-router-dom';

const SomeComponent = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Atlikite formos duomenų validaciją arba API kvietimą
    navigate('/about'); // Nukreipia į About puslapį
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  );
};
```

### Nested Routes (Įdėti maršrutai)
Jei turite puslapį, kuriame yra sub-komponentai, naudokite nested routes:

```jsx
// ParentComponent.js
import { Outlet, NavLink } from 'react-router-dom';

const ParentComponent = () => (
  <div>
    <nav>
      <NavLink to="child1">Child 1</NavLink>
      <NavLink to="child2">Child 2</NavLink>
    </nav>
    <Outlet /> {/* Čia bus renderinami sub-maršrutų komponentai */}
  </div>
);

export default ParentComponent;
```

Nested routes pavyzdys **App.js** faile:
```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/parent" element={<ParentComponent />}>
    <Route path="child1" element={<Child1 />} />
    <Route path="child2" element={<Child2 />} />
  </Route>
</Routes>
```

---

## 6. Apibendrinimas

- **React Router** leidžia kurti sklandžią navigaciją vieno puslapio aplikacijose be puslapio perkrovimų.
- **Dinaminiai maršrutai** suteikia lankstumo rodyti turinį, priklausomai nuo URL parametrų.
- **Geriausios praktikos** (nested routes, code splitting, programinė navigacija) padeda sukurti prižiūrimą ir efektyvią aplikaciją.
- Praktinėje dalyje pademonstruotas kelių puslapių aplikacijos kūrimas parodo, kaip integruoti visus šiuos principus realiame projekte.

Eksperimentuokite su pateiktais pavyzdžiais, pridėkite papildomų funkcijų (pvz., autentifikaciją, klaidų puslapius) ir gilinkitės į sudėtingesnes temas, tokias kaip animacijos ar URL parametrų validacija. Nepamirškite – geriausi sprendimai dažnai gimsta iš realių projektų problemų sprendimo!

---

Sėkmės kuriant ir tobulinant savo React Router aplikacijas!