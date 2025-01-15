import React, { useState } from 'react';

const NameList = () => {
  const [name, setName] = useState('');
  const [names, setNames] = useState([]);

  const handleAddName = (e) => {
    e.preventDefault();
    if (name.trim()) {
      setNames([
        ...names,
        name.trim()
      ]);
      setName('');
    }
  };

  const handleClearList = () => {
    setNames([]);
  };

  return (
    <div style={
      {
        padding: '20px',
        maxWidth: '400px',
        margin: '0 auto',
        textAlign: 'center'
      }
    }>
      <h2>Vardų Sąrašas</h2>
      <form onSubmit={handleAddName}>
        <input type="text"
          value={name}
          onChange={
            (e) => setName(e.target.value)
          }
          placeholder="Įveskite vardą"
          style={
            {
              padding: '10px',
              marginBottom: '10px',
              width: '100%',
              boxSizing: 'border-box'
            }
          } />
        <button type="submit"
          style={
            {
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              cursor: 'pointer'
            }
          }>
          Add Name
        </button>
      </form>
      <div>
        <button onClick={handleClearList}
          style={
            {
              marginTop: '10px',
              padding: '10px 20px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              cursor: 'pointer'
            }
          }>
          Clear List
        </button>
      </div>
      <ul style={
        {
          marginTop: '20px',
          paddingLeft: '0',
          listStyleType: 'none'
        }
      }>
        {
          names.map((n, index) => (
            <li key={index}
              style={
                {
                  padding: '5px 0',
                  borderBottom: '1px solid #ddd'
                }
              }>
              {n} </li>
          ))
        } </ul>
    </div>
  );
};

export default NameList;
