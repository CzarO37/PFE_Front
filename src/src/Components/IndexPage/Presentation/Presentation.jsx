import { Grid, Typography } from '@mui/material'
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
            <Grid container justifyContent="center">
                <Grid item xs={4}>
                <Image src={vinci_logo} sx={{maxWidth : "600px"}}/>
                </Grid>
                <Grid item xs={6} margin={"auto"}>
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
                <Typography sx={{textAlign: 'center', fontSize:'40px', color:'#8CB17E', fontWeight:'bold'}}>Acheter en seconde main</Typography>
            </Grid>
            <Grid xs={4}></Grid>
            <Grid xs={4}></Grid>
            <Grid item xs={8}>
                <Image src={liens} sx={{maxWidth : "450px"}}/>
                <Typography sx={{textAlign: 'center', fontSize:'40px', color:'#8CB17E', fontWeight:'bold'}}>Créer des liens</Typography>
            </Grid>
            <Grid item xs={8}>
                <Image src={recuperation} sx={{maxWidth : "450px"}}/>
                <Typography sx={{textAlign: 'center', fontSize:'40px', color:'#8CB17E', fontWeight:'bold'}}>Privilégier la récupération</Typography>
            </Grid>
            <Grid xs={4}></Grid>
            <Grid xs={4}></Grid>
            <Grid item xs={8}>
                <Image src={environnement} sx={{maxWidth : "450px"}}/>
                <Typography sx={{textAlign: 'center', fontSize:'40px', color:'#8CB17E', fontWeight:'bold'}}>Respecter notre environnement</Typography>
            </Grid>
            <Grid item xs={8} >
                <Image src={economiser} sx={{maxWidth : "450px"}}/>
                <Typography sx={{textAlign: 'center', fontSize:'40px', color:'#8CB17E', fontWeight:'bold'}}>Economiser</Typography>
            </Grid>
            <Grid xs={4}></Grid>
        </Grid>
        </Grid>
    )
}

export default Presentation
