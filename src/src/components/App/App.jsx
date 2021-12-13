import React, { useState, useEffect } from 'react'
import LoginPage from '../LoginPage/LoginPage'
import IndexPage from '../IndexPage/IndexPage'
import CategoriePage from '../CategoriePage/CategoriePage'

const App = () => {
  const initialLoad = () => {
    console.log('initialLoad')
    
  }
  useEffect(initialLoad, [])
  
  return (
    <CategoriePage/>
  );

}

export default App