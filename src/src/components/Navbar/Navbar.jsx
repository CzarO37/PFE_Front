import {Button, Grid} from "@mui/material";
import React from "react";
import logo_vinci from "../../images/icon_logos/logo_vinci2hand.png"

const Navbar = () =>{
    return(
        <Grid container justifyContent="space-between" alignItems="center" marginBottom="50px">
            <Grid item>
                <img src={logo_vinci} width="300px" height="auto"/>
            </Grid>
            <Grid item>        
                <Button href={"/signup"} variant="contained" style={{background: 'linear-gradient(129deg, rgba(152,200,100,1) 0%, rgba(5,138,174,1) 84%, rgba(5,90,120,1) 100%)'}}>Se connecter</Button>
            </Grid>  
        </Grid>
    )
}

export default Navbar