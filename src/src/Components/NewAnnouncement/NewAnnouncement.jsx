import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {Grid, Paper, Avatar, Container, Typography, TextField, Button} from '@mui/material'


const containerStyle = {
    height: '100%',
}

const framesStyle = {
    'background': 'linear-gradient(129deg, rgba(152,200,100,1) 0%, rgba(5,138,174,1) 84%, rgba(5,90,120,1) 100%)',
    padding:"0.3vh"
}

const inputStyle = {
    width: '70%'
}

const NewAnnouncement = () => {


    return (

        <Container style={containerStyle}>
            <Paper style={framesStyle}>
                <Paper>
                    <form>
                        <Grid align="center">
                            <TextField style={inputStyle}
                                       required
                                       id="name"
                                       label="Nom de votre annonce"
                                       variant="standard"
                                       onChange={handleNameChange}
                            />
                        </Grid>
                    </form>
                </Paper>
            </Paper>
        </Container>

    )
};

export default NewAnnouncement;