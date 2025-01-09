import React from "react";
import '../styles/ButtonStyle.css';

function StyledButton({ isActive, children, callbackFunction}) {
    const getButtonClassNameByState = (isActive ? 'btn-active' : 'btn-inactive');

    const buttonClass = 'btn ' + getButtonClassNameByState;

    return <button onClick={callbackFunction} className={buttonClass}>{children}</button>;
}

export default StyledButton;
