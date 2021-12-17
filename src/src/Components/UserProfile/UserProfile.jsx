import React, { useEffect, useState } from 'react'
import {Grid,Paper,Avatar,Container,Typography,Button,ButtonGroup,Card,CardActions,CardContent,CardMedia} from '@mui/material'
import { useParams, Link, useHistory } from 'react-router-dom'
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import usersService from '../../services/users.js'
import announcementsService from '../../services/announcements.js'
import offersService from '../../services/offers.js'
import storageService from '../../services/storage.js'
import velo from '../../images/products/velo.jpg'
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';

const framesStyle = {
    'background': 'linear-gradient(129deg, rgba(152,200,100,1) 0%, rgba(5,138,174,1) 84%, rgba(5,90,120,1) 100%)',
    padding:"0.3vh"
}

const sectionsStyle = {
    'background':'#e2efdc'
}

const noImageStyle = {
    marginTop:'1vh',
    marginBottom:'1vh',
    padding:'2vh',
    width:'16vh',
    height:"16vh",
}

const buttonStyle = {
    width:'80%',
    'background': 'linear-gradient(129deg, rgba(152,200,100,1) 0%, rgba(5,138,174,1) 84%, rgba(5,90,120,1) 100%)',
}

const UserProfile = () => {

    const avatar = () => {
        return <Avatar>{userFromStorage.firstname.toUpperCase().charAt(0)}{userFromStorage.lastname.toUpperCase().charAt(0)}</Avatar>
    }
    const userFromStorage = storageService.getUser()
    const token = storageService.getToken()
    const [user, setUser] = useState({campus: '', interests: []})
    const [myAnnouncements, setMyAnnouncements] = useState([])
    const [myOffers, setMyOffers] = useState([])
    const [myPurchases, setMyPurchases] = useState([])
    const [loading, setLoading] = useState('true')
    const [userPhoto, setUserPhoto] = useState('')

    let history = useHistory()
    if(!token) {
        history.push("/login")
    }

    setTimeout(() => { 
        if (myAnnouncements!==[]&&myOffers!==[]&&myPurchases!==[]) {
            setLoading(false) 
        }
    }, 2000);

    useEffect(() => {
        async function loadData() {
            await usersService.getMe(token).then(response => {
                setUser(response)
                console.log("user",response)
                announcementsService.getMe(token).then(response => {
                    setMyAnnouncements(response)
                    console.log("annonces",response)
                    offersService.getForMe(token).then(response => {
                        setMyOffers(response)
                        console.log("mes offres",response)
                        offersService.getFromMe(token).then(response => {
                            setMyPurchases(response)
                            console.log("mes achats",response)
                            
                        })
                    })
                })
            })
        }
        loadData()
    },[])

    const renderMyOffers = () => {
        if (myOffers.length !== 0) {
            return myOffers.map(offer => (
                <Grid item xs={12} md={6} xl={4} marginTop={'1vh'}>
                    <Card sx={{ maxWidth: 345 }} key={offer.id}>
                        <CardMedia
                            component="img"
                            height="190"
                            image={velo}
                            alt="image"
                        />
                        <CardContent>
                            <Grid container>
                                <Grid item xs={6} xl={6}>
                                <Typography gutterBottom variant="h5" component="div">
                                    <Link 
                                        to={`/announcement/${offer.announcement.announcementId}`} 
                                        style={{textDecoration:'none',color:'black'}}
                                    >
                                        {offer.announcement.name}
                                    </Link>
                            </Typography>
                                </Grid>
                                <Grid item xs={6} xl={6} textAlign={'right'}>
                                    <Typography gutterBottom variant="h5" component="div">{offer.price}€</Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions>
                            <Button startIcon={<CheckOutlinedIcon/>} size="medium" onClick={() => handleAccept(token,offer.offerId)}>Accepter</Button>
                            <Button startIcon={<DoDisturbOnOutlinedIcon/>} size="medium" style={{color:'red'}} onClick={() => handleRefuse(token,offer.offerId)}>Refuser</Button>
                        </CardActions>
                    </Card>
                </Grid>
                ))
            
        }
        else {
            return <Typography>Il n'y a pas d'offres à afficher</Typography>
        }
    }

    const renderMyAnnouncements = () => {
        if (myAnnouncements.length !== 0) {
            return myAnnouncements.map(announcement => (
                <Grid item xs={12} md={6} xl={4} marginTop={'1vh'}>
                <Card sx={{ maxWidth: 345 }} key={announcement.announcementId}>
                <CardMedia
                    component="img"
                    height="190"
                    image={velo}
                    alt="image"
                />
                <CardContent>
                    <Grid container>
                        <Grid item xs={6} xl={6}>
                            <Typography gutterBottom variant="h5" component="div">
                                <Link 
                                    to={`/announcement/${announcement.announcementId}`} 
                                    style={{textDecoration:'none',color:'black'}}
                                >
                                    {announcement.name}
                                </Link>
                            </Typography>
                        </Grid>
                        <Grid item xs={6} xl={6} textAlign={'right'}>
                            <Typography gutterBottom variant="h5" component="div">{announcement.price}€</Typography>
                        </Grid>
                        <Typography variant="body2" color="text.secondary">
                            {announcement.description}   
                        </Typography>
                    </Grid>
                </CardContent>
                <CardActions style={{backgroundColor:'white'}}>
                    <Grid container>
                        {renderDeleteButtons(announcement.state, announcement.announcementId)}
                    </Grid>
                    
                </CardActions>
            </Card>
            </Grid>
                ))
        }
        else {
            return <Typography>Il n'y a pas de ventes à afficher</Typography>
        }
    }

    const renderMyPurchases = () => {
        if (myPurchases.length !== 0) {
            return myPurchases.map(purchase => (
                <Grid item xs={12} md={6} xl={4} marginTop={'1vh'}>
                <Card sx={{ maxWidth: 345 }} key={purchase.offerId}>
                    <CardMedia
                        component="img"
                        height="190"
                        image={velo}
                        alt="image"
                    />
                    <CardContent>
                        <Grid container>
                            <Grid item xs={6} xl={6}>
                                <Typography gutterBottom variant="h5" component="div">{purchase.announcement.name}</Typography>
                            </Grid>
                            <Grid item xs={6} xl={6} textAlign={'right'}>
                                <Typography gutterBottom variant="h5" component="div">{purchase.price}€</Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                </Grid>
            ))
        }
        else {
            return <Typography>Il n'y a pas d'achats à afficher</Typography>
        }  
    }

    const handleCancel = (id,token) => {
        announcementsService.cancel(id,token).then(
            history.push('/myAccount')
        )
    }

    const handleAccept = (token,id) => {
        offersService.acceptOffer(token,id).then(
            history.push('/myAccount')
        )
    }

    const handleRefuse = (token,id) => {
        offersService.refuseOffer(token,id).then(
            history.push('/myAccount')
        )
    }

    const renderDeleteButtons = (state,announcementId) => {
        if (state === 'AVAILABLE') {
            return (
                <>
                    <Button error startIcon={<RemoveCircleOutlineOutlinedIcon/>} size="medium" style={{color:'red'}} onClick={() =>handleCancel(announcementId,token)}>Annuler</Button>
                
                </>
            )
            
        }
        else {
            return <Typography variant="h5" color={'red'}>Vendu</Typography>
        }
        
    }


    const buttonStyle = {
        width: '25%',
    }


    if (loading) {
        return (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        )
    }
    else {
        return (
            <Container>
                <Typography variant="h3" textAlign={"center"} style={{color:'#7BA66C',fontWeight:'bold'}}>Mon profil</Typography>
                <Link to="/products"><Button startIcon={<KeyboardBackspaceOutlinedIcon/>}>Retour</Button></Link>
                <Grid container>
                    <Grid item xs={12} xl={12}>
                        <Paper elevation={6} style={framesStyle}>
                            <Paper style={sectionsStyle}>
                                <Grid container padding={3}>
                                    <Grid item xs={5} xl={3} align={"center"}>
                                        <Avatar src={userPhoto} style={noImageStyle}/>
                                    </Grid>
                                    <Grid item xs={7} xl={4}>
                                        <Typography variant="h6" style={{fontWeight:'bold'}}>Compte: </Typography>
                                        <Typography style={{marginTop:'1vh'}}>{user.firstname}</Typography>
                                        <Typography>{user.lastname}</Typography>
                                        <Typography>{user.email}</Typography>
                                        <Typography>Campus: {user.campus.name}</Typography>
                                    </Grid>
                                    <Grid item xs={12} xl={5}>
                                        <Typography variant="h6" style={{fontWeight:'bold'}}>Mes préférences:</Typography>
                                        <Grid container>
                                        {user.interests.map(
                                            (interest) => (
                                                <Paper elevation={2} style={{margin:'1vh', padding:'0.2vh'}}>
                                                    <Typography textAlign={"center"} key={interest.id}>{interest.name}</Typography>
                                                </Paper>
                                        ))}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} xl={12} marginTop={'2vh'}>
                        <Paper elevation={6} style={framesStyle}>
                            <Paper style={sectionsStyle}>
                                <Grid container padding={3}>
                                    <Typography variant="h5" style={{fontWeight:'bold'}}>Offres en attente:</Typography>
                                    <Grid container justifyContent={"space-between"}>
                                        {renderMyOffers()}
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} xl={12} marginTop={'2vh'}>
                        <Paper elevation={6} style={framesStyle}>
                            <Paper style={sectionsStyle}>
                                <Grid container padding={3}>
                                    <Grid item xs={12} xl={6}>
                                        <Typography variant="h5" style={{fontWeight:'bold'}}>Mes annonces:</Typography>
                                    </Grid>
                                    <Grid container justifyContent={"space-between"}>
                                        {renderMyAnnouncements()}
                                    </Grid>
                                    
                                </Grid>
                            </Paper>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} xl={12} marginTop={'2vh'}>
                        <Paper elevation={6} style={framesStyle}>
                            <Paper style={sectionsStyle}>
                                <Grid container padding={3}>
                                    <Typography variant="h5" style={{fontWeight:'bold'}}>Achats</Typography>
                                    <Grid container justifyContent={"space-between"}>
                                        {renderMyPurchases()}
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Paper>
                    </Grid>
                </Grid>
                
            </Container>
        )
    }
    

}

export default UserProfile