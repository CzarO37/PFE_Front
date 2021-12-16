import { FormControl, Grid, InputLabel, MenuItem, Select, Slider, TextField, Typography } from '@mui/material'
import React, {useState, useEffect} from 'react'
import campusesService from '../../services/campuses'


const Filtres = ({setCampusFilter, setMinPrice, setMaxPrice}) => {

    const [campusList, setCampusList] = useState([])

    useEffect(() => {
        return campusesService.getAll().then((response)=>(setCampusList(response)))
    }, [])

    const generateCampusFilter = () =>{
        return campusList.map((campus)=>
            <MenuItem key={campus.campusId} value={campus.campusId}>{campus.name}</MenuItem>
    )
    }

    const handleMinPrice = (e) =>{
        e.preventDefault()
        const minPrice = e.target.value
        setMinPrice(minPrice)
        console.log(minPrice)
    }

    const handleMaxPrice = (e) =>{
        e.preventDefault()
        const maxPrice = e.target.value
        setMaxPrice(maxPrice)
        console.log(maxPrice)
    }

    return (
        <div>
            <Grid container>
                <Grid item xl={4} md={6} xs={12} paddingRight="2vh">
                    <FormControl fullWidth>
                        <InputLabel>Campus</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Campus"
                            onChange={(event, value)=>setCampusFilter(value.props.value)}
                        >
                            <MenuItem value=""><em>Tous</em></MenuItem>
                            {generateCampusFilter()}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xl={4} md={6} xs={6} paddingLeft="3vh" align="left">
                <TextField  onChange={handleMinPrice} style={{paddingRight:"2vh"}} id="standard-basic" label="Min prix" variant="standard" />
                <TextField onChange={handleMaxPrice} id="standard-basic" label="Max prix" variant="standard" />
                </Grid>
            </Grid>
        </div>
    )
}

export default Filtres
