"use client"

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';


export default function CreateNewAccounts() {
    const [page, setPage] = useState('default');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    
  const router = useRouter();

  
    const handleRegistration = async () => {
      const storedUserId = localStorage.getItem('userId');
      console.log(storedUserId);
        try {
            const response = await fetch('http://localhost:5000/auth/registerpartnerAccount', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ name: username, password: password, email: email, id: storedUserId }),
            });  
            if(response.ok){
              router.push('/home');
              console.log("Registriation successful")
            }else if(response.status ===409){
              setError("Email is already taken, please use another E-Mail");
              console.log("E-Mail already registered");
            }
          } catch (error) {
            console.error('Registration failed:', error);
          }
        };
  
    return (
      <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h1>Choose the websites where you want to create new accounts to sell your articles</h1>
        <label htmlFor="page" style={{ marginBottom: '10px', display: 'block' }}>
          Select Page:
        </label>
        <select
          id="page"
          value={page}
          onChange={(e) => setPage(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '15px' }}
        >
          <option value="default">testanzeigen</option>
          <option value="page1">vinted</option>
          <option value="page2">mockanzeigen</option>
        </select>
  
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '15px' }}
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '15px' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '15px' }}
        />
  
        {page === 'page1' && (
          <div>
            <input type="text" placeholder="Page 1 Specific Field" style={{ width: '100%', padding: '8px', marginBottom: '15px' }} />
          </div>
        )}
  
        {page === 'page2' && (
          <div>
            <input type="text" placeholder="Page 2 Specific Field" style={{ width: '100%', padding: '8px', marginBottom: '15px' }} />
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}

        <button onClick={handleRegistration} style={{ background: '#007BFF', color: '#fff', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>
          Register
        </button>
      </div>
    );
  }
  