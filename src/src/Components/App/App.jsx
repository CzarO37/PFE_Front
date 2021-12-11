import React, { useState, useEffect } from 'react'
import LoginPage from '../LoginPage/LoginPage'

const App = () => {
  const initialLoad = () => {
    console.log('initialLoad')
    
  }
  useEffect(initialLoad, [])
  
  return (
    <LoginPage></LoginPage>
  );

}

export default App