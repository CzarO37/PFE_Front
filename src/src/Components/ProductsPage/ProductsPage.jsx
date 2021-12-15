import { Button,Card, CardContent, CardMedia, Container, Grid, Pagination, Paper, Typography } from '@mui/material'
import React, {useState, useEffect} from 'react'
import annoncementsService from '../../services/announcements.js'
import house from '../../images/products/house.jpg'
import './ProductPage.css'
import { Link, useLocation } from 'react-router-dom'
import categorieService from '../../services/categories.js'
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';


const ProductsPage = (props) => {

    const [productList, setProductList] = useState([])
    const [categoryList, setCategoryList] = useState([])
    const [categoryName, setCategoryName] = useState('Les produits')

    const search = useLocation().search;
    const categoryId = new URLSearchParams(search).get('categoryId')


    useEffect(()=>{
        
        if(categoryId === null){
            annoncementsService.getAll().then((response)=>setProductList(response))
        }else{
            categorieService.getAll().then((response)=>setCategoryList(response))
            annoncementsService.getProductByCategoryId(categoryId).then((response)=> {
                setProductList(response)
            })
        }
    },[])

    setTimeout(()=>{categoryList.filter(category => category.categoryId == categoryId).map(category => setCategoryName(category.name))},10)

    //Pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [productsPerPage, setProductsPerPage] = useState(9)


    const indexOfLastProduct = currentPage*productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = productList.slice(indexOfFirstProduct, indexOfLastProduct)


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
        background: 'linear-gradient(90deg, rgba(198, 223, 186, 0.5) 0%, rgba(152, 200, 135, 0.5) 100%)',
        height: '60vh'
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

    const productsRender = (slicedProductList) =>{
        return slicedProductList.map(product => (
            
            <Grid item xs={12} md={6} xl={4} style={gridStyle}>
                <Paper style={borderStyle}>
                    <Paper style={backPaper}>
                        <Card style={cardStyle}>
                            <CardMedia
                                component="img"
                                height={340}
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
                                        <Typography display="inline" style={priceTyppo} justifyContent="flex-end" >{product.price == 0? "A donner" : product.price + " €"}</Typography>
                                    </Grid>
                                </Grid>
                                <Typography>{product.description}</Typography>
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
                        <Typography style={titleStyle}>{categoryName}</Typography>
                    </Grid>
                    <Link to="/categories"><Button startIcon={<KeyboardBackspaceOutlinedIcon/>}>Retour</Button></Link>                    
                    <Grid item xs ={12} align="end">
                        <Typography>Filtres</Typography>
                    </Grid>
                    <Grid container justifyContent="space-between" >
                        {productsRender(currentProducts)}
                    </Grid>
                    
                </Grid>
                <Pagination style={{display:'flex', justifyContent:'center'}} onChange={(event, value)=>setCurrentPage(value)} count={Math.ceil(productList.length/productsPerPage)} variant="outlined" color="primary" />
            </Container>
        </div>
    )
}

export default ProductsPage
