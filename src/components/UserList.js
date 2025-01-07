import React from 'react';
import ContactCard from './ContactCard';

function UserList({ users }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Vartotojų Sąrašas</h3>
      <div className="space-y-3">
        {users.map((user) => (
          <ContactCard
            key={user.email}
            name={user.name}
            phone={user.phone}
            email={user.email}
          />
        ))}
      </div>
    </div>
  );
}

export default UserList;