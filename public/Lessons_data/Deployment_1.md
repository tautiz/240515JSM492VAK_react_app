# Kursas: React + Vite Aplikacijų Deploymentas  
**Tema:** Deployinti React aplikacijas, sukurtas naudojant Vite, pasitelkiant Vercel ir kitas platformas  
**Autorius:** [Jūsų vardas]

---

## Turinys

1. [Įvadas](#įvadas)
2. [React ir Vite pagrindai](#1-react-ir-vite-pagrindai)
3. [Aplikacijos paruošimas išleidimui](#2-aplikacijos-paruošimas-išleidimui)
4. [Deployment į Vercel](#3-deployment-į-vercel)
5. [Alternatyvios Deployment Platformos](#4-alternatyvios-deployment-platformos)
6. [Interaktyvios Užduotys ir Praktiniai Pavyzdžiai](#5-interaktyvios-užduotys-ir-praktiniai-pavyzdžiai)
7. [Vertinimas](#6-vertinimas)
8. [Papildoma Medžiaga](#7-papildoma-medžiaga)
9. [Išvados](#8-išvados)

---

## Įvadas

Sveikas atvykęs į kursą, skirtą **React + Vite** aplikacijų diegimui!  
Šio kurso metu mes:
- **Sužinosime**, kaip greitai ir efektyviai kurti React aplikacijas su Vite.
- **Išnagrinėsime** praktinius sprendimus, kaip paruošti aplikaciją produkcijai.
- **Įvaldysime** deployment proceso niuansus naudojant Vercel bei alternatyvias platformas (pvz., Netlify, Heroku).

**Mokymosi tikslai:**
- Išmokti sukurti ir buildinti React aplikacijas naudojant Vite.
- Suprasti, kaip tinkamai paruošti aplikaciją išleidimui.
- Sužinoti, kaip automatizuoti deploymentą naudojant Vercel ir kitas paslaugas.
- Išmokti spręsti dažniausiai pasitaikančias problemas diegiant aplikacijas.

> **Pastaba:** Nėra vietos pusiauširdžiam mokymuisi – čia kalbame tiesą, ir jei nesi pasiruošęs, tai šitas kursas tau ne. Pasiruošk gilintis ir praktikuoti!

---

## 1. React ir Vite Pagrindai

### 1.1. Kas yra React?

React – tai populiari JavaScript biblioteka, skirta kurti interaktyvias vartotojo sąsajas.  
**Pagrindiniai privalumai:**
- **Deklaratyvumas:** Aiškiai nurodoma, kaip turėtų atrodyti UI.
- **Komponentų sistema:** Galimybė kurti pakartotinai naudojamus komponentus.
- **Didelė bendruomenė:** Palaikymas, dokumentacija, trečiųjų šalių bibliotekos.

### 1.2. Kas yra Vite?

Vite – modernus build įrankis, skirtas greitam startavimui ir optimizuotam build procesui.  
**Kodėl Vite?**
- **Greitas startas:** Nepalyginamai greitesnis nei tradiciniai bundleriai (pvz., Webpack).
- **Moderni konfigūracija:** Minimalus konfigūravimo poreikis.
- **Modulio sistemos palaikymas:** Naudoja ES modulį naršyklėms tiesiogiai.

### 1.3. Pavyzdys: Naujos React+Vite aplikacijos kūrimas

Atidaryk terminalą ir vykdyk šias komandas:

```bash
# Sukuriame naują React projektą su Vite
npm create vite@latest mano-react-app -- --template react

# Pereiname į projekto direktoriją
cd mano-react-app

# Įdiegiame priklausomybes
npm install

# Paleidžiame aplikaciją development režimu
npm run dev
```

> **Patarimas:** Jei dar nematai skirtumų tarp įprasto `create-react-app` ir Vite, tai supranti – Vite yra ateitis, o ne praeitis.

---

## 2. Aplikacijos Paruošimas Išleidimui

### 2.1. Build proceso paaiškinimas

Kai tavo aplikacija yra paruošta, reikia ją "buildinti" – sukurti optimizuotą produkcinę versiją.  
Vite tai atlieka per komandą:

```bash
npm run build
```

**Ką gauni?**
- **Optimizuotus failus:** HTML, CSS, JavaScript.
- **Minifikuotą kodą:** Greitesnį įkėlimą ir veikimą.

### 2.2. Bendra struktūra po build proceso

Paprastai sugeneruotas **build** katalogas turės:
- `index.html` – pagrindinis HTML failas.
- `assets/` – visos CSS ir JS bylos, su sumažintu dydžiu.

> **Svarbu:** Nepalik nieko "ranka"; automatizuotas build procesas užtikrina nuoseklumą ir mažina klaidų tikimybę.

---

## 3. Deployment į Vercel

### 3.1. Kas yra Vercel?
Vercel – tai populiari platforma, skirta greitam ir paprastam web aplikacijų deploymentui.  
**Pagrindiniai privalumai:**
- **Automatizuota integracija su Git:** Automatiškai atnaujina aplikaciją, kai padarai push į repozitoriją.
- **Lengva naudoti sąsaja:** Minimalaus konfigūravimo poreikis.
- **Globali CDN:** Greitas turinio pristatymas visame pasaulyje.

### 3.2. Deployment procesas naudojant Vercel

1. **Registracija ir prisijungimas:** Eik į [Vercel svetainę](https://vercel.com) ir užsiregistruok.
2. **Projekto importavimas:** Prisijunk prie savo GitHub (ar kitos SCM) ir pasirink projektą.
3. **Konfigūravimas:** Vercel automatiškai aptiks, kad tai React+Vite projektas. Jei reikia, redaguok `vercel.json` failą.

#### Pavyzdinis `vercel.json` failas

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    }
  ],
  "routes": [
    { "src": "/(.*)", "dest": "/" }
  ]
}
```

4. **Deploy:** Spausk "Deploy" ir stebėk proceso eigą Vercel valdymo skydelyje.

> **Realistiškas požiūris:** Jei vis dar naudoji rankinį FTP ar serverių nuomos sprendimus – laikas pereiti prie automatizacijos!

---

## 4. Alternatyvios Deployment Platformos

### 4.1. Netlify

**Pagrindiniai privalumai:**
- Lengvas GitHub integravimas.
- Automatinis build ir deploy procesas.
- Nemokamas planas su puikiomis funkcijomis.

**Deploy į Netlify:**
1. Prisijunk prie [Netlify](https://netlify.com).
2. Sukurk naują projektą, pasirink Git repozitoriją.
3. Nurodyk build komandą: `npm run build` ir nurodyk katalogą: `dist`.

### 4.2. Kitos alternatyvos

- **Heroku:** Puikus sprendimas backend aplikacijoms, tačiau front-end projektams gali reikėti papildomų konfigūracijų.
- **DigitalOcean App Platform:** Lankstus, bet reikalauja daugiau žinių apie serverių konfigūraciją.

> **Įspėjimas:** Stebūklų nebūna – tad pasirink platformą pagal projekto poreikius ir nenutolk nuo to, kas tau duoda geriausius rezultatus.

---

## 5. Interaktyvios Užduotys ir Praktiniai Pavyzdžiai

### 5.1. Užduotis 1: Naujos React+Vite aplikacijos kūrimas
**Instrukcijos:**
- Sukurk naują projektą naudodamas Vite.
- Parašyk trumpą komponentą, pvz., `HelloWorld`, kuris atspausdina „Labas, pasauli!“.

```jsx
// src/App.jsx
import React from 'react';

function HelloWorld() {
  return <h1>Labas, pasauli!</h1>;
}

function App() {
  return (
    <div>
      <HelloWorld />
    </div>
  );
}

export default App;
```

### 5.2. Užduotis 2: Deployment į Vercel
**Instrukcijos:**
- Sukurk GitHub repozitoriją su savo React+Vite projektu.
- Prisijunk prie Vercel ir importuok repozitoriją.
- Stebėk, kaip automatiškai buildinamas ir deployinamas projektas.

### 5.3. Klausimai ir Atsakymai

1. **Klausimas:** Kas yra pagrindinis Vite pranašumas, palyginti su Webpack?  
   **Atsakymas:** Vite suteikia greitą startą ir modernų build procesą, leidžiantį be didelio konfigūravimo kurti bei buildinti projektus.

2. **Klausimas:** Kaip Vercel palengvina deploymento procesą?  
   **Atsakymas:** Vercel automatizuoja build ir deploy procesus, integruodamas su Git, todėl kiekvienas push į repozitoriją automatiškai atnaujina aplikaciją.

3. **Klausimas:** Ką darai, jei build proceso metu gauni klaidą?  
   **Atsakymas:** Peržiūriu klaidų pranešimus, tikrinu, ar teisingai nurodytas `distDir` katalogas, ir esu pasiruošęs rasti sprendimą greitai – klaidų ignoravimas niekam nepagerins darbo.

> **Užduotis:** Parašyk savo atsakymus į šiuos klausimus ir pateik juos kursų diskusijų platformoje!

---

## 6. Vertinimas

### 6.1. Testo Klausimai (Pasirinktiniai)
- **Klausimas 1:** Kokia yra pagrindinė komanda, kuri buildina React+Vite aplikaciją?  
  - A) `npm start`  
  - B) `npm run build`  
  - C) `npm deploy`  
  - D) `vite build`

- **Klausimas 2:** Kas yra `vercel.json` failo paskirtis?  
  - A) Konfigūruoti vietinį serverį  
  - B) Nustatyti build procesą ir deploymento taisykles  
  - C) Rašyti CSS stilius  
  - D) Saugojimo konfigūracija

### 6.2. Rašytinė Užduotis
Parašyk trumpą refleksiją apie tai, ką išmokai šio kurso metu. Kokius deployment sprendimus planuoji naudoti ateityje ir kodėl?

### 6.3. Progreso Stebėjimo Žymenys
- **✓** Naujos aplikacijos sukūrimas naudojant Vite.
- **✓** Sėkmingas build proceso įvykdymas.
- **✓** Deployment į Vercel arba pasirinktą platformą.

---

## 7. Papildoma Medžiaga

- [React Oficialus Svetainė](https://reactjs.org)
- [Vite Dokumentacija](https://vitejs.dev)
- [Vercel Dokumentacija](https://vercel.com/docs)
- [Netlify Dokumentacija](https://docs.netlify.com)

> **Rekomendacija:** Skaityk oficialias dokumentacijas – tik jos suteikia patikimiausias žinias. Neapsimetink, jei kažkas atrodo per sudėtinga – pasinerk giliau ir praktikuok!

---

## 8. Išvados

Šis kursas parodė, kad:
- **Modernūs įrankiai** kaip Vite ir Vercel iš esmės keičia žaidimo taisykles.
- **Automatizacija** yra būtina norint užtikrinti greitą ir patikimą aplikacijų diegimą.
- **Praktika** ir eksperimentavimas yra geriausias kelias į tobulumą – negalima bijoti klaidų, jas reikia spręsti ir mokytis iš jų.

Kviečiu tave ne tik įsisavinti teoriją, bet ir išbandyti visus pavyzdžius bei užduotis praktikoje. Tikrasis augimas prasideda nuo veiksmų!

---

**Sėkmės!**  
Nepamiršk, kad modernus web developmentas yra greitas ir reikalauja nuolatinio tobulėjimo – būk inovatyvus, drąsus ir efektyvus.
