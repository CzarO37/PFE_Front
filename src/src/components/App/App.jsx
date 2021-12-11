import React, { useState, useEffect } from 'react'
import LoginPage from '../LoginPage/LoginPage'
import IndexPage from '../IndexPage/IndexPage'

const App = () => {
  const initialLoad = () => {
    console.log('initialLoad')
    
  }
  useEffect(initialLoad, [])
  
  return (
    <IndexPage></IndexPage>
  );

}

export default App