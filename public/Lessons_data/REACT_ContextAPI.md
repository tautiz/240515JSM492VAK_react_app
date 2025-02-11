
# React Context API – Viskas, ką reikia žinoti

Ši medžiaga paaiškina, kaip ir kada naudoti React Context API, kad išvengtumėte props perdavimo ("prop drilling") problemų, kaip centralizuotai dalintis duomenimis bei kaip optimizuoti aplikacijų našumą. Be to, pateikiami realaus gyvenimo pavyzdžiai – autentifikacijos, temos keitimo, lokalizacijos ir net sudėtingesnių būsenos valdymo scenarijų atvejai.

---

## Turinys

1. [Įvadas](#įvadas)
2. [Kas yra React Context API?](#kas-yra-react-context-api)
3. [Problema: Props Drilling](#problema-props-drilling)
4. [Context API panaudojimas: pagrindinis pavyzdys](#context-api-panaudojimas-pagrindinis-pavyzdys)
5. [Realiosios praktikos pavyzdžiai](#realiosios-praktikos-pavyzdžiai)
    - [Autentifikacijos valdymas (AuthContext)](#autentifikacijos-valdymas-authcontext)
    - [Lokalizacijos valdymas (LocaleContext)](#lokalizacijos-valdymas-localecontext)
    - [Temų keitimas (ThemeContext)](#temų-keitimas-themecontext)
6. [Optimizacijos: useMemo ir useCallback](#optimizacijos-usememo-ir-usecallback)
7. [Kada nenaudoti Context API?](#kada-nenaudoti-context-api)
8. [Išvados ir testai](#išvados-ir-testai)

---

## Įvadas

React Context API – tai įrankis, skirtas bendrų duomenų perdavimui per komponentų medį, be būtinybės kiekviename lygyje perduoti props'us. Tai ypač naudinga tais atvejais, kai daug komponentų turi pasiekti tą patį globalų duomenų rinkinį, pvz., vartotojo autentifikacijos informaciją, temos nustatymus ar kalbos pasirinkimus.

*Pastaba:* Nereikia pamiršti – nors Context API yra labai galinga, ji nėra stebuklinga visų problemų sprendėja. Jei aplikacija yra maža arba duomenys keičiasi labai dažnai, paprastas props perdavimas gali būti pakankamas. (Pagal freeCodeCamp straipsnį citeturn0search4 ir LogRocket blog'ą citeturn0search1)

---

## Kas yra React Context API?

React Context API leidžia sukurti "globalų" duomenų saugyklą, prie kurios gali prisijungti bet kuris komponentas, nesvarbu, kiek giliame medyje jis yra. Tai atliekama sukuriant kontekstą su `React.createContext()` ir panaudojant:
- **Provider** – apgaubia komponentų medį ir nurodo, kokia vertė turi būti dalijamasi.
- **Consumer** arba **useContext** kabliuką – leidžia bet kuriam vaikiniam komponentui gauti tą dalinamą vertę.

---

## Problema: Props Drilling

Įsivaizduokite situaciją, kai turite gilią komponentų struktūrą, pvz.:

```jsx
// App.js
function App() {
  const user = { name: "Jonas", avatar: "avatar.jpg" };
  return <Profile user={user} />;
}

// Profile.js
function Profile({ user }) {
  return <Avatar user={user} />;
}

// Avatar.js
function Avatar({ user }) {
  return <img src={user.avatar} alt={user.name} />;
}
```

Čia „user“ objektas perduodamas per kelis tarpininkus, nors tik galutinis komponentas Avatar jį naudoja. Šis reiškinys vadinamas *props drilling* ir gali tapti labai painus, kai komponentų medis tampa sudėtingas.

---

## Context API panaudojimas: pagrindinis pavyzdys

Norėdami išvengti props perdavimo, galime naudoti Context API. Štai paprastas pavyzdys, kaip perduoti „user“ duomenis:

### 1. Sukurkite Context

```jsx
// UserContext.js
import React from 'react';

const UserContext = React.createContext(null); // pradinis vertė – null arba pradinis objektas
export default UserContext;
```

### 2. Pateikite duomenis per Provider

```jsx
// App.js
import React from 'react';
import UserContext from './UserContext';
import Profile from './Profile';

function App() {
  const user = { name: "Jonas", avatar: "avatar.jpg" };

  return (
    <UserContext.Provider value={user}>
      <Profile />
    </UserContext.Provider>
  );
}

export default App;
```

### 3. Naudokite duomenis su useContext

```jsx
// Avatar.js
import React, { useContext } from 'react';
import UserContext from './UserContext';

function Avatar() {
  const user = useContext(UserContext);
  return <img src={user.avatar} alt={user.name} />;
}

export default Avatar;
```

Dabar komponentas *Avatar* tiesiogiai gauna „user“ duomenis be tarpinio props perdavimo.

---

## Realiosios praktikos pavyzdžiai

### Autentifikacijos valdymas (AuthContext)

Šiame pavyzdyje valdoma vartotojo autentifikacijos būsena. Tai leidžia visoje aplikacijoje gauti prisijungusio vartotojo informaciją ir funkcijas prisijungimui/atsijungimui.

```jsx
// AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    // Čia realioje aplikacijoje reikėtų integruoti API užklausą
    setUser({ name: username });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
```

**Naudojimas:**

```jsx
// UserProfile.js
import React from 'react';
import { useAuth } from './AuthContext';

function UserProfile() {
  const { user, logout } = useAuth();

  if (!user) return <div>Vartotojas neprisijungęs</div>;

  return (
    <div>
      <p>Sveiki, {user.name}!</p>
      <button onClick={logout}>Atsijungti</button>
    </div>
  );
}

export default UserProfile;
```

---

### Lokalizacijos valdymas (LocaleContext)

Naudojant kontekstą galima lengvai valdyti kalbų pasirinkimą visoje aplikacijoje.

```jsx
// LocaleContext.js
import React, { createContext, useState, useContext } from 'react';

const LocaleContext = createContext();

export function LocaleProvider({ children }) {
  const [locale, setLocale] = useState('lt');

  const switchLocale = (newLocale) => setLocale(newLocale);

  return (
    <LocaleContext.Provider value={{ locale, switchLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
```

**Naudojimas:**

```jsx
// Greeting.js
import React from 'react';
import { useLocale } from './LocaleContext';

function Greeting() {
  const { locale } = useLocale();

  const greetings = {
    lt: 'Sveiki atvykę',
    en: 'Welcome',
    es: 'Bienvenido'
  };

  return <h1>{greetings[locale] || 'Welcome'}</h1>;
}

export default Greeting;
```

---

### Temų keitimas (ThemeContext)

Temos keitimas – vienas iš populiariausių Context API panaudojimo atvejų. Pateikiame pavyzdį, kaip valdoma šviesios ir tamsios temos per kontekstą.

```jsx
// ThemeContext.js
import React, { createContext, useState, useContext, useCallback } from 'react';

const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  // Naudojame useCallback, kad toggleTheme nebūtų perskaičiuojamas kiekvieną kartą
  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
```

**Naudojimas:**

```jsx
// Header.js
import React, { useContext } from 'react';
import { useTheme } from './ThemeContext';

function Header() {
  const { theme, toggleTheme } = useTheme();

  const headerStyle = {
    backgroundColor: theme === 'light' ? '#fff' : '#333',
    color: theme === 'light' ? '#000' : '#fff',
    padding: '20px',
    textAlign: 'center'
  };

  return (
    <header style={headerStyle}>
      <h1>Mano Aplikacija</h1>
      <button onClick={toggleTheme}>Pakeisti temą</button>
    </header>
  );
}

export default Header;
```

---

## Optimizacijos: useMemo ir useCallback

Kai Context API naudojamas, kiekvienas jo atnaujinimas priverčia perskaičiuoti visus vartotojus. Norint sumažinti nereikalingus perrenderinimus, rekomenduojama:
- **useMemo:** memoizuoja konteksto vertę, kad ji nesikeistų be būtinybės.
- **useCallback:** užtikrina, kad funkcijos, perduodamos per kontekstą, būtų stabilios.

Pavyzdžiui, kaip pademonstruota aukščiau ThemeContext pavyzdyje – toggleTheme funkcija yra užvibeliama su useCallback, todėl jos nuoroda nesikeičia kiekvieną renderį.

---

## Kada nenaudoti Context API?

Nors Context API yra puikus sprendimas daugeliui situacijų, yra atvejų, kai jo nenaudojimas gali būti išmintingesnis:
- **Dažni atnaujinimai:** Jei konteksto vertė keičiasi labai dažnai (pvz., realaus laiko duomenys), visi vartotojai bus perskaičiuojami. Tokiu atveju verta rinktis specializuotas būsenos valdymo bibliotekas (pvz., Redux, Zustand).
- **Maži komponentų medžiai:** Jei komponentų struktūra nėra gili, paprastas props perdavimas gali būti suprantamesnis ir lengviau prižiūrimas.
- **Atskirų logikų atskyrimas:** Kartais logika gali būti lengviau išskaidyta į kelis atskirus kontekstus ar net naudoti paprastą komponentų vietinę būseną.

---

## Išvados ir testai

### Apibendrinimas

- **React Context API** leidžia centralizuotai dalintis duomenimis visoje aplikacijoje ir išvengti props drilling problemų.
- **Realiosios praktikos pavyzdžiai:** autentifikacija, lokalizacija, temos keitimas – visi šie pavyzdžiai parodo, kaip Context API gali padėti struktūruoti ir supaprastinti aplikacijos būsenos valdymą.
- **Optimizacijos:** naudokite useMemo ir useCallback, kad sumažintumėte nereikalingus perrenderinimus.

### Klausimai savarankiškam tikrinimui

1. **Kuo skiriasi props drilling nuo Context API panaudojimo?**
2. **Kaip `useContext` padeda išvengti props perdavimo?**
3. **Kada verta rinktis Redux ar kitas būsenos valdymo bibliotekas vietoje Context API?**
4. **Kaip optimizuoti Context API naudojimą didelėse aplikacijose?**

---

## Išvada

React Context API – tai galingas, bet kartais pervertintas įrankis. Naudokite jį protingai: jei duomenys yra bendri ir nereikia dažnai atnaujinti, Context API padeda išlaikyti kodą švarų ir lengvai prižiūrimą. Tačiau, jei aplikacijoje yra sudėtinga logika ir duomenų atnaujinimai vyksta labai dažnai, apsvarstykite alternatyvas. Pasakysiu tiesiai – nesistenkite viską spręsti su viena technologija: pasirinkite įrankį, kuris geriausiai atitinka jūsų projekto poreikius.
