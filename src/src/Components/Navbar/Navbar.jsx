import {Avatar, Button, Grid,Menu,MenuItem,Alert} from "@mui/material";
import React from "react";
import {Link} from 'react-router-dom'
import logo from "../../images/vinci2ndhand.png";
import storage from '../../services/storage.js'
import avatar from '../../images/avatar2.png'

const Navbar = () =>{
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleLogout = () => {
        setAnchorEl(null)
        storage.clearStorage()
        return (
            <Alert severity="info">Déconnecté avec succès!</Alert>
        )
    }

    const profil = () => {
        const user = storage.getUser()
        if (user !== null) {
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
                    <MenuItem onClick={handleLogout}><Link to="/" style={{textDecoration:'none',color:'black'}}>Déconnexion</Link></MenuItem>
                </Menu>
            
            </>
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