import { useAuth0 } from '@auth0/auth0-react';
import React from 'react'
import './App.css';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';
import Todos from './components/Todos';

export default function App() {
      const { isAuthenticated } = useAuth0();

  return (
    <div className='App'>
      <h1>Hello React Auth0</h1>
      {isAuthenticated ? (
      <>
        <LogoutButton />
        <Profile />
        <Todos />
      </>
      ) : (
      <LoginButton />
      )}
    </div>
  )
}

