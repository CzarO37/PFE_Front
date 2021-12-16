import {Avatar, Button, Grid,Menu,MenuItem,Alert} from "@mui/material";
import React, { useEffect, useState } from "react";
import {Link,useHistory} from 'react-router-dom'
import logo from "../../images/vinci2ndhand.png";
import storageService from '../../services/storage.js'
import avatar from '../../images/avatar2.png'
import usersService from '../../services/users.js'

const Navbar = () =>{
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const userFromStorage = storageService.getUser()

    let history = useHistory()
    let token = storageService.getToken()
    if(token !== undefined && !storageService.getUser()) {
        //remember me token found
        usersService.loginViaRememberMe(token).then((response) => {
            storageService.storeUser(response.user)
            storageService.storeToken(response.token, true)
            history.push(document.location.pathname)
        })
    }

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleLogout = (e) => {
        e.preventDefault()
        setAnchorEl(null)
        storageService.clearStorage()
        history.push("/")
    }

    const profilStyle = {
        background: 'linear-gradient(129deg, rgba(152,200,100,1) 0%, rgba(5,138,174,1) 84%, rgba(5,90,120,1) 100%)'
    }

    const profil = () => {
        if (userFromStorage !== null) {
            const alt = `${userFromStorage.firstname} ${userFromStorage.lastname}`
            switch(userFromStorage.role) {
                case "MODERATOR":
                    return (
                        <>
                        <Button href="/categories" variant="contained" style={profilStyle}>Catégories</Button>
                        <Button
                            id="basic-button"
                            aria-controls="basic-menu"
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <Button variant="contained" style={profilStyle}>Mon profil</Button>
                        
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                            'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleClose}><Link to="/myAccount" style={{textDecoration:'none',color:'black'}}>Mon profil</Link></MenuItem>
                            <MenuItem onClick={handleClose}><Link to="/moderation" style={{textDecoration:'none',color:'black'}}>Modération</Link></MenuItem>
                            <MenuItem onClick={handleClose}><Link to="/newAnnouncement" style={{textDecoration:'none',color:'black'}}>Ajouter une annonce</Link></MenuItem>
                            <MenuItem onClick={handleLogout}>Déconnexion</MenuItem>
                        </Menu>
                        </>)
                default:
                    return (
                    <>
                    <Button href="/categories" variant="contained" style={profilStyle}>Catégories</Button>
                    <Button
                        id="basic-button"
                        aria-controls="basic-menu"
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                            <Button variant="contained" style={profilStyle}>Mon profil</Button>
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClose}><Link to="/myAccount" style={{textDecoration:'none',color:'black'}}>Mon profil</Link></MenuItem>
                        <MenuItem onClick={handleClose}><Link to="/newAnnouncement" style={{textDecoration:'none',color:'black'}}>Ajouter une annonce</Link></MenuItem>
                        <MenuItem onClick={handleLogout}>Déconnexion</MenuItem>
                    </Menu>  
                </>)
            }
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