import React from "react";
import logo_vinci from "../../images/icon_logos/logo_vinci2hand.png"
import Button from "../Button/Button";

import './Navbar.css'

const Navbar = () =>{
    return(
        <div class="navbar" >
            <img id="logo" src={logo_vinci} alt="Vinci2ndHand"></img>
            <Button name= 'Se connecter' />
        </div>
    )
}

export default Navbar