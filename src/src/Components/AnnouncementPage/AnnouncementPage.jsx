import React, { useEffect, useState } from 'react'
import './announcement.css'
import {Grid,Paper,Avatar,Container,Typography,Button} from '@mui/material'
import announcementsService from '../../services/announcements.js'
import noImage from '../../images/no-image.png'
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import SimpleMap from './GoogleMap';
import { useParams, Link, useHistory } from 'react-router-dom'
import campusesService from '../../services/campuses.js'
import usersService from '../../services/users.js'
import storageService from '../../services/storage.js'
import mediasService from '../../services/medias.js'
import offersService from '../../services/offers'
import reportsService from '../../services/reports'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



const AnnouncementPage = () => {

    let { id } = useParams()
    const token = storageService.getToken()
    const user = storageService.getUser()
    const [announcement, setAnnouncement] = useState('')
    const [announcementPhotos, setAnnouncementPhotos] = useState(new Array(noImage))
    const [userPhoto, setUserPhoto] = useState(noImage)
    const [seller, setSeller] = useState('')
    const [campus, setCampus] = useState('')
    const [loading, setLoading] = useState('true')
    const [isPopupOpened, setPopupState] = useState(false)
    const [popupTitle, setPopupTitle] = useState('')
    const [popupContent, setPopupContent] = useState('')
    const [lastAction, setLastAction] = useState('')
    const [proposedPrice, setProposedPrice] = useState(0)
    const [reportContent, setReportContent] = useState('')
    const [reportCategory, setReportCategory] = useState('')
    const categories = ["Illegal", "Innapropriate", "Spam"]

    let history = useHistory()
    if(!token) {
        history.push("/login")
    }

    setTimeout(() => { 
        if (announcement!==''&&seller!==''&&campus!=='') {
            setLoading(false) 
        }
    }, 1);

    useEffect(() => {
        async function loadData() {
            await announcementsService.getById(id).then(response => {
                setAnnouncement(response)
                mediasService.getAnnouncementPhotosByUserId(response.announcementId).then(responseAnnouncementPhotos => {
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




    

    const handleBuyOpening = () => {
        setLastAction("BUY")
        setPopupTitle("Proposition d'achat")
        setPopupContent(
            <>
                <p>Prix proposé</p>
                <TextField
                    id="filled-number"
                    label="Number"
                    type="number"
                    InputLabelProps={{shrink: true,}}
                    variant="filled"
                    onChange={e => setProposedPrice(e.target.value)}
                />
            </>
        )
        setPopupState(!isPopupOpened)
    }

    const handleTrocOpening = () => {
        setLastAction("TROC")
        setPopupTitle("Proposition de troc")
        setPopupContent(
            <TextField
                fullWidth
                id="outlined-multiline-static"
                multiline
                rows={8}
                cols={10}
                defaultValue="Salut! Ton produit me plait. Il se trouve que j'ai un autre produit qui pourrait te plaire. Serais-tu intéressé par un échange? [INFORMATIONS SUR LE PRODUITS]"
            />
        )
        setPopupState(!isPopupOpened)
    }

    
    const handleReportOpening = () => {
        setLastAction("REPORT")
        setPopupTitle("Signaler l'annonce")
        setPopupContent(
            <>
                <FormControl required sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel>Catégorie</InputLabel>
                    <Select
                        label="Catégorie *"
                        onChange={e => setReportCategory(e.target.value)}
                    >
                        <MenuItem value={categories[0]}>Contenu illegal</MenuItem>
                        <MenuItem value={categories[1]}>Contenu inapproprié</MenuItem>
                        <MenuItem value={categories[2]}>Spam</MenuItem>
                    </Select>
                    <FormHelperText>Required</FormHelperText>
                </FormControl>
                <TextField
                    fullWidth
                    id="outlined-multiline-static"
                    multiline
                    rows={8}
                    cols={10}
                    onChange={e => setReportContent(e.target.value)}
                />
            </>
        )
        setPopupState(!isPopupOpened)
    }

    const handleAction = () => {
        switch (lastAction) {
            case 'BUY':
                handleBuy()
                break

            case 'TROC':
                handleTroc()
                break
        
            case 'REPORT':
                handleReport()
                break

            default:
                break
        }
        setPopupState(!isPopupOpened)
    }


    const handleBuy = () => {
        if (parseInt(proposedPrice) < 0)
            return alert("Le prix ne peut pas être négatif")
        const offer = {price:parseInt(proposedPrice), announcementId: announcement.announcementId}
        offersService.postOffer(token, offer)
        alert("Offre envoyée")
        sendEmailBuy(offer)
    }

    const sendEmailBuy = ({price, announcementId}) => {
        const subject = `Vinci2ndHand - Offre pour ${announcement.name}`
        const body = `Salut! Ton annonce "${announcement.name}" m'intéresse. J'aimerais te l'acheter pour ${price}€. Quand est-ce que nous pouvons nous voir? ${user.firstname} ${user.lastname}`
        const to = announcement.seller.email
        console.log({subject, body, to});

        const mailto = `mailto:${to}?subject=${subject}&body=${body}`
        window.location.href = mailto
    }
    
    const sendEmailBarter = (announcementId) => {
        const subject = `Vinci2ndHand - Offre pour ${announcement.name}`
        const body = `Salut! Ton annonce "${announcement.name}" m'intéresse. Il se trouve que j'ai un autre objet qui pourrait te plaire. Serais-tu intéressé par un échange? [Decris l'objet que tu veux echanger ici!]`
        const to = announcement.seller.email
        console.log({subject, body, to});
        const mailto = `mailto:${to}?subject=${subject}&body=${body}`
        window.location.href = mailto
    }

    const handleTroc = () => {
        const offer = {price:0, announcementId: announcement.announcementId}
        offersService.postOffer(token, offer)
        alert("Offre envoyée")
        sendEmailBarter(announcement.announcementId)
    }


    const handleReport = () => {
        if (!reportCategory)
            return alert("Mauvaise catégorie de signalement")
        reportsService.createOne(token, {content: reportContent, announcementId: announcement.announcementId, category: reportCategory})
        alert("Signalement envoyé")
    }




    if (loading) 
        return <Box sx={{ display: 'flex' }}> <CircularProgress /> </Box>
    
    return (
        
            <Container>
                <Typography variant="h3" textAlign={"center"} style={{color:'#7BA66C',fontWeight:'bold'}}>{announcement.name}</Typography>
                <Link to="/products"><Button startIcon={<KeyboardBackspaceOutlinedIcon/>}>Retour</Button></Link>
                
                <Paper elevation={6} style={framesStyle}>
                    <Paper style={sectionsStyle}>
                        <Grid container >
                            <Grid item xs={12} md={6} xl={6}>
                                <Avatar src={announcementPhotos[0]} style={noImageStyle}></Avatar>
                                <Button startIcon={<ErrorOutlinedIcon/>} onClick={handleReportOpening}>Signaler cette annonce</Button>
                            </Grid>
                            <Grid item xs={12} md={6} xl={6} style={{padding:"6vh"}}>
                                <Typography key={announcement.announcementId}>{announcement.description}</Typography>
                                <Typography variant="h6" style={{marginTop:"10vh", marginBottom:"2vh"}}>{announcement.price === 0 ? "A donner" : `Prix proposé: ${announcement.price}€`}</Typography>
                                <Grid container align="center">
                                    <Grid item xs={6}>
                                        <Button variant="contained" style={buttonStyle} onClick={handleTroc}>Proposer un troc</Button>
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
                    <Grid item xs={12} md={6} xl={4.9}>
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

                <Dialog open={isPopupOpened} onClose={() => setPopupState(!isPopupOpened)}>
                    <DialogTitle>{popupTitle}</DialogTitle>
                    <DialogContent>
                        {popupContent}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setPopupState(!isPopupOpened)}>Retour</Button>
                        <Button onClick={handleAction}>Envoyer</Button>
                    </DialogActions>
                </Dialog>
            </Container>
            
    )
}

export default AnnouncementPage
