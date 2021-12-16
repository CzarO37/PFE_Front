import React from 'react'
import Carrousel from './Carrousel/Carrousel'
import Navbar from '../Navbar/Navbar'
import Presentation from './Presentation/Presentation'
import {Container,Paper} from '@mui/material'
import './home.css'

const HomePage = () => {
    return (
        <Container maxWidth="xl">
            <Navbar/>
            <Carrousel/>
            <Presentation/>
        </Container>
    )
}

export default HomePage
