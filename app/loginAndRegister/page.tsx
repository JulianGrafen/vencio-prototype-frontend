"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [registerName, setRegisterName] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');

  const [loginName, setLoginName] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginToken, setLoginToken] = useState<string | null>(null);
  const [error, setError] = useState('');


  const router = useRouter(); // Use useRouter here

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:5000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: registerName, password: registerPassword, email: registerEmail }),
      });


      if(response.status === 409){
        setError("Email is already taken");
        console.log("E-Mail already registered");
      }else if(response.ok){
        router.push('/home');

      }
      // Redirect after successful registration
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const handleLogin = async () => {
    console.log("click");

    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: loginName, password: loginPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setLoginToken(data.access_token);

        router.push('/home');
        console.log('Login successful. Token:', data.access_token);
      } else {
        console.error('Login failed:', data.error);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };




    return (
      <div className="max-w-md mx-auto mt-10 p-4 border rounded">
        <h2 className="text-2xl mb-4">Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={registerName}
          onChange={(e) => setRegisterName(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="text"
          placeholder="Email"
          value={registerEmail}
          onChange={(e) => setRegisterEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
         {error && <p className="text-red-500">{error}</p>}
        <button onClick={handleRegister} className="bg-blue-500 text-white px-4 py-2 rounded">
          Register
        </button>
  
        <h2 className="text-2xl my-4">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={loginName}
          onChange={(e) => setLoginName(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">
          Login
        </button>
      </div>
    );
  }


