"use client";

import React, { useState } from 'react';

export default function ListArticle() {
  const [article, setArticle] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    condition: '',
    shippingOption: '',
    userId:'',
  });

  const handleChange = (e:any) => {
    const storedUserId = localStorage.getItem('userId')??"";
    console.log(storedUserId);

    const { name, value } = e.target;
    setArticle((prevArticle) => ({
      ...prevArticle,
      [name]: value,
      userId: storedUserId
    }));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/articles/receive', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(article),
        
      });

      if (response.ok) {
        console.log('Article data submitted successfully:', article);
        // You can perform additional actions here, such as redirecting the user
      } else {
        console.error('Failed to submit article data:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting article data:', error);
    }
  };


  return (
    
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
      <h1 className='text-3xl font-bold mb-3'>VENCIO</h1>
      <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-6">List an Article on 10+ Marketplaces!</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <label>
            Title:
            <textarea
              name="title"
              value={article.title}
              onChange={handleChange}
              className="border p-2 rounded-md w-full"
            />
          </label>
          <label>
            Description:
            <textarea
            
              name="description"
              value={article.description}
              onChange={handleChange}
              className="border p-2 rounded-md w-full"
            />
          </label>
          <label>
            Price:
            <input
              type="text"
              name="price"
              value={article.price}
              onChange={handleChange}
              className="border p-2 rounded-md w-full"
            />
          </label>
          <label>
            Category:
            <input
              type="text"
              name="category"
              value={article.category}
              onChange={handleChange}
              className="border p-2 rounded-md w-full"
            />
          </label>
          <label>
            Condition:
            <input
              type="text"
              name="condition"
              value={article.condition}
              onChange={handleChange}
              className="border p-2 rounded-md w-full"
            />
          </label>
          <label>
            Shipping Option:
            <input
              type="text"
              name="shippingOption"
              value={article.shippingOption}
              onChange={handleChange}
              className="border p-2 rounded-md w-full"
            />
          </label>
          <button
        
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all"
          >
            List Article
          </button>
        </form>
      </div>
    </main>
  );
}
