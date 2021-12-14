import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import usersService from '../../services/users.js'
import {Grid, Paper, Avatar, Container, Typography, TextField, Button, FormGroup, FormControlLabel, Checkbox, FormControl, RadioGroup, FormLabel, Radio} from '@mui/material'
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import 'fontsource-roboto';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import SchoolIcon from '@mui/icons-material/School';
import logo from '../../images/vinci2ndhand.png'
import './signup.css'


const SignUpPage = () => {

    const [name, setName] = useState('')
    const [firstname, setFirstname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [checkPassword, setCheckPassword] = useState('')
    const [campus, setCampus] = useState('')


    const handleNameChange = (e) => {
        e.preventDefault()
        const newName = e.target.value
        setName(newName)
    }

    const handleFirstnameChange = (e) => {
        e.preventDefault()
        const newFirstname = e.target.value
        setFirstname(newFirstname)
    }

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

    const handleCheckPasswordChange = (e) => {
        e.preventDefault()
        const newCheckedPassword = e.target.value
        setCheckPassword(newCheckedPassword)
    }

    const handleCampusChange = (e) => {
        e.preventDefault()
        const newCampus = e.target.value
        setCampus(newCampus)
    }

    const handleSignUp = (event) => {
        event.preventDefault()
        const user = {
            lastname: name,
            firstname: firstname,
            email: email,
            password: password,
            campusId: campus
        }
        let res = ''
        usersService.signUpUser(user)
            .then(response => res = response)
        console.log(res)
    }

    const containerStyle = {
        height: '100%'
    }

    const signUpFormStyle = {
        padding: 20,
        marginTop: "14vh"
    }

    const logoStyle = {
        'marginTop': '16vh',
        borderRadius: 0,
        width: '70%',
        height: "auto",
    }

    const registerIconStyle = {
        'background': 'linear-gradient(129deg, rgba(152,200,100,1) 0%, rgba(5,138,174,1) 84%, rgba(5,90,120,1) 100%)'
    }

    const formStyle = {
        'marginTop': '6vh',
    }

    const submitStyle = {
        'marginTop': '4vh',
        width: '45%',
        'background': 'linear-gradient(129deg, rgba(152,200,100,1) 0%, rgba(5,138,174,1) 84%, rgba(5,90,120,1) 100%)'
    }

    const inputStyle = {
        width: '70%'
    }

    return (

        <Container style={containerStyle}>
            <Paper>
                <Grid container justifyContent="space-around" style={signUpFormStyle}>
                    <Grid xs={12} sm={12} md={6} xl={6} align="center">
                        <Avatar style={registerIconStyle}><BorderColorOutlinedIcon/></Avatar>
                        <Typography variant="h5">Inscription</Typography>
                        <form onSubmit={handleSignUp}>
                            <Grid align="center" style={formStyle}>
                                <TextField style={inputStyle}
                                           required
                                           id="name"
                                           label="Nom"
                                           variant="standard"
                                           onChange={handleNameChange}
                                />
                                <TextField style={inputStyle}
                                           required
                                           id="firstname"
                                           label="Prénom"
                                           variant="standard"
                                           onChange={handleFirstnameChange}
                                />
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
                                <TextField style={inputStyle}
                                           required
                                           id="checkPassword"
                                           label="Confirmation du mot de passe"
                                           type="password"
                                           autoComplete="current-password"
                                           variant="standard"
                                           onChange={handleCheckPasswordChange}
                                />
                                <FormControl component="fieldset">
                                    <RadioGroup row aria-label="campus" name="campus">
                                        <FormControlLabel value="1" control={<Radio/>} label="Woluwe"
                                                          onChange={handleCampusChange}/>
                                        <FormControlLabel value="2" control={<Radio/>} label="Ixelles"
                                                          onChange={handleCampusChange}/>
                                        <FormControlLabel value="3" control={<Radio/>} label="Louvain-la-Neuve"
                                                          onChange={handleCampusChange}/>
                                    </RadioGroup>
                                </FormControl>
                                {/* <FormGroup>
                                        <Grid>
                                            <FormControlLabel control={<Checkbox icon={<SchoolOutlinedIcon />} checkedIcon={<SchoolIcon/>} onChange={handleCampusChange} value="Woluwe"/>} label="Woluwe" />
                                            <FormControlLabel control={<Checkbox icon={<SchoolOutlinedIcon />} checkedIcon={<SchoolIcon/>} onChange={handleCampusChange} value="Ixelles"/>} label="Ixelles" />
                                            <FormControlLabel control={<Checkbox icon={<SchoolOutlinedIcon />} checkedIcon={<SchoolIcon/>} onChange={handleCampusChange}/>} value="Louvain-la-Neuve" label="Louvain-la-Neuve" />
                                        </Grid> 
                                    </FormGroup> */}
                                <Button type="submit" variant="contained" style={submitStyle}>S'inscrire</Button>
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
        </Container>
    )
};

export default SignUpPage;