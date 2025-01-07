# State valdymas (State) su React

* Teorija: Kas yra State?
* State yra React komponento "būklė" arba "vidinė būsena".
* Ji leidžia komponentams išsaugoti ir keisti informaciją, kuri yra svarbi UI atvaizdavimui.
* State yra lokalus ir valdomas tik tame komponente, kur jis apibrėžtas.
* Pavyzdžiui: mygtuko paspaudimų skaičiavimas, teksto įvedimas į laukelį ir kt.
  
* State valdymas su useState:
* React suteikia "useState" hook'ą, kuris leidžia apibrėžti ir atnaujinti komponento būseną.
* Sintaksė: const [state, setState] = useState(pradinėReikšmė);
* - "state": Dabartinė būsenos reikšmė.
* - "setState": Funkcija, naudojama norint atnaujinti būseną.

## Pavyzdys 1: Paprastas skaitiklis

```javascript
import React, { useState } from 'react';

function Counter() {
    // Naudojame useState hook'ą norėdami valdyti skaitiklio būseną
    const [count, setCount] = useState(0);

    return (`<div>`
            `<h1>`Counter: {count}`</h1>`
            <button onClick={() => setCount(count + 1)}>Increase`</button>`
            <button onClick={() => setCount(count - 1)}>Decrease`</button>`
            <button onClick={() => setCount(0)}>Reset`</button>`
        `</div>`
    );
}

export default Counter;
```

// Paaiškinimas:
// 1. Naudojame useState su pradine reikšme 0.
// 2. Mygtukai atnaujina skaitiklio reikšmę naudodami setCount funkciją.
// 3. React automatiškai atnaujina UI, kai būsenos reikšmė pasikeičia.

## Pavyzdys 2: Dinaminis tekstas

import React, { useState } from 'react';

```javascript
function DynamicText() {
    const [text, setText] = useState('');

    return (`<div>`
            <input
                type="text"
                placeholder="Enter text..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            `<p>`Your text: {text}`</p>`
        `</div>`
    );
}

export default DynamicText;
```

// Paaiškinimas:
// 1. useState naudojamas valdyti tekstinį įvedimą.
// 2. Įvykis onChange atnaujina būseną (text), kai vartotojas įveda duomenis.

## Pavyzdys 3: Šviesos perjungiklis

```javascript
import React, { useState } from 'react';

function LightSwitch() {
    const [isOn, setIsOn] = useState(false);

    return (
        <div style={{ backgroundColor: isOn ? 'yellow' : 'gray', padding: '20px' }}>`<h1>`{isOn ? 'The light is ON' : 'The light is OFF'}`</h1>`
            <button onClick={() => setIsOn(!isOn)}>
                {isOn ? 'Turn OFF' : 'Turn ON'}
            `</button>`
        `</div>`
    );
}

export default LightSwitch;
```

// Paaiškinimas:
// 1. useState naudojamas valdyti boolean reikšmę (ar šviesa įjungta).
// 2. Paspaudus mygtuką, perjungiama būsena tarp "true" ir "false".

## Pavyzdys 4: Kelių būsenų valdymas

```javascript
import React, { useState } from 'react';

function UserProfile() {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');

    return (`<div>`
            `<h1>`User Profile`</h1>`
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
            />
            `<p>`Name: {name}`</p>`
            `<p>`Age: {age}`</p>`
        `</div>`
    );
}

export default UserProfile;
```

// Paaiškinimas:
// 1. useState naudojamas kelioms būsenoms (vardas ir amžius) valdyti.
// 2. Kiekvienas input laukelis atnaujina savo būseną per onChange įvykį.
