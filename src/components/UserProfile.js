import React from 'react';
import { useAuth } from '../contexts/AuthContext';

function UserProfile() {
  const { user, login, logout } = useAuth();

  if (!user) return <div><button onClick={() => login('Tautvydas', '123')}>Prisijungti</button></div>;

  return (
    <div>
      <p>Sveiki, {user.name}!</p>
      <button 
        onClick={logout}
        className="px-4 py-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
      >
        Atsijungti
      </button>
    </div>
  );
}

export default UserProfile;