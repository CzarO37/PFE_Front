import {Button, Grid} from "@mui/material";
import React from "react";
import logo_vinci from "../../images/icon_logos/logo_vinci2hand.png"
//import Button from "../Button/Button";
import Image from 'mui-image'

const Navbar = () =>{
    return(
        <>
        <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
                <Image src={logo_vinci} width="300px" height="auto"/>
            </Grid>
            <Grid item>        
                <Button variant="contained" >Se connecter</Button>
            </Grid>  
        </Grid>
        </>
    )
   
   
    /*return(
        <div class="navbar" >
            <img id="logo" src={logo_vinci} alt="Vinci2ndHand"></img>
            <Button name= 'Se connecter' />
        </div>
    )*/
}

export default Navbar