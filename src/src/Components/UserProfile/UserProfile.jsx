import React, { useEffect, useState } from 'react'
import {Grid,Paper,Avatar,Container,Typography,Button,ButtonGroup,Card,CardActions,CardContent,CardMedia} from '@mui/material'
import { useParams, Link } from 'react-router-dom'
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import usersService from '../../services/users.js'
import announcementsService from '../../services/announcements.js'
import offersService from '../../services/offers.js'
import storageService from '../../services/storage.js'
import velo from '../../images/products/velo.jpg'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';

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

    setTimeout(() => { 
        if (myAnnouncements!==[]&&myOffers!==[]&&userPhoto!=='') {
            setLoading(false) 
        }
    }, 1);

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
            usersService.getPhoto(userFromStorage.userId).then(responseUserPhoto => {
                if (responseUserPhoto)
                    setUserPhoto("data:image/png;base64, " + responseUserPhoto)
            }).catch(err => {
                console.log("No image found")
                setUserPhoto(avatar())
            }) 
        }
        loadData()
    },[])

    const renderMyOffers = () => {
        if (myOffers.length !== 0) {
            return myOffers.map(offer => (
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
                            <Button startIcon={<EmailOutlinedIcon/>} size="medium">Répondre</Button>
                        </CardActions>
                    </Card>
                ))
            
        }
        else {
            return <Typography>Il n'y a pas d'offres à afficher</Typography>
        }
    }

    const renderMyAnnouncements = () => {
        if (myAnnouncements.length !== 0) {
            return myAnnouncements.map(announcement => (
                <Card sx={{ maxWidth: 345 }}>
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
                        <Grid item xs={6} xl={6}>
                            <Button startIcon={<EmailOutlinedIcon/>} size="medium">Répondre</Button>
                        </Grid>
                        <Grid item xs={6} xl={6} align={'right'}>
                            <Button error startIcon={<RemoveCircleOutlineOutlinedIcon/>} size="medium" style={{color:'red'}}>Supprimer</Button>
                        </Grid>
                    </Grid>
                    
                </CardActions>
            </Card>
                ))
            
        }
        else {
            return <Typography>Il n'y a pas de ventes à afficher</Typography>
        }
    }

    const renderMyBoughts = () => {

    }


    const buttonStyle = {
        width: '25%',
    }

    if (loading) {
        return <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    }

    if(!token) {
        return <div>Please login first</div>
    }

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
                                    <Avatar style={noImageStyle}>{userPhoto}</Avatar>
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
                                <Grid item xs={12} md={12} xl={12} marginTop={'1vh'}>
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
                                    <Typography variant="h5" style={{fontWeight:'bold'}}>Mes ventes:</Typography>
                                </Grid>
                                <Grid item xs={12} xl={6} textAlign={'right'}>
                                    <Button variant="outlined" style={buttonStyle}>En vente</Button>
                                    <Button variant="outlined" style={buttonStyle}>Vendus</Button>
                                </Grid>
                                <Grid item xs={12} md={12} xl={12} marginTop={'1vh'}>
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
                                <Grid item xs={12} md={12} xl={12} marginTop={'1vh'}>
                                    <Card sx={{ maxWidth: 345 }}>
                                        <CardMedia
                                            component="img"
                                            height="190"
                                            image={velo}
                                            alt="image"
                                        />
                                        <CardContent>
                                            <Grid container>
                                                <Grid item xs={6} xl={6}>
                                                    <Typography gutterBottom variant="h5" component="div">NAME</Typography>
                                                </Grid>
                                                <Grid item xs={6} xl={6} textAlign={'right'}>
                                                    <Typography gutterBottom variant="h5" component="div">PRICE</Typography>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Paper>
                </Grid>
            </Grid>
            
        </Container>



        // <Container>
        //     <Typography variant="h3" textAlign={"center"} style={{color:'#7BA66C',fontWeight:'bold'}}>Mon Profil</Typography>
        //     <Link to="/products"><Button startIcon={<KeyboardBackspaceOutlinedIcon/>}>Retour</Button></Link>
        //     <Paper elevation={6} style={framesStyle}>
        //         <Paper style={sectionsStyle}>
        //             <Grid container >
        //                 <Grid item xs={2}>
        //                     <Avatar src={noImage} style={noImageStyle}></Avatar>
        //                     <p>***** TODO</p>
        //                 </Grid>
        //                 <Grid item xs={4}>
        //                     <Typography variant="h6" textAlign={"left"} style={{color:'#7BA66C',fontWeight:'bold'}}>Compte: </Typography>
        //                     <Typography textAlign={"left"} style={{color:'#7BA66C'}}>{user.firstname}</Typography>
        //                     <Typography textAlign={"left"} style={{color:'#7BA66C'}}>{user.lastname}</Typography>
        //                     <Typography textAlign={"left"} style={{color:'#7BA66C'}}>{user.email}</Typography>
        //                     <Typography textAlign={"left"} style={{color:'#7BA66C'}}>Campus: {user.campus.name}</Typography>
        //                 </Grid>
        //                 <Grid item xs={5}>
        //                     <Typography variant="h6" textAlign={"left"} style={{color:'#7BA66C',fontWeight:'bold'}}>Mes préférences: </Typography>
        //                     {user.interests.map(
        //                         (interest) => (
        //                             <Paper elevation={2} style={{width:'50%', margin:'1vh', padding:'0.2vh'}}>
        //                                 <Typography textAlign={"center"} style={{color:'#7BA66C'}} key={interest.id}>{interest.name}</Typography>
        //                             </Paper>
        //                         ))}
        //                 </Grid>
        //                 <Grid item xs={1}>
        //                     <Link to="/"><Typography  textAlign={"left"} style={{fontWeight:'bold'}}>Opt</Typography></Link>
        //                 </Grid>
        //             </Grid>
        //         </Paper>
        //     </Paper>
        //     <Paper elevation={6} style={framesStyle}>
        //         <Paper style={sectionsStyle}>
        //             <Typography variant="h6" textAlign={"left"} style={{color:'#7BA66C',fontWeight:'bold'}}>
        //                 Offres en attente:
        //             </Typography>
        //         </Paper>
        //     </Paper>
        //     <Paper elevation={6} style={framesStyle}>
        //         <Paper style={sectionsStyle}>
        //             <Typography variant="h6" textAlign={"left"} style={{color:'#7BA66C',fontWeight:'bold'}}>
        //                 Ventes:
        //             </Typography>
        //         </Paper>
        //     </Paper>
        // </Container>
    )

}

export default UserProfile