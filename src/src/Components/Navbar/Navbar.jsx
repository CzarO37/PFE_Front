import {Avatar, Button, Grid,Menu,MenuItem} from "@mui/material";
import React from "react";
import {Link, useHistory} from 'react-router-dom'
import logo from "../../images/vinci2ndhand.png";
import storage from '../../services/storage.js'
import usersService from "../../services/users"
import avatar from '../../images/avatar2.png'

const Navbar = () =>{
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    let history = useHistory()
    let token = storage.getToken()
    if(token !== undefined && !storage.getUser()) {
        //remember me token found
        usersService.loginViaRememberMe(token).then((response) => {
            storage.storeUser(response.user)
            storage.storeToken(response.token, true)
            history.push(document.location.pathname)
        })
    }

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
      setAnchorEl(null);
    };

    const profil = () => {
        const user = storage.getUser()
        if (user !== null) {
            switch(user.role) {
                case "MODERATOR":
                return (
                    <>
                    <Button 
                        href={"/moderation"} 
                        variant="contained" 
                        style={{background: 'linear-gradient(129deg, rgba(152,200,100,1) 0%, rgba(5,138,174,1) 84%, rgba(5,90,120,1) 100%)'}}
                    >Modération</Button>
                    
                    <Button
                        id="basic-button"
                        aria-controls="basic-menu"
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                    <Avatar
                        alt={"avatar"}
                        src={avatar}
                        sx={{ width: 56, height: 56 }}
                    />
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
                        <MenuItem onClick={handleClose}>Déconnexion</MenuItem>
                    </Menu>
                    </>
                )
                break

                default:
                const alt = `${user.firstname} ${user.lastname}`
                return (
                    <>
                    <Button
                        id="basic-button"
                        aria-controls="basic-menu"
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <Avatar
                        alt={alt}
                        src={avatar}
                        sx={{ width: 56, height: 56 }}
                    />
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
                        <MenuItem onClick={handleClose}>Déconnexion</MenuItem>
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