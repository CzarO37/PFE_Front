import { AppBar, Container, Toolbar, Button, Box} from "@mui/material";
import React from "react";
import logo_vinci from "../../images/icon_logos/logo_vinci2hand.png"
//import Button from "../Button/Button";
import Image from 'mui-image'

const Navbar = () =>{
    return(
        <>
           <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Image src={logo_vinci} width="250px" height="auto"/>
                        <Box sx={{ flexGrow:1 }}>
                            <Button variant="contained" float="right" alignItem="flex-end">Se connecter</Button>
                        </Box>
                    </Toolbar>
                </Container>
           </AppBar>
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