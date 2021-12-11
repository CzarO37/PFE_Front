import React from 'react'
import Carrousel from './Carrousel/Carrousel'
import Navbar from '../Navbar/Navbar'
import Presentation from './Presentation/Presentation'
import { Container } from '@mui/material'

const IndexPage = () => {
    return (
        <>
            <Container maxWidth="xl">
                <Navbar/>
                <Carrousel/>
                <Presentation/>
            </Container>
        </>
    )
}

export default IndexPage
