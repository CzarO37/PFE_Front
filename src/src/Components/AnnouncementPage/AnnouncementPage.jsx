import React, { useEffect, useState } from 'react'
import './announcement.css'
import {Grid,Paper,Avatar,Container,Typography,Button,ButtonGroup} from '@mui/material'
import announcementsService from '../../services/announcements.js'
import noImage from '../../images/no-image.png'
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import SimpleMap from './GoogleMap';
import { useParams, Link } from 'react-router-dom'
import campusesService from '../../services/campuses.js'
import usersService from '../../services/users.js'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const AnnouncementPage = () => {

    let { id } = useParams()
    const token = localStorage.getItem('user')
    const [announcement, setAnnouncement] = useState('')
    const [announcementPhotos, setAnnouncementPhotos] = useState(new Array(noImage))
    const [userPhoto, setUserPhoto] = useState(noImage)
    const [seller, setSeller] = useState('')
    const [campus, setCampus] = useState('')
    const [loading, setLoading] = useState('true')
    const [dialogOpening, setDialogOpening] = useState(false)
    const [title, setTitle] = useState('')
    const [subtitle, setSubtitle] = useState('')
    const [field, setField] = useState('')

    setTimeout(() => { 
        if (announcement!==''&&seller!==''&&campus!=='') {
            setLoading(false) 
        }
    }, 1);

    useEffect(() => {
        async function loadData() {
            await announcementsService.getById(id).then(response => {
                setAnnouncement(response)
                announcementsService.getPhotos(response.announcementId).then(responseAnnouncementPhotos => {
                    if (responseAnnouncementPhotos.length !== 0) {
                        responseAnnouncementPhotos = responseAnnouncementPhotos.map(media => "data:image/png;base64, " + media.content)
                        setAnnouncementPhotos(responseAnnouncementPhotos)
                    }
                    usersService.getPhoto(response.sellerId).then(responseUserPhoto => {
                        if (responseUserPhoto)
                            setUserPhoto("data:image/png;base64, " + responseUserPhoto)
                    }) 
                    usersService.getById(response.sellerId).then(response => {
                        setSeller(response)
                        campusesService.getById(response.campusId).then(response => {
                            setCampus(response)

                        })
                    })
                })
            })
        }
        loadData()
    },[])

    const handleDialogOpening = () => {
        if (dialogOpening){
            setDialogOpening(false)
        } else {
            setDialogOpening(true)
        }
    }

    const handleTrocOpening = () => {
        setTitle("Proposition de troc")
        setSubtitle("Le champ texte en-dessous est à ta disposition! Espérons que ta proposition plaira au vendeur.Bonne chance!")
        setField("Salut! Ton produit me plait. Il se trouve que j'ai un autre produit qui pourrait te plaire. Serais-tu intéressé par un échange? [INFORMATIONS SUR LE PRODUITS]")
        handleDialogOpening()
    }

    const handleBuyOpening = () => {
        setTitle("Proposition d'achat")
        setSubtitle("Le champ texte en-dessous est à ta disposition! Espérons que ta proposition plaira au vendeur.Bonne chance!")
        setField("Salut! Ton produit me plait. J'aimerais l'acheter. Quand est-ce que nous pouvons nous voir?")
        handleDialogOpening()
    }

    


    const mapStyles = {
        width: '100%',
        height: '100%'
      }

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

    const loadType = (price) => {
        if (price === 0) {
            return "A donner!"
        }
        return `Prix proposé: ${price}€`
    }

    const loadInterests = () => {
        
    }

    if (loading) {
        return <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    }
    return (
            <Container>
                <Typography variant="h3" textAlign={"center"} style={{color:'#7BA66C',fontWeight:'bold'}}>{announcement.name}</Typography>
                <Link to="/products"><Button startIcon={<KeyboardBackspaceOutlinedIcon/>}>Retour</Button></Link>
                
                <Paper elevation={6} style={framesStyle}>
                    <Paper style={sectionsStyle}>
                        <Grid container >
                            <Grid item xs={12} md={6} xl={6}>
                                <Avatar src={announcementPhotos[0]} style={noImageStyle}></Avatar>
                                <Button startIcon={<ErrorOutlinedIcon/>}>Signaler cette annonce</Button>
                            </Grid>
                            <Grid item xs={12} md={6} xl={6} style={{padding:"6vh"}}>
                                <Typography key={announcement.announcementId}>{announcement.description}</Typography>
                                <Typography variant="h6" style={{marginTop:"10vh", marginBottom:"2vh"}}>{loadType(announcement.price)}</Typography>
                                <Grid container align="center">
                                    <Grid item xs={6}>
                                        <Button variant="contained" style={buttonStyle} onClick={handleTrocOpening}>Proposer un troc</Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button variant="contained" style={buttonStyle} onClick={handleBuyOpening}>Acheter</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Paper>
                <Grid container style={{marginTop:'2vh'}}>
                    <Grid item xs={12} md={6} xl={6.9}>
                        <Paper style={framesStyle} elevation={6}>
                            <Paper style={sectionsStyle}>
                                <Grid padding='1vh'>
                                    <Typography variant="h5">Localisation:</Typography>
                                    <SimpleMap/>
                                    <Typography>Adresse: {campus.street} {campus.building_number},{campus.postcode} {campus.commune}</Typography>
                                </Grid> 
                            </Paper>
                        </Paper>
                    </Grid>
                    <Grid item xl={0.2}></Grid>
                    <Grid item item xs={12} md={6} xl={4.9}>
                        <Paper style={framesStyle} elevation={6}>
                            <Paper style={sectionsStyle}>
                                <Grid padding='1vh'>
                                    <Typography variant="h5">Vendeur</Typography>
                                </Grid>
                                <Grid container style={{padding:"2vh"}} justifyContent={"space-between"}>
                                    <Grid item xs={12} xl={8}>
                                        <Typography>{seller.firstName}</Typography>
                                        <Typography>{seller.lastName}</Typography>
                                        <Typography>{seller.email}</Typography>
                                        <Typography>{campus.name}</Typography>
                                    </Grid>
                                    <Grid item xs={12} xl={4}>
                                        <Avatar src={userPhoto} style={{width:'100%',height:'100%'}}></Avatar>
                                    </Grid>
                                </Grid>
                                <Grid padding='1vh'>
                                    <Typography variant="h5">Mes préférences</Typography>
                                    <Grid container style={{padding:"2vh"}} justifyContent={"space-between"}>
                                        {(seller.interests).map(interest => (
                                            <Paper elevation={2} style={{padding:'0.2vh'}}>
                                                <Typography key={interest.id}>{interest.name}</Typography>
                                            </Paper>
                                        ))}
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Paper>
                    </Grid>
                </Grid>
                <Dialog open={dialogOpening} onClose={handleDialogOpening}>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        {subtitle}
                    </DialogContentText>
                    <TextField
                        fullWidth
                        id="outlined-multiline-static"
                        multiline
                        rows={7}
                        defaultValue={field}
                    />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDialogOpening}>Retour</Button>
                        <Button onClick={handleDialogOpening}>Envoyer</Button>
                    </DialogActions>
                </Dialog>
            </Container>
    )
}

export default AnnouncementPage
