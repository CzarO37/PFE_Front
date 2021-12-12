import {React,useState} from 'react'
import usersService from '../../services/users.js'
import {Grid,Paper,Avatar,Container,Typography,TextField,Button} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import 'fontsource-roboto';
import logo from '../../images/vinci2ndhand.png'

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

    const handleLogin = (event) => {
        event.preventDefault()
        const user = {
            email: email,
            password: password
        }
        usersService.loginUser(user)
        .then(response => console.log(response))
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
        'marginTop':'7vh'
    }

    const lockIconStyle = {
        'background': 'linear-gradient(129deg, rgba(152,200,100,1) 0%, rgba(5,138,174,1) 84%, rgba(5,90,120,1) 100%)'
    }

    const formStyle = {
        'marginTop':'8vh'
    }

    const submitStyle = {
        'marginTop':'8vh',
        width:'45%',
        'background': 'linear-gradient(129deg, rgba(152,200,100,1) 0%, rgba(5,138,174,1) 84%, rgba(5,90,120,1) 100%)'
    }

    const inputStyle = {
        width:'70%'
    }

    const signUpStyle = {
        marginTop: '2vh',
        padding: '20px'
    }

    const signUpButtonStyle = {
        'marginTop':'10px',
        width:'200px',
        'background': 'linear-gradient(129deg, rgba(152,200,100,1) 0%, rgba(5,138,174,1) 84%, rgba(5,90,120,1) 100%)',
    }

    return (
        
    <>
        
        <Paper style={backgroundStyle}>
            <Container>
                <Grid container marginTop="13vh">
                    <Grid item xs={6}>
                        
                        <Paper style={loginFormStyle}>
                            <Grid align="center">
                                <Avatar style={lockIconStyle}><LockOutlinedIcon/></Avatar>
                                <Typography variant="h5">Connexion</Typography>
                            </Grid>
                            <form onSubmit={handleLogin}>
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
                            </form>
                        </Paper>
                        
                    </Grid>
                    
                    <Grid item xs={6}>
                        <Paper>
                            <Paper style={logoPaperStyle}>
                                <Grid item style={logoStyle}>
                                    <img src={logo} width="100%" height="auto"/>
                                </Grid>
                                
                            </Paper>
                        </Paper>
                    </Grid>
                </Grid>
                <Paper style={signUpStyle}>
                    <Grid align="center">
                        <Typography variant="h4">Nouveau ici? Crée ton compte en un clic!</Typography>
                        <Button variant="contained" style={signUpButtonStyle}>S'inscrire</Button>
                    </Grid>
                </Paper>
                
            </Container>
                
        </Paper>
        
    </>)
};
 
export default LoginPage;