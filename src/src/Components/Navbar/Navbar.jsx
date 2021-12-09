import React from 'react'
import {Nav, NavbarContainer, NavLogo} from './NavbarElements'
import logo from '../../images/vinci2ndhand.png'

const Navbar = () => {
    return (
        <>
            <Nav>
                <NavbarContainer>
                    <NavLogo src={logo}>
                    </NavLogo>
                </NavbarContainer>
            </Nav>
        </>
    )
}

export default Navbar
