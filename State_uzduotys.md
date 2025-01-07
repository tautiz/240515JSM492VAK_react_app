### **5 Užduotys su React State Basics**

#### **1. Skaitiklis su ribomis**

* **Tikslas:** Sukurti skaitiklį, kuris negali viršyti tam tikros ribos.
* **Instrukcijos:**
  1. Sukurkite komponentą, kuris pradeda su skaitiklio verte `0`.
  2. Naudokite `useState` skaitiklio reikšmei saugoti.
  3. Pridėkite dvi ribas (pvz., 0 ir 10), kad skaitiklis negalėtų peržengti šių verčių.
  4. Paspaudus mygtukus „Increase“ ir „Decrease“, reikšmė atitinkamai didėja arba mažėja.

---

#### **2. Įvedimo laukas su simbolių apribojimu**

* **Tikslas:** Sukurti įvesties lauką, kuris riboja įrašomų simbolių skaičių.
* **Instrukcijos:**
  1. Sukurkite komponentą su įvesties lauku.
  2. Naudokite `useState` įvesties tekstui saugoti.
  3. Leiskite įvesti ne daugiau nei 20 simbolių.
  4. Parodykite likusių simbolių skaičių.

---

#### **3. Tema perjungiklis**

* **Tikslas:** Sukurti temų perjungiklį tarp „šviesios“ ir „tamsios“ temų.
* **Instrukcijos:**
  1. Sukurkite komponentą, kuris naudoja boolean reikšmę (`true` – šviesi tema, `false` – tamsi tema).
  2. Pridėkite mygtuką, kuris perjungia temą.
  3. Keiskite foną ir tekstą priklausomai nuo pasirinktos temos.

---

#### **4. Dinaminis sąrašas su pridėjimu ir šalinimu**

* **Tikslas:** Sukurti sąrašą, kuriame vartotojas gali pridėti arba pašalinti elementus.
* **Instrukcijos:**
  1. Sukurkite komponentą su masyvo būsena (`useState`).
  2. Pridėkite įvesties laukelį, kad vartotojas galėtų įvesti naują elementą.
  3. Pridėkite mygtuką „Add“, kad elementas būtų pridėtas į sąrašą.
  4. Kiekvienas sąrašo elementas turėtų mygtuką „Delete“, kad jį pašalintumėte.

---

#### **5. Skaitiklis su automatiniu atnaujinimu**

* **Tikslas:** Sukurti skaitiklį, kuris automatiškai didina reikšmę kas sekundę.
* **Instrukcijos:**
  1. Sukurkite komponentą, kuris pradeda su skaitiklio verte `0`.
  2. Naudokite `useState` reikšmei saugoti ir `useEffect`, kad sukurtumėte intervalą.
  3. Kas sekundę skaitiklis turėtų didėti vienetu.
  4. Pridėkite mygtukus „Start“ ir „Stop“, kad paleistumėte arba sustabdytumėte skaitiklį.
