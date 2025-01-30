import React from 'react';

function Card({ children, span = 1 }) {
    return <div className={`card col-span-${span}`}>{children}</div>;
}

export default Card;
