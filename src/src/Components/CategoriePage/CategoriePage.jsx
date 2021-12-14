import { Card, CardContent, CardMedia, Container, Grid, List ,ListItem, ListItemText, Paper, Typography } from '@mui/material'
import React, {useState, useEffect} from 'react'
import house from '../../images/categories/house.jpg'
import vetements from '../../images/categories/vetements.jpg'
import loisir from '../../images/categories/loisir.jpg'
import famille from '../../images/categories/famille.jpg'
import electronique from '../../images/categories/electronics.jpg'
import categorieService from '../../services/categories.js'

const CategoriePage = () => {

    const [list, setList] = useState([])

    useEffect(() => {
        categorieService.getAll().then((response)=>setList(response))
    }, [])
   

   const generate = (categoryId) => {
        return list.filter(category=> 
            category.categoryId == categoryId).map(filteredCategory => 
                filteredCategory.children.map((catego) =>(
                    <ListItem>
                        <ListItemText
                            primary={catego.name}
                        />
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
                                            <Typography variant="h4">Maison et Jardin</Typography>
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
                                            <Typography variant="h4">Famille</Typography>
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
                                            <Typography variant="h4">Vêtements et accessoires</Typography>
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
                                            <Typography variant="h4">Loisir - hobbys</Typography>
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
                                            <Typography variant="h4">Electronique</Typography>
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
                    </Grid>
                    
                </Grid>
            </Container>
        </div>
    )
}

export default CategoriePage