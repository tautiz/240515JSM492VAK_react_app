import React, { useState } from 'react';

// Pavyzdys 1: onClick įvykis
function ButtonClick() {
  const [message, setMessage] = useState('');

  const handleClick = () => {
    let x = 10;
    
    if (x === 10) {
      setMessage('X yra 10!');
      return;
    } else {
      setMessage('X yra ne 10!');
    }
    
    console.log('Mygtukas paspaustas!');

    x = 20;

    // setMessage('Mygtukas paspaustas!');
  };

  return (
    <div className="card">
      <button 
        onClick={handleClick}
        className="btn btn-primary"
      >
        Paspausk mane
      </button>
      <p className="mt-2 text-gray-600 dark:text-gray-400">{message}</p>
    </div>
  );
}

export { ButtonClick };

// Pavyzdys 2: onChange įvykis

function InputChange() {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="card">
      <input 
        type="text" 
        value={inputValue} 
        onChange={handleChange} 
        placeholder="Įvesk tekstą..." 
        className="input w-full"
      />
      <p className="mt-2 text-gray-600 dark:text-gray-400">Įvestas tekstas: {inputValue}</p>
    </div>
  );
}

export { InputChange };

// Pavyzdys 3: Formos pateikimo įvykis

function FormSubmit() {
  const [name, setName] = useState('');
  const [submittedData, setSubmittedData] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmittedData(name);
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Įveskite vardą"
            className="input w-full"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Pateikti
        </button>
      </form>
      {submittedData && (
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Pateiktas vardas: {submittedData}
        </p>
      )}
    </div>
  );
}

export { FormSubmit };

// Pavyzdys 4: Alternatyva įvykių valdymui (Inline funkcijos)

function InlineEvents() {
  return (
    <div className="card">
      <p 
        className="p-4 rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
        onMouseEnter={() => console.log('Pelė užvesta!')}
        onMouseLeave={() => console.log('Pelė patraukta!')}
      >
        Užvesk pelę ant šio teksto
      </p>
    </div>
  );
}

export { InlineEvents };

// Pavyzdys 5: Kelių įvykių valdymas

function MultipleEvents() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicked, setIsClicked] = useState(false);

  const handleMouseMove = (event) => {
    setPosition({
      x: event.clientX,
      y: event.clientY
    });
  };

  return (
    <div className="card">
      <div 
        className="h-32 bg-gray-100 dark:bg-gray-800 rounded-lg relative cursor-pointer"
        onMouseMove={handleMouseMove}
        onClick={() => setIsClicked(!isClicked)}
      >
        <div className="p-4">
          <p className="text-gray-600 dark:text-gray-400">
            Pelės pozicija: X: {position.x}, Y: {position.y}
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Būsena: {isClicked ? 'Paspausta' : 'Nepaspausta'}
          </p>
        </div>
      </div>
    </div>
  );
}

export { MultipleEvents };