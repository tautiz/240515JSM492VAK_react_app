import React from 'react';

const Input = ({ type = 'text', name, label, value, onChange, placeholder = '', error, id, autocomplete = '' }) => (
    <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
            {label}
        </label>
        <input
            key={id}
            type={type}
            name={name}
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            autoComplete={autocomplete}
        />
        {error && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Klaida:</span> {error}</p>}
    </div>
);

export default Input;
