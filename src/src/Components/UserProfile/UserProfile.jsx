import React, { useEffect, useState } from 'react'
import {Grid,Paper,Avatar,Container,Typography,Button,ButtonGroup} from '@mui/material'
import { useParams, Link } from 'react-router-dom'
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import noImage from '../../images/no-image.png'

import usersService from '../../services/users.js'
import announcementsService from '../../services/announcements.js'
import offersService from '../../services/offers.js'

const framesStyle = {
    'background': 'linear-gradient(129deg, rgba(152,200,100,1) 0%, rgba(5,138,174,1) 84%, rgba(5,90,120,1) 100%)',
    padding:"0.3vh"
}

const sectionsStyle = {
    'background':'#e2efdc'
}

const noImageStyle = {
    padding:'2vh',
    borderRadius:0,
    width:'70%',
    height:"auto",
}

const buttonStyle = {
    width:'80%',
    'background': 'linear-gradient(129deg, rgba(152,200,100,1) 0%, rgba(5,138,174,1) 84%, rgba(5,90,120,1) 100%)',
}

const UserProfile = () => {
    const token = localStorage.getItem('user')
    const [user, setUser] = useState({campus: '', interests: []})
    const [myAnnouncements, setMyAnnouncements] = useState([])
    const [myOffers, setMyOffers] = useState([])

    useEffect(() => {
        async function loadData() {
            await usersService.getMe(token).then(response => {
                setUser(response)
                announcementsService.getMe(token).then(response => {
                    setMyAnnouncements(response)
                    offersService.getForMe(token).then(response => {
                        setMyOffers(response)
                        console.log(response)
                    })
                })
            })
        }
        loadData()
    },[])

    if(!token) {
        return <div>Please login first</div>
    }

    return (
        <Container>
            <Typography variant="h3" textAlign={"center"} style={{color:'#7BA66C',fontWeight:'bold'}}>Mon Profil</Typography>
            <Link to="/"><Button startIcon={<KeyboardBackspaceOutlinedIcon/>}>Retour</Button></Link>
            <Paper elevation={6} style={framesStyle}>
                <Paper style={sectionsStyle}>
                    <Grid container >
                        <Grid item xs={2}>
                            <Avatar src={noImage} style={noImageStyle}></Avatar>
                            <p>***** TODO</p>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="h6" textAlign={"left"} style={{color:'#7BA66C',fontWeight:'bold'}}>Compte: </Typography>
                            <Typography textAlign={"left"} style={{color:'#7BA66C'}}>{user.firstname}</Typography>
                            <Typography textAlign={"left"} style={{color:'#7BA66C'}}>{user.lastname}</Typography>
                            <Typography textAlign={"left"} style={{color:'#7BA66C'}}>{user.email}</Typography>
                            <Typography textAlign={"left"} style={{color:'#7BA66C'}}>Campus: {user.campus.name}</Typography>
                        </Grid>
                        <Grid item xs={5}>
                            <Typography variant="h6" textAlign={"left"} style={{color:'#7BA66C',fontWeight:'bold'}}>Mes préférences: </Typography>
                            {user.interests.map(
                                (interest) => (
                                    <Paper elevation={2} style={{width:'50%', margin:'1vh', padding:'0.2vh'}}>
                                        <Typography textAlign={"center"} style={{color:'#7BA66C'}} key={interest.id}>{interest.name}</Typography>
                                    </Paper>
                                ))}
                        </Grid>
                        <Grid item xs={1}>
                            <Link to="/"><Typography  textAlign={"left"} style={{fontWeight:'bold'}}>Opt</Typography></Link>
                        </Grid>
                    </Grid>
                </Paper>
            </Paper>
            <Paper elevation={6} style={framesStyle}>
                <Paper style={sectionsStyle}>
                    <Typography variant="h6" textAlign={"left"} style={{color:'#7BA66C',fontWeight:'bold'}}>
                        Offres en attente:
                    </Typography>
                </Paper>
            </Paper>
            <Paper elevation={6} style={framesStyle}>
                <Paper style={sectionsStyle}>
                    <Typography variant="h6" textAlign={"left"} style={{color:'#7BA66C',fontWeight:'bold'}}>
                        Ventes:
                    </Typography>
                </Paper>
            </Paper>
        </Container>
    )

}

export default UserProfile