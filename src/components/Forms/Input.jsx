import React from 'react';

const Input = ({ type, name, label, value, onChange, placeholder }) => (
    <div>
        <label className='block text-gray-700 text-sm font-bold mb-2'>{label}</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        />
    </div>
);

export default Input;