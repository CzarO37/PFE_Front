import React, {useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {
    Grid,
    Paper,
    Avatar,
    Container,
    Typography,
    TextField,
    Button,
    FormControl,
    InputAdornment,
    InputLabel,
    Input, MenuItem, RadioGroup, FormControlLabel, Radio, FormLabel,Snackbar,Dialog
} from '@mui/material'
import { DropzoneArea } from 'material-ui-dropzone';
import announcementsService from "../../services/announcements";
import categoriesService from "../../services/categories";
import mediasService from "../../services/medias";
import storage from "../../services/storage";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";

const NewAnnouncement = () => {
    const history = useHistory()
    const token = storage.getToken()
    
    if (!token) {
        history.push('/login')
    }

    const [parentCategoryId, setParentCategoryId] = useState([])
    const [catList, setCatList] = useState([])
    const [open, setOpen] = useState();

    const [booleanProduct, setBooleanProduct] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [tag, setTag] = useState('')
    const [description, setDescription] = useState('')

    const [imageList, setImageList] = useState('')

    const maxFilesLimit = 3

    useEffect(() => {
        categoriesService.getAll().then((response)=>setCatList(response))
    }, [])


    const generateCatItems = (categoryId) => {
        return catList.filter(category=>
            category.categoryId === categoryId).map(filteredCategory =>
            filteredCategory.children.map((cat) =>(
                    <MenuItem key={cat.categoryId} value={cat.categoryId}>
                        {cat.name}
                    </MenuItem>
                )
            ))
    }

    const generateChildCatSelect = () => {
        if (parentCategoryId > 0)
            return (
                <TextField style={inputStyle}
                           id="child-category"
                           select
                           label="Sous catégorie"
                           helperText="Pour plus de précision, sélectionnez une sous-catégorie"
                           variant="standard"
                           onChange={handleChildCategoryChange}
                >
                    {generateCatItems(parentCategoryId)}
                </TextField>
            )
        else
            return( <br /> )
    }

    const handleNameChange = (e) => {
        e.preventDefault()
        const newName = e.target.value
        setName(newName)
    }

    const handlePriceChange = (e) => {
        e.preventDefault()
        const newPrice = e.target.value
        setPrice(newPrice)
    }

    const handleBooleanProductChange = (e) => {
        e.preventDefault()
        const boolean = e.target.value
        setBooleanProduct(boolean)
    }

    const handleCategoryChange = (e) => {
        e.preventDefault()
        const newCategory = e.target.value
        setParentCategoryId(newCategory)
        setCategoryId(newCategory)
    }

    const handleChildCategoryChange = (e) => {
        e.preventDefault()
        const newCategory = e.target.value
        setCategoryId(newCategory)
    }

    const handleDescriptionChange = (e) => {
        e.preventDefault()
        const des = e.target.value
        setDescription(des)
    }

    const handleTagChange = (e) => {
        e.preventDefault()
        const newTag = e.target.value
        setTag(newTag)
    }


    const handelImagesChange = (images) => {
        setImageList(images)
    }



    const handleNewAnnouncement = (event) => {
        event.preventDefault()

        if (imageList.length == 0) {
            return alert("Veuillez entrez au minimum une photo!")

        } else {

            const announcement = {
                name: name,
                description: description,
                price: price,
                categoryId: categoryId,
                isProduct: booleanProduct,
                tag: tag,
            }
            let res = ''
            announcementsService.addNewAnnouncement(announcement, token)
                .then(response => {
                    res = response
                    console.log("res: ", res)
                    const announcementId = res.announcementId

                    imageList.map((img) =>(
                            mediasService.uploadImage(announcementId, img, token)
                        )
                    )
                    history.push(`/announcement/${announcementId}`)

                })
        }

    }

    const containerStyle = {
        height: '100%',
    }

    const framesStyle = {
        'background': 'linear-gradient(129deg, rgba(152,200,100,1) 0%, rgba(5,138,174,1) 84%, rgba(5,90,120,1) 100%)',
        padding:"0.3vh",
        marginTop: '14vh',
    }

    const submitStyle = {
        'marginTop': '4vh',
        width: '45%',
        'background': 'linear-gradient(129deg, rgba(152,200,100,1) 0%, rgba(5,138,174,1) 84%, rgba(5,90,120,1) 100%)',
        marginBottom:'2vh'
    }

    const inputStyle = {
        width: '70%'
    }

    const signUpFormStyle = {
        padding: 20,
        marginTop: "14vh"
    }

    return (

            <Container>
                <Typography variant="h4" fontWeight={'bold'} textAlign={'center'}>Ajouter une nouvelle annonce</Typography>
                <Link to="/categories"><Button startIcon={<KeyboardBackspaceOutlinedIcon/>}>Retour</Button></Link>
                <Paper style={framesStyle}>
                    <Paper style={{background:'#e2efdc'}}>
                        <form onSubmit={handleNewAnnouncement}>
                        <Grid container justifyContent="space-around" >
                            <Grid xs={12} sm={12} md={6} xl={6} align="center" style={{marginTop:'2vh'}}>
                            <TextField style={inputStyle}
                                           required
                                           id="name"
                                           label="Nom de votre annonce"
                                           variant="standard"
                                           onChange={handleNameChange}
                                />
                                <TextField style={inputStyle}
                                           required
                                           id="price"
                                           label= "Prix proposé"
                                           type="number"
                                           inputProps={{ min: "0", max: "100000", step: "0.01" }}
                                           variant="standard"
                                           onChange={handlePriceChange}
                                />
                                <TextField style={inputStyle}
                                           required
                                           id="category"
                                           select
                                           label="Catégorie"
                                           helperText="Sélectionnez une catégorie pour votre annonce"
                                           variant="standard"
                                           onChange={handleCategoryChange}
                                >
                                    {catList.filter(parentCategories => parentCategories.parentCategoryId == null).map((cat) => (
                                        <MenuItem key={cat.categoryId} value={cat.categoryId}>
                                            {cat.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                {generateChildCatSelect()}
                                
                            </Grid>
                            <Grid xs={12} sm={6} md={6} xl={6} align="center" marginTop={'4vh'}>
                            <FormControl component="fieldset">
                                    <FormLabel component="legend">Je désire: </FormLabel>
                                    <RadioGroup name="tag">
                                        <FormControlLabel value="BARTER" control={<Radio/>} label="Offre de troc"
                                                          onChange={handleTagChange}/>
                                        <FormControlLabel value="SELL" control={<Radio/>} label="Offre d'achat"
                                                          onChange={handleTagChange}/>
                                        <FormControlLabel value="BOTH" control={<Radio/>} label="Offre de troc/achat"
                                                          onChange={handleTagChange}/>
                                    </RadioGroup>
                                </FormControl>
                            <FormControl component="fieldset">
                                <Grid container>
                                    <Grid item xl={3}>
                                        <FormLabel component="legend">Type: </FormLabel>
                                    </Grid>
                                    <Grid item xl={9}>
                                    <RadioGroup row name="type">
                                        <FormControlLabel value="True" control={<Radio/>} label="Objet"
                                                          onChange={handleBooleanProductChange}/>
                                        <FormControlLabel value="False" control={<Radio/>} label="Service"
                                                          onChange={handleBooleanProductChange}/>
                                    </RadioGroup>
                                    </Grid>
                                </Grid>
                                    
                                    
                                </FormControl>
                            </Grid>
                            <Grid xs={11} sm={11} md={11} xl={11} align="center">
                                <TextField align="center"
                                    fullWidth
                                    label="Description"
                                    inputProps={{
                                        maxlength: 300
                                    }}
                                    helperText={`${description.length}/300`}
                                    onChange={handleDescriptionChange}
                                    margin="normal"
                                    variant="outlined"
                                    multiline
                                    maxRows={4}
                                    minRows={4}
                                        
                                />
                            </Grid>
                            <Grid xs={11} sm={11} md={11} xl={11} align="center">
                            <DropzoneArea
                                    acceptedFiles={['image/*']}
                                    dropzoneText={"Placez vos images ici ou cliquez"}
                                    onChange={(files) => {handelImagesChange(files); console.log('Files:', files)}}
                                    showFileNames
                                    showAlerts={true}
                                    filesLimit={maxFilesLimit}
                                    // maxFileSize={3000000}
                                    previewText={"max"}
                                    getFileLimitExceedMessage={(filesLimit => `Vous ne pouvez ajouter que maximum ${filesLimit} images.`)}
                                    getFileAddedMessage={(fileName => `La photo ${fileName} a bien été ajoutée.`)}
                                    getFileRemovedMessage={(fileName => `La photo ${fileName} a bien été retirée.`)}
                                    getDropRejectMessage={rejectedFile => `Le fichier ${rejectedFile.name} ne peut pas être ajouté. Le type de ce fichier n'est pas accepté.`}
                                />
                                <FormLabel>Maximum {maxFilesLimit} images</FormLabel>
                            </Grid>
                            <Button type="submit" variant="contained" style={submitStyle} padding='1vh'>Créer l'annonce</Button>
                        </Grid>
                        </form>
                    </Paper>
            </Paper>
        </Container>

    )
};

export default NewAnnouncement;