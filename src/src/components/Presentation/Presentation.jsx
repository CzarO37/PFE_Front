import { Grid, Typography } from '@mui/material'
import { Image } from 'mui-image'
import React from 'react'
import vinci_logo from '../../images/icon_logos/vinci_logo.png'

const Presentation = () => {
    return (
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
    )
}

export default Presentation
