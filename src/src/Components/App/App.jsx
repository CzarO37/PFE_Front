import React, { useState, useEffect } from 'react'
import LoginPage from '../LoginPage/LoginPage'
import SignUpPage from '../SignUpPage/SignUpPage'
import AnnouncementPage from '../AnnouncementPage/AnnouncementPage'

const App = () => {
  const initialLoad = () => {
    console.log('initialLoad')
    
  }
  useEffect(initialLoad, [])
  
  return (
    //<LoginPage></LoginPage>
    //<SignUpPage></SignUpPage>
    <AnnouncementPage></AnnouncementPage>
  );

}

export default App