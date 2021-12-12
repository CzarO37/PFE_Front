import React from "react";
import tondeuse from "../../../images/products/tondeuse.jpg"
import velo from "../../../images/products/velo.jpg"
import vetements from "../../../images/products/vetements.jpg"
import house from "../../../images/products/house.jpg"
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Carrousel = (props) =>{
    const gridContainerStyle = {
    
    }
    
    const cardStyle = {
        height: 'auto',
        maxHeight: '400px',
        width: 'auto',
        maxWidth: '420px'
    }
    
    const cardContentStyle = {
        background: 'linear-gradient(129deg, rgba(152,200,100,1) 0%, rgba(5,138,174,1) 68%, rgba(5,90,120,1) 100%)',
        
    }
    
    const typoStyle = {
        color : 'white'
    }
    
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
          slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }
    }
    return (
        /*<Grid container style={gridContainerStyle}>
            <Grid item xs={12} sm={4}>
                <Card style={cardStyle}>
                    <CardMedia
                        component="img"
                        image={tondeuse}
                    />
                    <CardContent style={cardContentStyle}>
                        <Typography style={typoStyle}>Tondeuse Bosh 400x</Typography>
                        <Typography style={typoStyle}>250€</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Card style={cardStyle}>
                    <CardMedia
                        component="img"
                        image={tondeuse}
                    />
                    <CardContent style={cardContentStyle}>
                        <Typography style={typoStyle}>Tondeuse Bosh 400x</Typography>
                        <Typography style={typoStyle}>250€</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Card style={cardStyle}>
                    <CardMedia
                        component="img"
                        image={tondeuse}
                    />
                    <CardContent style={cardContentStyle}>
                        <Typography style={typoStyle}>Tondeuse Bosh 400x</Typography>
                        <Typography style={typoStyle}>250€</Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>*/
        <Carousel
            swipeable={true}
            draggable={false}
            showDots={true}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={8000}
            keyBoardControl={true}
            customTransition="transform 5000ms ease-in-out"
            transitionDuration={5000}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            additionalTransfrom={-20 * 5} 
        >
            
            <div>
                <Card style={cardStyle}>
                    <CardMedia
                        component="img"
                        image={house}
                        style={cardStyle}
                    />
                    <CardContent style={cardContentStyle}>
                        <Typography style={typoStyle}>Tondeuse Bosh 400x</Typography>
                        <Typography style={typoStyle}>250€</Typography>
                    </CardContent>
                </Card>
            </div>
            <div>
                <Card style={cardStyle}>
                    <CardMedia
                        component="img"
                        image={tondeuse}
                        style={cardStyle}
                    />
                    <CardContent style={cardContentStyle}>
                        <Typography style={typoStyle}>Tondeuse Bosh 400x</Typography>
                        <Typography style={typoStyle}>250€</Typography>
                    </CardContent>
                </Card>
            </div>
            <div>
                <Card style={cardStyle}>
                    <CardMedia
                        component="img"
                        image={house}
                        style={cardStyle}
                    />
                    <CardContent style={cardContentStyle}>
                        <Typography style={typoStyle}>Tondeuse Bosh 400x</Typography>
                        <Typography style={typoStyle}>250€</Typography>
                    </CardContent>
                </Card>
            </div>
            <div>
                <Card style={cardStyle}>
                    <CardMedia
                        component="img"
                        image={vetements}
                        style={cardStyle}
                    />
                    <CardContent style={cardContentStyle}>
                        <Typography style={typoStyle}>Tondeuse Bosh 400x</Typography>
                        <Typography style={typoStyle}>250€</Typography>
                    </CardContent>
                </Card>
            </div>
            <div>
                <Card style={cardStyle}>
                    <CardMedia
                        component="img"
                        image={tondeuse}
                        style={cardStyle}
                    />
                    <CardContent style={cardContentStyle}>
                        <Typography style={typoStyle}>Tondeuse Bosh 400x</Typography>
                        <Typography style={typoStyle}>250€</Typography>
                    </CardContent>
                </Card>
            </div>
            <div>
                <Card style={cardStyle}>
                    <CardMedia
                        component="img"
                        image={house}
                        style={cardStyle}
                    />
                    <CardContent style={cardContentStyle}>
                        <Typography style={typoStyle}>Tondeuse Bosh 400x</Typography>
                        <Typography style={typoStyle}>250€</Typography>
                    </CardContent>
                </Card>
            </div>
            <div>
                <Card style={cardStyle}>
                    <CardMedia
                        component="img"
                        image={house}
                        style={cardStyle}
                    />
                    <CardContent style={cardContentStyle}>
                        <Typography style={typoStyle}>Tondeuse Bosh 400x</Typography>
                        <Typography style={typoStyle}>250€</Typography>
                    </CardContent>
                </Card>
            </div>
      </Carousel>
    )
}

export default Carrousel