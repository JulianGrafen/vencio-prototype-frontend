"use client"

import React, { useEffect, useState } from 'react';

interface Listing {
  id: number;
  title: string;
  price: number;
  category: string;
  condition: string;
  shippingOption: string;
}

interface EditableListing extends Listing {
  isEditing: boolean;
}

const EditListings = () => {
  const [listings, setListings] = useState<EditableListing[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    setUserId(localStorage.getItem('userId'));
  }, []);

  useEffect(() => {
    if (userId) {
      const getListings = async () => {
        try {
          const response = await fetch(`http://localhost:5000/articles/${userId}`);
          const jsonData = await response.json();

          if (Array.isArray(jsonData)) {
            setListings(jsonData.map((listing) => ({ ...listing, isEditing: false })));
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      getListings();
    }
  }, [userId]);

  const handleEdit = (index: number) => {
    setListings((prevListings) => {
      const updatedListings = [...prevListings];
      updatedListings[index].isEditing = true;
      return updatedListings;
    });
  };

  const handleSave = async (editedListing: EditableListing, index: number) => {
    setListings((prevListings) => {
      const updatedListings = [...prevListings];
      updatedListings[index].isEditing = false;
      return updatedListings;    });
    try {
      const response = await fetch(`http://localhost:5000/articles/${editedListing.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedListing),
      });

      if (response.ok) {
        setListings((prevListings) => {
          const updatedListings = [...prevListings];
          updatedListings[index].isEditing = false;
          return updatedListings;
        });
      } else {
        console.error('Error updating listing:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating listing:', error);
    }
  };

  const handleInputChange = (index: number, field: string, value: string | number) => {
    setListings((prevListings) => {
      const updatedListings = [...prevListings];
      updatedListings[index][field] = value;
      return updatedListings;
    });
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Listings</h1>
      <ul>
        {listings.map((listing, index) => (
          <li key={index} className="mb-4 p-4 border rounded">
            {listing.isEditing ? (
              <>
                <label>
                  Title:
                  <input
                    type="text"
                    value={listing.title}
                    onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                  />
                </label>
                <br />
                <label>
                  Price:
                  <input
                    type="number"
                    value={listing.price}
                    onChange={(e) => handleInputChange(index, 'price', Number(e.target.value))}
                  />
                </label>
                <br />
                <label>
                  Category:
                  <input
                    type="text"
                    value={listing.category}
                    onChange={(e) => handleInputChange(index, 'category', e.target.value)}
                  />
                </label>
                <br />
                <label>
                  Condition:
                  <input
                    type="text"
                    value={listing.condition}
                    onChange={(e) => handleInputChange(index, 'condition', e.target.value)}
                  />
                </label>
                <br />
                <label>
                  Shipping Option:
                  <input
                    type="text"
                    value={listing.shippingOption}
                    onChange={(e) => handleInputChange(index, 'shippingOption', e.target.value)}
                  />
                </label>
                <br />
                <button
                  onClick={() => handleSave(listing, index)}
                  
                  className="bg-green-500 text-white px-4 py-2 mt-2 rounded cursor-pointer"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <strong>Title:</strong> {listing.title} <br />
                <strong>Price:</strong> {listing.price} <br />
                <strong>Category:</strong> {listing.category} <br />
                <strong>Condition:</strong> {listing.condition} <br />
                <strong>Shipping Option:</strong> {listing.shippingOption} <br />
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-blue-500 text-white px-4 py-2 mt-2 rounded cursor-pointer"
                >
                  Edit Listing
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditListings;
