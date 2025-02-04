import React from 'react';
import { useParams } from 'react-router-dom';

const UserPage = () => {
  // Iš URL ištraukiamas dinaminis parametras "id"
  const { id } = useParams();

  return (
    <div>
      <h2>User Page</h2>
      <p>Rodymas informacijos apie vartotoją su ID: {id}</p>
    </div>
  );
};

export default UserPage;