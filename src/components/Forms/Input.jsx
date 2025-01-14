import React from 'react';

const Input = ({ type = 'text', name, label, value, onChange, placeholder = '', error }) => (
    <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for={name}>
            {label}
        </label>
        <input
            type={type}
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        />
        {error && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Klaida:</span> {error}</p>}
    </div>
);

export default Input;
