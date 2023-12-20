"use client"
import React, { useEffect, useState } from 'react';

interface Listing {
  title: string;
  price: number;
  category: string;
  condition: string;
  shippingOption: string;
}

const EditListings = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Ensure the code is executed on the client side
    setUserId(localStorage.getItem('userId'));
  }, []);

  useEffect(() => {
    if (userId) {
      const getListings = async () => {
        try {
          const response = await fetch(`http://localhost:5000/articles/${userId}`);
          const jsonData = await response.json();

          if (Array.isArray(jsonData)) {
            setListings(jsonData);
            console.log(listings, userId);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      getListings();
    }
  }, [userId]);

  return (
    <div>
      <h1>Listings</h1>
      <ul>
        {listings.map((listing, index) => (
          <li key={index}>
            <strong>Title:</strong> {listing.title} <br />
            <strong>Price:</strong> {listing.price} <br />
          </li>
        ))}
      </ul>
      <button
        onClick={() => getListings()}
        style={{
          background: '#007BFF',
          color: '#fff',
          padding: '10px',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Edit Listings
      </button>
    </div>
  );
};

export default EditListings;
