import React, { useState, useEffect } from 'react'
import LoginPage from '../LoginPage/LoginPage'
import SignUpPage from '../SignUpPage/SignUpPage'

const App = () => {
  const initialLoad = () => {
    console.log('initialLoad')
    
  }
  useEffect(initialLoad, [])
  
  return (
    //<LoginPage></LoginPage>
    <SignUpPage></SignUpPage>
  );

}

export default App