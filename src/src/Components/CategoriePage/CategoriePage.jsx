import { Button, Card, CardContent, CardMedia, Container, Grid, List ,ListItem, ListItemText, Paper, Typography } from '@mui/material'
import React, {useState, useEffect} from 'react'
import house from '../../images/categories/house.jpg'
import vetements from '../../images/categories/vetements.jpg'
import loisir from '../../images/categories/loisir.jpg'
import famille from '../../images/categories/famille.jpg'
import electronique from '../../images/categories/electronics.jpg'
import categorieService from '../../services/categories.js'
import NewReleasesOutlinedIcon from '@mui/icons-material/NewReleasesOutlined';
import { useLocation, Link, useHistory} from 'react-router-dom'
import storage from '../../services/storage'

const CategoriePage = () => {

    const [list, setList] = useState([])
    const search = new useLocation().search;
    const category = new URLSearchParams(search).get('category')
    
    const token = storage.getToken()
    let history = useHistory()
    if(!token) {
        history.push("/login")
    }

    useEffect(() => {
        categorieService.getAll().then((response)=>setList(response))
    }, [])
   

   const generate = (categoryId) => {
        return list.filter(category=> 
            category.categoryId == categoryId).map(filteredCategory => 
                filteredCategory.children.map((catego) =>(
                    <ListItem>
                        <Link style={{textDecoration: 'none', color: 'black'}} to={`/products?categoryId=${catego.categoryId}`}><ListItemText primary={catego.name}/></Link>
                    </ListItem>
                ) 
            ))
    }
    
    const titleStyle = {
        color : '#7BA66C',
        fontSize: '30px',
        fontWeight: 'bold'
    }

    const gridStyle = {
        paddingBottom: '20px',
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

    const consoleCategory = () =>{
        console.log("My category is : " + category)
    }

    const sousTextStyle = {
        color : '#7BA66C',
        fontSize: '20px',
        fontWeight: 'bold'
    }

    return (
        <div>
            <Container maxWidth="xl">
                <Grid container>
                    <Grid item xs={12} align="center" style={{paddingBottom:'3vh'}}>
                        <Typography style={titleStyle}>Les Categories</Typography>
                    </Grid>
                    <Grid container justifyContent="space-between" align="center">
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
                                        <Link style={{textDecoration: 'none', color: 'black'}} to="/products?categoryId=1"><Typography variant="h4">Maison et Jardin</Typography></Link>
                                            <List>
                                                {generate(1)}
                                            </List>
                                        </CardContent>
                                    </Card>
                                </Paper>
                            </Paper>
                        </Grid>
                        <Grid xs={12} md={6} xl={4} style={gridStyle}> 
                            <Paper style={borderStyle}>
                                <Paper style={backPaper}>
                                    <Card style={cardStyle}>
                                        <CardMedia
                                            component="img"
                                            height={140}
                                            image={famille}
                                            alt = "House and garden"
                                        />
                                        <CardContent>
                                        <Link style={{textDecoration: 'none', color: 'black'}} to="/products?categoryId=2"><Typography variant="h4">Famille</Typography></Link>
                                            <List>
                                                {generate(2)}
                                            </List>
                                        </CardContent>
                                    </Card>
                                </Paper>
                            </Paper>
                        </Grid>
                        <Grid xs={12} md={6} xl={4} style={gridStyle}>
                            <Paper style={borderStyle}>
                                <Paper style={backPaper}>
                                    <Card style={cardStyle}>
                                        <CardMedia
                                            component="img"
                                            height={140}
                                            image={vetements}
                                            alt = "House and garden"
                                        />
                                        <CardContent>
                                        <Link style={{textDecoration: 'none', color: 'black'}} to="/products?categoryId=3"><Typography variant="h4">V??tements et accessoires</Typography></Link>
                                            <List>
                                                {generate(3)}
                                            </List>
                                        </CardContent>
                                    </Card>
                                </Paper>
                            </Paper>
                        </Grid>
                        <Grid item xl={4} md={6} xs={12} style={gridStyle}>
                            <Paper style={borderStyle}>
                                <Paper style={backPaper}>
                                    <Card style={cardStyle}>
                                        <CardMedia
                                            component="img"
                                            height={140}
                                            image={loisir}
                                            alt = "House and garden"
                                        />
                                        <CardContent>
                                        <Link style={{textDecoration: 'none', color: 'black'}} to="/products?categoryId=4"><Typography variant="h4">Loisir - hobbys</Typography></Link>
                                            <List>
                                                {generate(4)}
                                            </List>
                                        </CardContent>
                                    </Card>
                                </Paper>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6} xl={4} style={gridStyle}>
                            <Paper style={borderStyle}>
                                <Paper style={backPaper}>
                                    <Card style={cardStyle}>
                                        <CardMedia
                                            component="img"
                                            height={140}
                                            image={electronique}
                                            alt = "House and garden"
                                        />
                                        <CardContent>
                                        <Link style={{textDecoration: 'none', color: 'black'}} to="/products?categoryId=5"><Typography variant="h4">Electronique</Typography></Link>
                                            <List>
                                                {generate(5)}
                                            </List>
                                        </CardContent>
                                    </Card>
                                </Paper>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6} xl={4} style={gridStyle}>

                        </Grid>
                        <Grid item xs={12} align="center" style={{paddingBottom:'3vh'}}>
                            <Typography style={sousTextStyle}><NewReleasesOutlinedIcon/> Tu ne sais pas ce que tu cherches? D??couvre nos produits les plus r??cents <NewReleasesOutlinedIcon/></Typography>
                            <Button href={"/products"} variant="contained" size="large" style={{marginTop:'2vh',background: 'linear-gradient(129deg, rgba(152,200,100,1) 0%, rgba(5,138,174,1) 84%, rgba(5,90,120,1) 100%)'}}>Vers les plus r??cents</Button>
                        </Grid>
                    </Grid>
                    
                </Grid>
            </Container>
        </div>
    )
}

export default CategoriePage