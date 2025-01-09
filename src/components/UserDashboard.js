import React, { useState } from 'react';
import StyledButton from './StyledButton';

function UserDashboard() {
    const [role, setRole] = useState('guest'); // Roles: guest, user, admin
    const [isPremium, setIsPremium] = useState(false);
    const [activeButton, setActiveButton] = useState(true);

    const getContent = () => {
        if (role === 'admin') return 'Welcome, Admin!';
        if (role === 'user') return isPremium ? 'Welcome, Premium User!' : 'Welcome, Free User!';
        return 'Welcome, Guest!';
    };

    return (
        <div className='card'>
            <button onClick={() => setActiveButton(!activeButton)} className='btn button'>Change button state</button>
            <StyledButton isActive={activeButton} callbackFunction={() => setRole('guest')} >Set Guest</StyledButton>

            <button onClick={() => setRole('user')} className='btn button'>Set User</button>
            <button onClick={() => setRole('admin')} className='btn button'>Set Admin</button>
            {role === 'user' && <button onClick={() => setIsPremium(!isPremium)}>Toggle Premium</button>}
            <p className='p-10'>{getContent()}</p>
        </div>
    );
}

export default UserDashboard;
