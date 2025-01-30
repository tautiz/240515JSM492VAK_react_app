import React from 'react';

const Button = ({ type = 'button', children, onClick = null}) => (
    <div className="mb-4">
        <button
            type={type}
            onClick={onClick}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        >
            {children}
        </button>
    </div>
);

export default Button;
