import { Button, Grid, Typography } from '@mui/material'
import React from 'react'
import vinci_logo from '../../../images/icon_logos/vinci_logo.png'
import liens from '../../../images/icon_logos/creer_lien.png'
import economiser from '../../../images/icon_logos/economiser.png'
import environnement from '../../../images/icon_logos/Respecter_environnement.png'
import recuperation from '../../../images/icon_logos/privilegier_recuperation.png'
import second_hand from '../../../images/icon_logos/seconde_main.png'
import Image from 'mui-image'

const Presentation = () => {
    return (
        <Grid container>
            <Grid container justifyContent="center" sx={{padding:'100px'}}>
                <Grid item xs={5}>
                <Image src={vinci_logo}/>
                </Grid>
                <Grid item xs={7} margin={"auto"}>
                <Typography sx={{ textAlign: 'center', fontSize: '20px', color: '#C3DFB9', fontWeight: 'bold',
                    '@media (min-width:1024px)': {
                        fontSize: '30px',
                    }
                ,}}>
                    Lancement d’une plateforme à destination de tous les membres de la Communauté Vinci 
                    qui souhaitent vendre, donner ou acheter des objets en attente d’une 
                    seconde vie. Ce projet s’inscrit dans une démarche de développement durable 
                    visant à promouvoir le réemploi.
                </Typography>
                </Grid>
            </Grid>
        <Grid container spacing={8} >
            <Grid item xs={12} align-content="flex-end">
                <Typography sx={{textAlign: 'center', fontSize:'30px', color:'#8CB17E', fontWeight:'bold'}}>Vinci2ndHand c'est donc :</Typography>
            </Grid>
            <Grid item xs={8} justifyContent="flex-start">
                <Image src={second_hand} sx={{maxWidth : "450px"}}/>
                
            </Grid>
            <Grid xs={4} sx={{display: "flex",flexDirection: "column",justifyContent: "center"}}>
                <Typography sx={{fontSize:'40px', color:'#8CB17E', fontWeight:'bold'}}>Acheter en seconde main</Typography>
            </Grid>
            <Grid xs={4} sx={{display: "flex",flexDirection: "column",justifyContent: "center"}}>
                <Typography sx={{textAlign: 'right', fontSize:'40px', color:'#8CB17E', fontWeight:'bold'}}>Créer des liens</Typography>
            </Grid>
            <Grid item xs={8}>
                <Image src={liens} sx={{maxWidth : "450px"}}/>
            </Grid>
            <Grid item xs={8}>
                <Image src={recuperation} sx={{maxWidth : "450px"}}/>
            </Grid>
            <Grid xs={4} sx={{display: "flex",flexDirection: "column",justifyContent: "center"}}>
                <Typography sx={{fontSize:'40px', color:'#8CB17E', fontWeight:'bold'}}>Privilégier la récupération</Typography>
            </Grid>
            <Grid xs={5} sx={{display: "flex",flexDirection: "column",justifyContent: "center"}}>
                <Typography sx={{textAlign: 'right', fontSize:'40px', color:'#8CB17E', fontWeight:'bold'}}>Respecter notre environnement</Typography>
            </Grid>
            <Grid item xs={7}>
                <Image src={environnement} sx={{maxWidth : "450px"}}/>
            </Grid>
            <Grid item xs={8} >
                <Image src={economiser} sx={{maxWidth : "450px"}}/>
            </Grid>
            <Grid xs={4} sx={{display: "flex",flexDirection: "column",justifyContent: "center"}}>
                <Typography sx={{ fontSize:'40px', color:'#8CB17E', fontWeight:'bold'}}>Economiser</Typography>
            </Grid>
            <Grid xs={12}>
                <Typography sx={{textAlign:'center', fontSize:'30px', color:'#8CB17E', fontWeight:'bold', padding:'150px', fontStyle:'italic'}}>
                    « Nous avons tous des trésors enfouis au fond de notre grenier ou de nos placards. 
                    Trésors qui profiteraient à d’autres.Valorisons-les en leur donnant une seconde vie. »
                </Typography>
            </Grid>
            <Grid xs={12} sx={{display:'flex', justifyContent:'center', paddingBottom:'20px'}}>
                <Button variant="contained" size="large" style={{background: 'linear-gradient(129deg, rgba(152,200,100,1) 0%, rgba(5,138,174,1) 84%, rgba(5,90,120,1) 100%)'}}>Allons-y</Button>
            </Grid>
        </Grid>
        </Grid>
    )
}

export default Presentation
