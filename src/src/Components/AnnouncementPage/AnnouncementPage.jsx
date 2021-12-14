import React, { useEffect, useState } from 'react'
import './announcement.css'
import ParticlesBg from 'particles-bg'
import leaf from '../../images/leaf.png'
import {Grid,Paper,Avatar,Container,Typography,Button,ButtonGroup} from '@mui/material'
import announcementsService from '../../services/announcements.js'
import usersService from '../../services/users.js'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import noImage from '../../images/no-image.png'
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import SimpleMap from './GoogleMap';



const AnnouncementPage = () => {

    const [announcement, setAnnouncement] = useState('')
    const [seller, setSeller] = useState('')

    useEffect(() => {
        announcementsService.getById(1).then(response => {
            setAnnouncement(response)
            setSeller(response.seller)
        })
    },[])

    console.log(announcement)
    console.log(seller)

    // let config = {
    //     num: [4, 7],
    //     rps: 0.1,
    //     radius: [5, 40],
    //     life: [1.5, 3],
    //     v: [2, 3],
    //     tha: [-40, 40],
    //     body: leaf, // Whether to render pictures
    //     alpha: [0.6, 0],
    //     scale: [1, 0.1],
    //     position: "center", // all or center or {x:1,y:1,width:100,height:100}
    //     color: ["random", "#ff0000"],
    //     cross: "dead", // cross or bround
    //     random: 15,  // or null,
    //     g: 5,    // gravity
    //     f: [2, -1], // force
    //     onParticleUpdate: (ctx, particle) => {
    //         ctx.beginPath();
    //         ctx.rect(particle.p.x, particle.p.y, particle.radius * 2, particle.radius * 2);
    //         ctx.fillStyle = particle.color;
    //         ctx.fill();
    //         ctx.closePath();
    //     }
    //   };

    const mapStyles = {
        width: '100%',
        height: '100%'
      }

    const framesStyle = {
        'background': 'linear-gradient(129deg, rgba(152,200,100,1) 0%, rgba(5,138,174,1) 84%, rgba(5,90,120,1) 100%)',
        padding:"0.3vh"
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

    return (
        <>
            {/* <ParticlesBg type="custom" config={config} bg={true} num={200}/> */}
            <Container>
                <Typography variant="h3" textAlign={"center"}>{announcement.name}</Typography>
                <Button startIcon={<KeyboardBackspaceOutlinedIcon/>}>Retour</Button>
                <Paper elevation={6} style={framesStyle}>
                    <Paper>
                        <Grid container >
                            <Grid xs={12} md={6} xl={6}>
                                <Avatar src={noImage} style={noImageStyle}></Avatar>
                                <Button startIcon={<ErrorOutlinedIcon/>}>Signaler cette annonce</Button>
                            </Grid>
                            <Grid xs={12} md={6} xl={6} style={{padding:"6vh"}}>
                                <Typography key={announcement.announcementId}>{announcement.description}</Typography>
                                <Typography variant="h6" style={{marginTop:"10vh", marginBottom:"2vh"}}>Prix proposé: {announcement.price}€</Typography>
                                <Grid container align="center">
                                    <Grid xs={6}>
                                        <Button variant="contained" style={buttonStyle}>Proposer un troc</Button>
                                    </Grid>
                                    <Grid xs={6}>
                                        <Button variant="contained" style={buttonStyle}>Acheter</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Paper>
                <Grid container style={{marginTop:'2vh'}}>
                    <Grid xl={6.9}>
                        <Paper style={framesStyle} elevation={6}>
                            <Paper>
                                <Grid padding='1vh'>
                                    <Typography variant="h5">Localisation:</Typography>
                                    <SimpleMap/>
                                    <Typography>Adresse:</Typography>
                                </Grid> 
                            </Paper>
                        </Paper>
                    </Grid>
                    <Grid xl={0.2}></Grid>
                    <Grid xl={4.9}>
                        <Paper style={framesStyle} elevation={6}>
                            <Paper>
                                <Grid padding='1vh'>
                                    <Typography variant="h5">Vendeur</Typography>
                                </Grid>
                                <Grid container style={{padding:"2vh"}} justifyContent={"space-between"}>
                                    <Grid xl={8}>
                                        <Typography>{seller.firstName}</Typography>
                                        <Typography>{seller.lastName}</Typography>
                                        <Typography>{seller.email}</Typography>
                                        <Typography>Institut</Typography>
                                    </Grid>
                                    <Grid xl={4}>
                                        <Avatar style={{width:'100%',height:'100%'}}>SD</Avatar>
                                    </Grid>
                                </Grid>
                                <Grid padding='1vh'>
                                    <Typography variant="h5">Mes préférences</Typography>
                                    <Grid container style={{padding:"2vh"}} justifyContent={"space-between"}>
                                        <Typography>#Tag</Typography>
                                        <Typography>#Tag</Typography>
                                        <Typography>#Tag</Typography>
                                        <Typography>#Tag</Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Paper>
                    </Grid>
                </Grid>
                
            </Container>
        </>
    )
}

export default AnnouncementPage
