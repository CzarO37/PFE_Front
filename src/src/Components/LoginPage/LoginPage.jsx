import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import usersService from '../../services/users.js'
import storageService from '../../services/storage.js'
import {Grid, Paper, Avatar, Container, Typography, TextField, Button, FormGroup, FormControlLabel, Checkbox} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import 'fontsource-roboto';
import logo from '../../images/vinci2ndhand.png'


const LoginPage = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    let history = useHistory()

    const handleEmailChange = (e) => {
        e.preventDefault()
        const newEmail = e.target.value
        setEmail(newEmail)
    }

    const handlePasswordChange = (e) => {
        e.preventDefault()
        const newPassword = e.target.value
        setPassword(newPassword)
    }

    const handleRememberMeChange = (e) => {
        setRememberMe(e.target.checked)
    }

    const handleLogin = (event) => {
        event.preventDefault()
        const user = {
            email: email,
            password: password
        }
        usersService.loginUser(user, rememberMe)
            .then(response => {
                storageService.storeUser(response.user)
                storageService.storeToken(response.token, rememberMe)
                console.log("push history");
                history.push("/categories")
            }).catch((e) => {
                console.log(e);
            })
    }


    const bodyStyle = {
        background: 'linear-gradient(129deg, rgba(152,200,100,1) 0%, rgba(5,138,174,1) 68%, rgba(5,90,120,1) 100%)',
        position: 'fixed',
        top: 0,
        bottom:0,
        left:0,
        right:0,
        overflowY: 'scroll',
        overflowX: 'hidden'
    }
    
    const containerStyle = {
        height: '100%',
        //display: "flex",
        //flexDirection: "column",
    }

    const loginFormStyle = {
        padding: 20,
        marginTop: '14vh'
    }

    const logoStyle = {
        'marginTop': '8vh',
        borderRadius: 0,
        width: '70%',
        height: "auto",
    }

    const lockIconStyle = {
        'background': 'linear-gradient(129deg, rgba(152,200,100,1) 0%, rgba(5,138,174,1) 84%, rgba(5,90,120,1) 100%)'
    }

    const formStyle = {
        'marginTop': '6vh'
    }

    const submitStyle = {
        'marginTop': '8vh',
        width: '45%',
        'background': 'linear-gradient(129deg, rgba(152,200,100,1) 0%, rgba(5,138,174,1) 84%, rgba(5,90,120,1) 100%)'
    }

    const inputStyle = {
        width: '70%'
    }

    const signUpStyle = {
        marginTop: '2vh',
        padding: '20px'
    }

    const signUpButtonStyle = {
        'marginTop': '10px',
        width: '200px',
        'background': 'linear-gradient(129deg, rgba(152,200,100,1) 0%, rgba(5,138,174,1) 84%, rgba(5,90,120,1) 100%)',
    }

    return (

        <Paper style={bodyStyle}>
        <Container style={containerStyle}>
            <Paper>
                <Grid container justifyContent="space-around" style={loginFormStyle}>
                    <Grid xs={12} sm={12} md={6} xl={6} align="center">
                        <Avatar style={lockIconStyle}><LockOutlinedIcon/></Avatar>
                        <Typography variant="h5">Connexion</Typography>
                        <form onSubmit={handleLogin}>
                            <Grid align="center" style={formStyle}>
                                <TextField style={inputStyle}
                                           required
                                           id="email"
                                           label="E-mail"
                                           variant="standard"
                                           onChange={handleEmailChange}
                                />
                                <TextField style={inputStyle}
                                           required
                                           id="password"
                                           label="Mot de passe"
                                           type="password"
                                           autoComplete="current-password"
                                           variant="standard"
                                           onChange={handlePasswordChange}
                                />
                                <FormGroup>
                                        <Grid>
                                            <FormControlLabel 
                                                control={
                                                    <Checkbox 
                                                        onChange={handleRememberMeChange} 
                                            />} 
                                                label="Se souvenir de moi" />
                                        </Grid> 
                                    </FormGroup>
                                <Button type="submit" variant="contained" style={submitStyle}>Se connecter</Button>
                            </Grid>
                        </form>
                    </Grid>

                    <Grid xs={12} sm={6} md={6} xl={6} align="center">
                        <Link to="/">
                            <Avatar src={logo} style={logoStyle}></Avatar>
                        </Link>
                    </Grid>

                </Grid>
            </Paper>

            <Paper style={signUpStyle}>
                <Grid align="center">
                    <Typography variant="h4">Nouveau ici? Cr??e ton compte en un clic!</Typography>
                    <Button href={"/signup"} variant="contained" style={signUpButtonStyle}>S'inscrire</Button>
                </Grid>
            </Paper>

        </Container>
        </Paper>
    )
};

export default LoginPage;