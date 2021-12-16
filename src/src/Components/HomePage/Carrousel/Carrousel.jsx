import React, { useState, useEffect } from "react";
import tondeuse from "../../../images/products/tondeuse.jpg"
import velo from "../../../images/products/velo.jpg"
import vetements from "../../../images/products/vetements.jpg"
import house from "../../../images/products/house.jpg"
import { Card, CardContent, CardMedia, Grid, Paper, Typography } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { fontSize, minHeight } from "@mui/system";
import announcementsService from "../../../services/announcements";
import { Link } from "react-router-dom";

const Carrousel = () =>{
    
    const [listProducts, setListProducts] = useState([])
    const numberOfFirstProducts = 10;

    useEffect(() => {
        announcementsService.getXFirst(numberOfFirstProducts).then((response)=>setListProducts(response))
    }, [])

    setTimeout(()=>{console.log(listProducts)},10)

   
    const styleDiv = {
        marginLeft : '3vh',
        marginRight : '3vh'
    }

    const gridStyle = {
        padding:'1vh'
    }

    const cardStyle = {
        borderColor: 'red',
        borderRadius: 0,
        background: 'linear-gradient(90deg, rgba(198, 223, 186, 0.5) 0%, rgba(152, 200, 135, 0.5) 100%)',
        minWidth: '30vh',
        minHeight: '50vh'
    }

    const borderStyle = {
        background: 'linear-gradient(129deg, rgba(152,200,100,1) 0%, rgba(5,138,174,1) 84%, rgba(5,90,120,1) 100%)',
        padding: '0.4vh',
        borderRadius: 0
    }

    const backPaper = {
        background: 'white'
    }

    const priceTyppo = {
        float: 'right',
        fontWeight: "bold",
        fontSize: '20px'
    }

    const generationProductsToCarrousel = () =>{
        return listProducts.map((product) => (
            <div style={styleDiv}>
            <Grid item style={gridStyle}>
                <Paper style={borderStyle}>
                    <Paper style={backPaper}>
                        <Card style={cardStyle}>
                            <CardMedia
                                component="img"
                                height={300}
                                image={house}
                                alt = "House and garden"
                            />
                            <CardContent>
                                <Grid container display="flex" justify="space-between">
                                    <Grid item xs={8}>
                                    <Link style={{textDecoration: 'none', color: 'black'}} to={`/announcement/${product.announcementId}`}>
                                        <Typography variant="h5" display="inline" align="left">{product.name}</Typography>
                                    </Link>
                                    </Grid>
                                    <Grid item xs={4} >
                                        <Typography display="inline" style={priceTyppo} >{product.price == 0? "A donner" : product.price + " €"}</Typography>
                                    </Grid>
                                </Grid>
                                <Typography>{product.description}</Typography>
                            </CardContent>
                        </Card>
                    </Paper>
                </Paper>
            </Grid>
            </div>
        ))
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
        >
            {generationProductsToCarrousel()}
      </Carousel>
    )
}

export default Carrousel