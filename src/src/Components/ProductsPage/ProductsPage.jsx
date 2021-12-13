import { Card, CardContent, CardMedia, Container, Grid, Paper, Typography } from '@mui/material'
import React, {useState, useEffect} from 'react'
import annoncementsService from '../../services/announcements.js'
import house from '../../images/products/house.jpg'
import './ProductPage.css'

const ProductsPage = (props) => {
    
    const [productList, setProductList] = useState([])

    useEffect(()=>{
        annoncementsService.getAll().then((response)=>setProductList(response))
    }, [])

    const titleStyle = {
        color : '#7BA66C',
        fontSize: '30px',
        fontWeight: 'bold'
    }

    const gridStyle = {
        paddingBottom: '1vh',
        padding:'1vh'
    }

    const cardStyle = {
        borderColor: 'red',
        borderRadius: 0,
        background: 'linear-gradient(90deg, rgba(198, 223, 186, 0.5) 0%, rgba(152, 200, 135, 0.5) 100%)'
    }

    const borderStyle = {
        background: 'linear-gradient(129deg, rgba(152,200,100,1) 0%, rgba(5,138,174,1) 84%, rgba(5,90,120,1) 100%)',
        padding: '0.4vh',
        borderRadius: 0
    }

    const backPaper = {
        background: 'white'
    }

    const productsRender = () =>{
        return productList.map(product => (
            <Grid xs={12} md={6} xl={4} style={gridStyle}>
                <Paper style={borderStyle}>
                    <Paper style={backPaper}>
                        <Card style={cardStyle}>
                            <CardMedia
                                component="img"
                                height={140}
                                image={house}
                                alt = "House and garden"
                            />
                            <CardContent>
                                <Typography variant="h4">{product.name}</Typography>
                                <Typography>{product.description}</Typography>
                                <Typography>{product.price} €</Typography>
                            </CardContent>
                        </Card>
                    </Paper>
                </Paper>
            </Grid>
        ))
    }

    return (
        <div>
            <Container maxWidth="xl">
                <Grid container>
                    <Grid item xs={12} align="center" style={{paddingBottom:'3vh'}}>
                        <Typography style={titleStyle}>Produits</Typography>
                    </Grid>
                    <Grid item xs ={12} align="end">
                        <Typography>Filtres</Typography>
                    </Grid>
                    <Grid container justifyContent="space-between" align="center">
                        {productsRender()}
                    </Grid>
                </Grid> 
            </Container>
        </div>
    )
}

export default ProductsPage
