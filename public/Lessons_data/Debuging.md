# Mokymo medžiaga: Debugging in React

Ši mokymo medžiaga skirta padėti tau suprasti ir efektyviai ištaisyti klaidas React aplikacijose. Debugging nėra kažkas, ką galima ignoruoti – jei nori rašyti stabilų, profesionalų kodą, turi mokėti greitai rasti ir ištaisyti problemas. Nebijok priimti tiesos: tavo kodas visada gali būti geresnis, jei įsigilinsi į klaidų ieškojimą!

---

## Turinys

1. [Įžanga](#ižanga)
2. [Pagrindinės Debugging Technikos](#pagrindinės-debugging-technikos)
   - [Chrome DevTools ir Debugger](#chrome-devtools-ir-debugger)
   - [React Developer Tools](#react-developer-tools)
   - [Error Boundaries](#error-boundaries)
3. [Praktinės užduotys ir Pavyzdžiai](#praktinės-užduotys-ir-pavyzdžiai)
4. [Interaktyvios Užduotys](#interaktyvios-užduotys)
5. [Vertinimas ir Klausimynai](#vertinimas-ir-klausimynai)
6. [Išvados ir Tolimesni Žingsniai](#išvados-ir-tolimesni-žingsniai)

---

## Įžanga

### Kas yra Debugging?

Debugging – tai procesas, kurio metu analizuojame programos vykdymą, ieškome klaidų ir jas taisome. React, kaip moderni JavaScript biblioteka, suteikia daugybę galimybių, tačiau jei nesupranti, kur ieškoti problemos, gali netrukus prarasti laiko.

### Mokymosi Tikslai

- **Suprasti** pagrindinius debugging principus React kontekste.
- **Išmokti** naudoti įrankius, tokius kaip Chrome DevTools ir React Developer Tools.
- **Praktikuoti** problemų identifikavimą ir sprendimą realiuose pavyzdžiuose.
- **Įgyti** įgūdžių, kurie leis greitai ir efektyviai taisyti klaidas.

---

## Pagrindinės Debugging Technikos

### Chrome DevTools ir Debugger

Chrome DevTools yra tavo pagrindinis ginklas. 

- **Kodo sustabdymas:** Naudok `debugger;` įrašą savo kodo viduryje, kad sustabdytum vykdymą ir peržiūrėtum kintamųjų būseną.
- **Breakpoints:** Nustatyk sustabdymo taškus tiesiai per DevTools, kad galėtum žingsniuoti per kodą.
- **Console:** Naudok `console.log` ir kitas konsolės komandas – tai paprastas, bet veiksmingas būdas sekti kodo vykdymą.

**Pavyzdys:**

```jsx
function MyComponent({ count }) {
  console.log('Rendering MyComponent, count:', count);
  if (count > 10) {
    debugger; // Šis breakpoint padės tau pamatyti, kas vyksta kai count > 10
  }
  return <div>{count}</div>;
}
```

### React Developer Tools

Šis įrankis leidžia išsamiai stebėti React komponentų medį, jų props ir state.

- **Komponentų medžio analizė:** Sužinok, kaip komponentai tarpusavyje susiję.
- **Hooks stebėjimas:** Stebėk state ir efektus naudojančius hook’us.
- **Atnaujinimų vizualizavimas:** Matyk, kurie komponentai persikrauna ir kodėl.

### Error Boundaries

Error Boundaries – tai React komponentai, kurie fiksuoja klaidas žemiau esančiuose komponentuose ir leidžia valdyti klaidų pranešimus.

- **Naudojimas:** Apgaub komponentus, kuriuose gali kilti klaidų, kad išvengtum visos aplikacijos žlugimo.
- **Pavyzdys:**

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <h1>Kažkas negerai. Pabandykite vėl vėliau.</h1>;
    }
    return this.props.children;
  }
}
```

---

## Praktinės užduotys ir Pavyzdžiai

### Pavyzdys 1: Nepataisytas State Valdymo Klausimas

```jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    // Klaida: naudojamas ne teisingas atnaujinimo būdas
    setCount(count++);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

export default Counter;
```

**Užduotis:**  
- Identifikuok klaidą aukščiau pateiktame kode.
- Pataisyk `increment` funkciją, kad skaičius atnaujintųsi teisingai.

**Patarimas:**  
Nepamiršk, kad React state atnaujinimai turi būti imutuojami – nekoreguok tiesiogiai esamo kintamojo!

### Pavyzdys 2: Asinchroninis Duomenų Įkėlimas

```jsx
import React, { useState, useEffect } from 'react';

function DataLoader() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://api.example.com/data')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  if (!data) {
    return <p>Kraunama...</p>;
  }

  return (
    <div>
      <h2>Data:</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default DataLoader;
```

**Užduotis:**  
- Peržiūrėk, kaip tvarkoma asinchroninė klaidų situacija.
- Pridėk paprastą klaidų rodymo komponentą, jei užklausa nepavyksta.

---

## Interaktyvios Užduotys

### Užduotis 1: Kodo Analizė

**Klausimas:**  
Ką padarys `debugger;` įrašas React komponento viduryje?  
A) Sustabdys visą programos vykdymą.  
B) Atidarys naršyklės debugerį ties tašku, kur įrašytas `debugger;`.  
C) Pasirodys klaidos pranešimas konsolėje.

**Atsakymas:**  
Pasirink B.  

*Paaiškinimas:* Naudojant `debugger;` įrašą, vykdymas sustabdomas ir naršyklės debuggeris atidarys kontekstą, kuriame gali stebėti kintamuosius ir kodą.

### Užduotis 2: Kodo Klaidų Ieškojimas

Tavo užduotis – pataisyti žemiau pateiktą komponentą:

```jsx
function Greeting({ name }) {
  if (name = "") {
    return <p>Hello, stranger!</p>;
  }
  return <p>Hello, {name}!</p>;
}
```

**Užduotis:**  
- Rask ir pataisyk klaidą sąlygoje.
- Paaiškink, kodėl buvo klaida.

*Patarimas:* Atsimink, kad lygybės operatorius `==` arba `===` skirtas palyginimui, o `=` skirtas priskyrimui.

---

## Vertinimas ir Klausimynai

### Klausimynas

1. **Kas yra Error Boundary ir kada jis naudojamas?**
2. **Kaip teisingai naudoti `setState` arba `useState` atnaujinimus React?**
3. **Kodėl svarbu naudoti naršyklės debuggerį vietoj vien tik `console.log`?**
4. **Kokios problemos gali kilti, jei tiesiogiai modifikuojame state reikšmes?**

**Užduotis:**  
Parašyk trumpą esė (apie 200 žodžių) apie tai, kaip naudojai debugging įrankius sprendžiant realias problemas savo projektuose. Aptark, kokias klaidas radai ir kaip jas ištaisdei.

---

## Išvados ir Tolimesni Žingsniai

Debugging yra neatsiejama profesionalaus kūrėjo darbo dalis. Jei nesugebėsi greitai rasti ir ištaisyti klaidų, tavo projektai greitai pavirs chaosu. Nebijok eksperimentuoti su įvairiais įrankiais, o svarbiausia – praktikuok kiekvieną dieną.  
Tolimesni žingsniai:

- Gilinkis į React Developer Tools galimybes.
- Sek naujausias technologijų naujienas ir geriausias praktikas.
- Dalyvauk bendruomenės diskusijose, nes kiti kūrėjai gali parodyti naujus požiūrius į problemas.

**Paskutinis patarimas:**  
Nebijok pripažinti, kad kažkada suklysi. Kiekviena klaida – tai galimybė tobulėti ir rašyti dar geresnį kodą.
