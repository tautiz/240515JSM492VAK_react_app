# Unit Testavimo Vadovas

## Turinys

1. [Įvadas](#įvadas)
2. [Testavimo metodologijos](#testavimo-metodologijos)
3. [Testavimo bibliotekos ir įrankiai](#testavimo-bibliotekos-ir-%C4%AFrankiai)
4. [Unit testų rašymo principai](#unit-test%C5%B3-ra%C5%A1ymo-principai)
5. [Kodo pavyzdžiai su Jest](#kodo-pavyzd%C5%BEiai-su-jest)
6. [Praktinės užduotys ir interaktyvūs pratimai](#praktin%C4%97s-%C5%BEduotys-ir-interaktyv%C5%ABs-pratimai)
7. [Vertinimas ir apibendrinimas](#vertinimas-ir-apibendrinimas)

---

# 1. Įvadas

## 1.1. Kursų tikslai

- **Suprasti testavimo svarbą:** Kodėl testavimas yra būtinas norint užtikrinti programos kokybę ir patikimumą.
- **Išmokti rašyti unit testus:** Pradedant nuo paprastų pavyzdžių iki pažangesnių atvejų.
- **Įsisavinti gerąsias praktikas:** Kaip struktūruoti testus, kokias bibliotekas naudoti ir kaip kurti tvirtą testavimo aplinką.
- **Praktinės užduotys:** Įgauti praktinių įgūdžių, rašant ir paleidžiant testus naudojant populiarias JavaScript testavimo bibliotekas.

## 1.2. Kas yra testavimas?

**Testavimas** yra procesas, padedantis patikrinti, ar parašytas kodas veikia taip, kaip tikėtasi. Pagrindiniai testų tipai:

- **Unit testai:** Testuoja atskiras kodo vienetus (funkcijas, klases, modulius) izoliuotai.
- **Integraciniai testai:** Tikrina, kaip skirtingi kodo komponentai veikia kartu.
- **End-to-end (E2E) testai:** Simuliuoja realaus vartotojo veiksmus visoje sistemoje.

---

# 2. Testavimo metodologijos

## 2.1. TDD (Test Driven Development)

TDD yra programavimo metodologija, kai testai rašomi prieš rašant patį kodą. TDD ciklas susideda iš trijų žingsnių:

1. **Red** - Parašome testą, kuris nepraeina
2. **Green** - Parašome minimalų kodo kiekį, kad testas praeitų
3. **Refactor** - Pageriname kodo kokybę, išlaikydami testų praėjimą

### 2.1.1. TDD pavyzdys

```javascript
// 1. Red - Pirma parašome testą
test('sudėti du skaičius', () => {
  expect(add(2, 3)).toBe(5);
}); // Testas nepraeis, nes funkcijos dar nėra

// 2. Green - Parašome minimalų kodą
function add(a, b) {
  return a + b;
}

// 3. Refactor - Jei reikia, pageriname kodą
function add(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Argumentai turi būti skaičiai');
  }
  return a + b;
}
```

## 2.2. BDD (Behavior Driven Development)

BDD yra TDD praplėtimas, kuris koncentruojasi į sistemos elgsenos aprašymą verslo terminais. BDD testai rašomi naudojant "Given-When-Then" formatą:

- **Given** - pradinė situacija
- **When** - veiksmas
- **Then** - laukiamas rezultatas

### 2.2.1. BDD pavyzdys

```javascript
describe('Bankomato pinigų išėmimas', () => {
  // Given
  const account = new Account();
  account.deposit(1000);

  test('sėkmingas pinigų išėmimas', () => {
    // When
    const result = account.withdraw(500);

    // Then
    expect(result.success).toBe(true);
    expect(account.balance).toBe(500);
  });

  test('nepakankamas likutis', () => {
    // Given
    const account = new Account(100);

    // When
    const result = account.withdraw(500);

    // Then
    expect(result.success).toBe(false);
    expect(result.message).toBe('Nepakankamas likutis');
    expect(account.balance).toBe(100);
  });
});
```

## 2.3. TDD ir BDD palyginimas

| TDD | BDD |
|-----|-----|
| Koncentruojasi į techninius aspektus | Koncentruojasi į verslo poreikius |
| Rašoma programuotojų kalba | Rašoma verslo kalba |
| Testuoja kodo vienetus | Testuoja sistemos elgseną |
| Padeda užtikrinti kodo kokybę | Padeda užtikrinti, kad sistema atitinka verslo poreikius |

### 2.3.1. Kada ką naudoti?

- **TDD** geriau tinka:
  - Rašant žemo lygio komponentus
  - Kai reikia užtikrinti techninę kokybę
  - Programuotojų komandoje

- **BDD** geriau tinka:
  - Rašant aukšto lygio funkcionalumą
  - Kai reikia aiškios komunikacijos su verslu
  - Mišriose komandose (programuotojai, analitikai, verslo atstovai)

---

# 3. Testavimo bibliotekos ir įrankiai

Šiuo metu populiariausios JavaScript testavimo bibliotekos yra:

- **Jest:** Labai populiarus ir lengvai naudojamas testavimo framework, ypač React aplikacijoms.
- **Mocha:** Lanksti ir išplėtota testavimo biblioteka, kuri dažnai derinama su Chai (assertion biblioteka).
- **AVA:** Paprasta ir greita testavimo sistema, tinkama mažoms programoms.

**Rekomendacija:** Pradedantiesiems rekomenduojama pasirinkti **Jest**, nes jis turi daug integruotų funkcijų (pvz., „mocking“, „snapshot testing“) ir puikų dokumentavimą.

## 3.1. Bibliotekų diegimas

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom jest
```

## 3.2. Pagrindinės bibliotekos

- **Jest:** Labai populiarus ir lengvai naudojamas testavimo framework, ypač React aplikacijoms.
- **Mocha:** Lanksti ir išplėtota testavimo biblioteka, kuri dažnai derinama su Chai (assertion biblioteka).
- **AVA:** Paprasta ir greita testavimo sistema, tinkama mažoms programoms.

---

# 4. Unit testų rašymo principai

## 4.1. Kas yra unit testai?

**Unit testai** yra smulkūs, izoliuoti testai, tikrinantys atskirų funkcijų arba metodų veikimą. Jie padeda:

- Užtikrinti, kad kiekviena kodo dalis veikia pagal lūkesčius.
- Greitai aptikti klaidas ankstyvoje kūrimo stadijoje.
- Suteikti pasitikėjimą atliekant refaktoringą.

## 4.2. Gerosios praktikos rašant unit testus

- **Vienareikšmiai testai:** Kiekvienas testas turėtų tik vieną tikslą.
- **Atskiros priklausomybės:** Naudokite „mocking“ arba „stubbing“ technikas, kad išvengtumėte priklausomybių nuo išorinių resursų.
- **Aiškus pavadinimas:** Testų pavadinimai turi aprašyti, ką tikrinti.
- **Paprasta struktūra:** Naudokite `describe` ir `it` funkcijas (Jest, Mocha) norint suskirstyti testus į logiškas grupes.
- **Reguliarus vykdymas:** Automatizuokite testų vykdymą, kad kiekviena kodo pakeitimo versija būtų patikrinta.

---

# 5. Kodo pavyzdžiai su Jest

Toliau pateikiami paprasti pavyzdžiai, kaip rašyti unit testus naudojant Jest.

## 5.1. Projekto konfigūracija

**1. Inicijuokite npm projektą:**

```bash
npm init -y
```

**2. Įdiekite Jest:**

```bash
npm install --save-dev jest
```

**3. Atitinkamai atnaujinkite `package.json`:**

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

## 5.2. Paprasto funkcijos testas

### 5.2.1. Funkcijos aprašymas

Sukurkime paprastą funkciją, kuri susumuoja du skaičius.

**failas: `sum.js`**

```javascript
function sum(a, b) {
  return a + b;
}

module.exports = sum;
```

### 5.2.2. Testo rašymas

Sukurkime testą, patikrinantį `sum` funkcijos veikimą.

**failas: `sum.test.js`**

```javascript
const sum = require('./sum');

test('prideda 1 + 2 ir gauname 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

### 5.2.3. Testų paleidimas

Paleiskite testus terminale:

```bash
npm test
```

Jeigu viskas sukonfigūruota teisingai, turėtumėte pamatyti, kad testas praėjo.

## 5.3. Pažangesnis pavyzdys – Asinchroninis kodas

### 5.3.1. Funkcijos aprašymas

Sukurkime asinchroninę funkciją, kuri grąžina duomenis po tam tikro laiko.

**failas: `fetchData.js`**

```javascript
function fetchData(callback) {
  setTimeout(() => {
    callback('duomenys');
  }, 1000);
}

module.exports = fetchData;
```

### 5.3.2. Testo rašymas

Naudosime Jest „done“ callbacką, kad tinkamai apdorotume asinchroninį testavimą.

**failas: `fetchData.test.js`**

```javascript
const fetchData = require('./fetchData');

test('gauti duomenys asinchroniškai', done => {
  function callback(data) {
    try {
      expect(data).toBe('duomenys');
      done();
    } catch (error) {
      done(error);
    }
  }

  fetchData(callback);
});
```

### 5.3.3. Promise grąžinančios funkcijos pavyzdys

Sukurkime asinchroninę funkciją, kuri grąžina Promise.

**failas: `fetchDataPromise.js`**

```javascript
function fetchDataPromise() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('duomenys iš promise');
    }, 1000);
  });
}

module.exports = fetchDataPromise;
```

### 5.3.4. Promise funkcijos testavimas

Galime naudoti async/await sintaksę testui rašyti.

**failas: `fetchDataPromise.test.js`**

```javascript
const fetchDataPromise = require('./fetchDataPromise');

test('gauti duomenys per promise', async () => {
  const data = await fetchDataPromise();
  expect(data).toBe('duomenys iš promise');
});
```

Arba galime naudoti Promise .then() sintaksę:

```javascript
const fetchDataPromise = require('./fetchDataPromise');

test('gauti duomenys per promise naudojant then()', () => {
  return fetchDataPromise().then(data => {
    expect(data).toBe('duomenys iš promise');
  });
});
```

## 5.4. React komponento su useState testavimas

### 5.4.1. Komponento aprašymas

Sukurkime paprastą skaitliuko komponentą.

**failas: `Counter.jsx`**

```javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2 data-testid="count">Skaičius: {count}</h2>
      <button 
        onClick={() => setCount(count + 1)}
        data-testid="increment"
      >
        Pridėti
      </button>
    </div>
  );
}

export default Counter;
```

### 5.4.2. Komponento testavimas

Naudosime `@testing-library/react` biblioteką testavimui.

**failas: `Counter.test.jsx`**

```javascript
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Counter from './Counter';

describe('Counter komponentas', () => {
  test('pradinis skaičius yra 0', () => {
    render(<Counter />);
    const countElement = screen.getByTestId('count');
    expect(countElement.textContent).toBe('Skaičius: 0');
  });

  test('paspaudus mygtuką, skaičius padidėja', () => {
    render(<Counter />);
    const button = screen.getByTestId('increment');
    const countElement = screen.getByTestId('count');

    fireEvent.click(button);
    expect(countElement.textContent).toBe('Skaičius: 1');

    fireEvent.click(button);
    expect(countElement.textContent).toBe('Skaičius: 2');
  });
});
```

### 5.4.3. Paaiškinimas

1. Naudojame `data-testid` atributus elementų identifikavimui - tai yra gera praktika, nes ji nesikeičia keičiant tekstą ar stilių.
2. `render()` funkcija sukuria virtualų DOM testavimui.
3. `screen.getByTestId()` suranda elementus pagal jų test ID.
4. `fireEvent.click()` simuliuoja mygtuko paspaudimą.
5. `expect()` tikrina ar komponento būsena atitinka laukiamą rezultatą.

Norint paleisti testus, reikia įsidiegti reikalingas bibliotekas:

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

---

# 6. Praktinės užduotys ir interaktyvūs pratimai

### 6.1. Užduotis 1: Paprasta funkcija

**Tikslas:** Parašykite funkciją `multiply(a, b)`, kuri grąžina sandaugą, ir sukurkite jai atitinkamus unit testus.

**Instrukcijos:**

1. Sukurkite failą `multiply.js` su funkcija:
    - Funkcija turi priimti du skaičius ir grąžinti jų sandaugą.
2. Sukurkite failą `multiply.test.js`:
    - Sukurkite bent du testus, kurie patikrina skirtingus įvesties atvejus.
3. Paleiskite testus ir įsitikinkite, kad visi testai praeina.

### 6.2. Užduotis 2: TDD principų pritaikymas

**Tikslas:** Naudodami TDD (Test-Driven Development) principus, sukurkite funkciją `reverseString(str)`, kuri apverčia pateiktą eilutę.

**Instrukcijos:**

1. Pradėkite rašyti testus, aprašydami norimą funkcijos elgseną (pvz., `reverseString("abc")` turėtų grąžinti `"cba"`).
2. Įgyvendinkite funkciją, kad visi testai praeitų.
3. Pabandykite pridėti papildomų testų kraštutinei logikai (pvz., tuščia eilutė, vieno simbolio eilutė).

### 6.3. Klausimų atsakymų blokas (quiz)

1. **Klausimas:** Kas yra unit testas?
   - **A:** Testas, tikrinantis atskirą kodo vienetą.
   - **B:** Testas, tikrinantis visos sistemos veikimą.
   - **C:** Testas, kurio vykdymas nepriklauso nuo funkcijos.

   **Teisingas atsakymas:** **A**

2. **Klausimas:** Kodėl svarbu naudoti „mocking“ testuose?
   - **A:** Kad testai būtų greitesni.
   - **B:** Kad eliminuotume priklausomybes nuo išorinių sistemų ir užtikrintume izoliuotą testavimą.
   - **C:** Kad būtų galima rašyti daugiau testų.

   **Teisingas atsakymas:** **B**

3. **Klausimas:** Kuri biblioteka yra labiausiai rekomenduojama pradedantiesiems rašyti unit testus JavaScript?
   - **A:** Jest
   - **B:** Mocha
   - **C:** AVA

   **Teisingas atsakymas:** **A**

---

# 7. Vertinimas ir apibendrinimas

## 7.1. Vertinimo kriterijai

- **Testų kokybė:** Ar testai yra aiškūs, vienareikšmiai ir izoliuoti?
- **Kodo struktūra:** Ar funkcijos ir testai yra tinkamai organizuoti?
- **Atitikimas specifikacijoms:** Ar parašytos funkcijos atitinka reikalavimus, išvardintus testuose?

## 7.2. Apibendrinimas

- Testavimas yra esminė programavimo dalis, leidžianti užtikrinti kodo kokybę.
- Unit testai leidžia izoliuotai tikrinti atskirus kodo komponentus.
- Naudojant tokias bibliotekas kaip Jest, testų rašymas tampa paprastesnis ir labiau automatizuotas.
- Gerosios praktikos (tinkamai pavadinimai, atskiros priklausomybės, reguliarus testavimas) užtikrina ilgalaikį kodo patikimumą ir palaikymą.

---

# 8. Baigiamosios pastabos

Testavimo medžiaga – tai ne tik žinių perdavimas, bet ir praktinių įgūdžių ugdymas. Rekomenduojama:

- **Praktikuotis:** Rašykite ir paleiskite testus reguliariai, ieškodami atvejų, kurie gali kelti klaidų.
- **Bendrauti:** Dalinkitės patirtimi su kolegomis, aptarkite skirtingus požiūrius ir sprendimus.
- **Sekti naujoves:** Testavimo įrankiai ir gerosios praktikos nuolat tobulėja, tad būkite atidūs naujoms tendencijoms.

---

## Interaktyvus uždavinys (namų darbas)

**Uždavinys:** Sukurkite naują funkciją `isPalindrome(str)`, kuri tikrina, ar pateikta eilutė yra palindromas (t. y. skaitoma tiek iš kairės, tiek iš dešinės). Parašykite unit testus, kurie tikrina:
- Teisingą elgesį su įprastais atvejais (pvz., `"madam"` turėtų grąžinti `true`).
- Atvejus, kai eilutė nėra palindromas.
- Specialius atvejus (pvz., tuščia eilutė, didžiosios / mažosios raidės).

Pabandykite iškelti visas galimas situacijas ir įsitikinkite, kad jūsų funkcija teisingai veikia.