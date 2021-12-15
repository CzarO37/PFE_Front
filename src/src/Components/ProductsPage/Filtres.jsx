import { FormControl, Grid, InputLabel, MenuItem, Select, Slider, Typography } from '@mui/material'
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
                <Grid item xl={4} md={6} xs={6} paddingLeft="2vh">
                <Typography align="left">Prix :</Typography>
                <Slider
                    getAriaLabel={() => 'Minimum distance'}
                    //value={value1}
                    //onChange={handleChange1}
                    valueLabelDisplay="auto"
                    //getAriaValueText={valuetext}
                    disableSwap
                    />
                </Grid>
            </Grid>
        </div>
    )
}

export default Filtres
