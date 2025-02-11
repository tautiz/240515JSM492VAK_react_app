import React from 'react';
import { useAuth } from '../contexts/AuthContext';

function UserProfile() {
  const { user, login, logout } = useAuth();

  if (!user) return <div><button onClick={() => login('Tautvydas', '123')}>Prisijungti</button></div>;

  return (
    <div>
      <p>Sveiki, {user.name}!</p>
      <button onClick={logout}>Atsijungti</button>
    </div>
  );
}

export default UserProfile;