import {Avatar, Button, Grid} from "@mui/material";
import React from "react";
import {Link} from 'react-router-dom'
import logo from "../../images/vinci2ndhand.png";
import storage from '../../services/storage.js'
import avatar from '../../images/avatar2.png'

const Navbar = () =>{

    const profil = () => {
        const user = storage.getUser()
        console.log(user)
        if (user !== null) {
            return (
                <Avatar
                    alt="Remy Sharp"
                    src={avatar}
                    sx={{ width: 56, height: 56 }}
                />
            )
        }
        return (
        <Button 
            href={"/login"} 
            variant="contained" 
            style={{background: 'linear-gradient(129deg, rgba(152,200,100,1) 0%, rgba(5,138,174,1) 84%, rgba(5,90,120,1) 100%)'}}
        >Se connecter</Button>)
    }

    return(
        <Grid container justifyContent="space-between" alignItems="center" marginBottom="50px">
            <Grid item>
                <Link to="/">
                    <img src={logo} width="300px" height="auto"/>
                </Link>
            </Grid>
            <Grid item>
                {profil()}
            </Grid>
        </Grid>
    )
}

export default Navbar