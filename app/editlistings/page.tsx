"use client"
import React, { useState } from 'react';


const EditListings = () => {
const [title, setTitle] = useState('');

  const editListings = async () => {
    const userId = localStorage.getItem('userId');

    try {
      const response = await fetch(`http://localhost:5000/articles/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch listings');
      }
      const data = await response.json();
      setTitle = data.
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  };

  return (
    <div>
      <h1>Listings</h1>
      <ul>
          
            <strong>Title:</strong> {title}<br />
          
         
        
      </ul>
      <button
      onClick={editListings}
        style={{
          background: '#007BFF',
          color: '#fff',
          padding: '10px',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Register
      </button>
    </div>
  );
};

export default EditListings;

