import {React,useState} from 'react'
import usersService from '../../services/users.js'

import {Grid,Paper,Avatar,Container,Typography,TextField,Button} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import './login.css';
import 'fontsource-roboto';
import logo from '../../images/vinci2ndhand.png'

import axios from 'axios'

const LoginPage = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('') 

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

    const getUser = (id) => {
        usersService.getById(id).then(() => {
            console.log((user) => user)
        })
      }

    const handleClick = (e) => {
        //e.preventDefault()
        // const user = {
        //     email: email,
        //     password: password,
        // }
        // login(user);
    }

    const testGet = () => {
        axios.get('/api/users/1')
        .then(response => {
            console.log(response.json)
        })
    }

    const login = (req) => {
        const user = {
            email: req.email,
            password: req.password
        }
        usersService.login(user)
    }
    const backgroundStyle= {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        'borderRadius':'0px',
        'background': 'linear-gradient(129deg, rgba(152,200,100,1) 0%, rgba(5,138,174,1) 68%, rgba(5,90,120,1) 100%)',}
    
    const loginFormStyle = {
        padding:20,
        height:'50vh',
        'borderTopRightRadius':'0 0',
        'borderBottomRightRadius':'0 0'
    }
    const logoPaperStyle = {
        padding:20,
        height:'50vh',
        'borderTopLeftRadius':'0 0',
        'borderBottomLeftRadius':'0 0'
    }

    const logoStyle = {
        'marginTop':'25px'
    }

    const containerStyle = {
        margin: '140px auto',
    }

    const lockIconStyle = {
        'background': 'linear-gradient(129deg, rgba(152,200,100,1) 0%, rgba(5,138,174,1) 84%, rgba(5,90,120,1) 100%)'
    }

    const formStyle = {
        'marginTop':'30px'
    }

    const submitStyle = {
        'marginTop':'50px',
        width:'200px',
        'background': 'linear-gradient(129deg, rgba(152,200,100,1) 0%, rgba(5,138,174,1) 84%, rgba(5,90,120,1) 100%)'
    }

    const inputStyle = {
        width:'350px'
    }

    return (
        
    <>
        <form onSubmit={login}>
        <Paper style={backgroundStyle}>
            <Container>
                <Grid container marginTop="20vh">
                    <Grid item xs={6}>
                        
                        <Paper style={loginFormStyle}>
                            <Grid align="center">
                                <Avatar style={lockIconStyle}><LockOutlinedIcon/></Avatar>
                                <Typography variant="h5">Connexion</Typography>
                            </Grid>
                            <Grid align="center" style={formStyle}>
                                <TextField style={inputStyle}
                                    required
                                    id="email"
                                    label="E-mail"
                                    variant="standard"
                                    onChange={handleEmailChange}
                                />
                                <br/>
                                <TextField style={inputStyle}
                                    required
                                    id="password"
                                    label="Mot de passe"
                                    type="password"
                                    autoComplete="current-password"
                                    variant="standard"
                                    onChange={handlePasswordChange}
                                />
                                <br/>
                                <Button type="submit" variant="contained" style={submitStyle}>Se connecter</Button>
                            </Grid>
                            
                        </Paper>
                        
                    </Grid>
                    
                    <Grid item xs={6}>
                        <Paper>
                            <Paper style={logoPaperStyle}>
                                <Grid item style={logoStyle}>
                                    <img src={logo} width="500px" height="auto"/>
                                </Grid>
                                
                            </Paper>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
                
        </Paper>
        </form>
    </>)
};
 
export default LoginPage;