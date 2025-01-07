import { useState } from 'react';
import ContactCard from './ContactCard';

function AboutMe() {
    const [vardas, keistiVarda] = useState('Tautvydas');
    const [pavarde, keistiPaverde] = useState('Dulskis');

    const randomNames = ['Tautvydas', 'Petras', 'Ona', 'Tomas', 'Jurgis'];
    const randomSurenames = ['Dulskis', 'Petraitis', 'Oniene', 'Tomauskas', 'Jurgenas'];

    const randomNameAndSurename = () => {
        keistiVarda(randomNames[Math.floor(Math.random() * randomNames.length)]);
        keistiPaverde(randomSurenames[Math.floor(Math.random() * randomSurenames.length)]);
    }

    return (
        <div>
            <ContactCard name={vardas + ' ' + pavarde} phone="123456789" email="Tautvydas.Dulskis@lt.lt" />

            <h2 onClick={randomNameAndSurename}>Programuotojas</h2>
            
            <p>Trumpas aprašymas apie mane.</p>

            <input type="text" 
                    placeholder="Iveskite savo varda" 
                    value={vardas} 
                    onChange={(eventas) => keistiVarda(eventas.target.value)}
                    className="input"
            />
            <input type="text" 
                    placeholder="Iveskite savo Paverde" 
                    value={pavarde} 
                    onChange={(eventas) => keistiPaverde(eventas.target.value)}
                    className="input"
            />
        </div>
    );
}

export default AboutMe;