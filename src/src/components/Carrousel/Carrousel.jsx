import React from "react";
import tondeuse from "../../images/products/tondeuse.jpg"
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";

const Carrousel = () =>{
    return (
        <Grid container justifyContent="space-around" alignItems="center">
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    image={tondeuse}
                />
                <CardContent style={{backgroundColor : '#C6DFBA'}}>
                    <Typography>Tondeuse Bosh 400x</Typography>
                    <Typography>250€</Typography>
                </CardContent>
            </Card>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    width="20"
                    height="auto"
                    image={tondeuse}
                />
                <CardContent style={{backgroundColor : '#C6DFBA'}}>
                    <Typography>Tondeuse Bosh 400x</Typography>
                    <Typography>250€</Typography>
                </CardContent>
            </Card>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    width="20"
                    height="auto"
                    image={tondeuse}
                />
                <CardContent style={{backgroundColor : '#C6DFBA'}}>
                    <Typography>Tondeuse Bosh 400x</Typography>
                    <Typography>250€</Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default Carrousel