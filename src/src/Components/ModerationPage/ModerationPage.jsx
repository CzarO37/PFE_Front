import React, {useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {Grid,Paper,Avatar,Container,Typography,Button,ButtonGroup, CircularProgress} from '@mui/material'
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';

import usersService from "../../services/users.js"
import reportService from "../../services/reports.js"
import storage from '../../services/storage';

const titlestyle = {
    color:'#7BA66C',
    fontWeight:'bold'
}

const subTitleStyle = {
    color : 'black',
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
    margin: '1vh'
}

const backPaper = {
    background: '#e2efdc'
}



  

const ModerationPage = () => {
    const history = useHistory()
    const token = storage.getToken()
    
    
    //redirect to homepage if not moderator
    if(!token) {
        history.pushState("/")
    }
    usersService.getMe(token).then((response) => {
        if(response.role !== "MODERATOR"){
            history.pushState("/")
        }
    })

    const [userList, setUserList] = useState([])
    const [reportList, setReportList] = useState([])

    useEffect(() => {
        usersService.getAll(token).then((response) => {
            setUserList(response)
            reportService.getAllUntreated(token).then((response) => {
                setReportList(response)
            })
        })
    }, [])

    const banButtonStyle = {
        background: 'linear-gradient(129deg, rgba(232,10,24,1) 0%, rgba(232,93,24,1) 84%, rgba(232,150,24,1) 100%)'
    }
    const unbanButtonStyle = {
        background: 'linear-gradient(129deg, rgba(152,200,100,1) 0%, rgba(5,138,174,1) 84%, rgba(5,90,120,1) 100%)'
    }

    

    const getStatus = (isBanned) => {
        if(isBanned) return "Banni"
        return ""
    }
    const getButtonLabel = (isBanned) => {
        if(isBanned) return "Unban"
        return "Ban"
    }
    const getButtonStyle = (isBanned) => {
        if(isBanned) return unbanButtonStyle
        return banButtonStyle
    }

    const updateUsers = () => {
        usersService.getAll(token).then((response) => {
            setUserList(response)
        })
    }

    const updateReports = () => {
        reportService.getAllUntreated(token).then((response) => {
            setReportList(response)
        })
    }

    const toggleBanHandler = (user) => {
        if(user.isBanned) {
            usersService.unban(user.userId, token).then(updateUsers)
        } else {
            usersService.ban(user.userId, token).then(updateUsers)
        }
    }

    const blockHandler = (report) => {
        reportService.block(token, report.reportId)
        updateReports()
    }

    const closeHandler = (report) => {
        reportService.close(token, report.reportId)
        updateReports()
    }

    const getButton = (u) => {
        if(u.role === "MODERATOR") {
            return
        }
        return (
            <Button
            onClick={() => toggleBanHandler(u)}
            variant="contained" 
            style={getButtonStyle(u.isBanned)}>{getButtonLabel(u.isBanned)}</Button>
        )
    } 

    const renderReport = () => {
        if (reportList.length===0) return <Typography align={'center'}>Rien à afficher</Typography>
        return (
            reportList.map((r)=>
            <Grid container xs={12} style={{margin: '2vh'}}>
                <Grid item xs={4}>
                    <Link to={`/announcement/${r.announcementId}`}><Typography textAlign={'left'}>{r.announcement.name}</Typography></Link>
                </Grid>
                <Grid item xs={2}>
                    <Typography textAlign={'left'}>{r.category}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography textAlign={'left'}>{r.content}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Button
                    onClick={()=>closeHandler(r)}
                    variant="contained" 
                    style={unbanButtonStyle}>Fermer sans suite</Button>
                </Grid>
                <Grid item xs={2}>
                    <Button
                    onClick={()=>blockHandler(r)}
                    variant="contained" 
                    style={banButtonStyle}>Bloquer l'annonce</Button>
                </Grid>
            </Grid>
            )
        )
        
    }

    const renderUsers = () => {
        if (userList.length===0) return <Typography>Rien à afficher</Typography>
        return (
        
            userList.map((u)=> (
                <>
                <Grid container xs={12} style={{margin: '2vh'}}>
                <Grid item xs={3}>
                    
                    <Typography textAlign={'left'}>{u.firstname} {u.lastname}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography textAlign={'left'}>{u.email}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography textAlign={'left'}>{u.role}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography textAlign={'center'}>{getStatus(u.isBanned)}</Typography>
                </Grid>
                <Grid item xs={1}>
                    {getButton(u)}
                </Grid>
                </Grid>
                </>
            ))
       
        )
    }

    return (
        <Container>
            <Typography variant="h3" textAlign={"center"} style={titlestyle}>Modération</Typography>
            <Link to="/"><Button startIcon={<KeyboardBackspaceOutlinedIcon/>}>Retour</Button></Link>
            <Paper style={borderStyle}>
                <Paper style={backPaper}>
                    <Typography variant='h4' textAlign={"center"} style={subTitleStyle} padding={'2vh'}>Reports</Typography>
                    <Grid container padding={'4vh'}>
                        <Grid item xl={12}>
                            <Paper>
                            <Grid container>
                            <Grid item xs={12} xl={3}>
                                    <Typography variant="h6" textAlign={'left'} fontWeight={'bold'}>Nom de l'annonce</Typography>
                                </Grid>
                                <Grid item xs={12} xl={4}>
                                    <Typography variant="h6" textAlign={'left'} fontWeight={'bold'}>Catégorie</Typography>
                                </Grid>
                                <Grid item xs={12} xl={2}>
                                    <Typography variant="h6" textAlign={'left'} fontWeight={'bold'}>Commentaire</Typography>
                                </Grid>
                                <Grid item xl={12}>
                                    {renderReport()}
                                </Grid>
                            </Grid>
                            </Paper>
                                
                        </Grid>

                    </Grid>
                    {/* <Grid container padding={'4vh'}>
                        <Paper>
                            <Grid container style={{margin: '2vh'}}>
                                <Grid item xl={3}>
                                    <Typography variant="h6" textAlign={'left'} fontWeight={'bold'}>Nom de l'annonce</Typography>
                                </Grid>
                                <Grid item xl={4}>
                                    <Typography variant="h6" textAlign={'left'} fontWeight={'bold'}>Catégorie</Typography>
                                </Grid>
                                <Grid item xl={2}>
                                    <Typography variant="h6" textAlign={'left'} fontWeight={'bold'}>Commentaire</Typography>
                                </Grid>
                                <Grid item xl={12}>
                                    {renderReport()}
                                </Grid>
                                
                            </Grid>
                        </Paper>
                    </Grid> */}
                </Paper>
            </Paper>
            <Paper style={borderStyle}>
                <Paper style={backPaper}>
                    <Typography variant='h4' textAlign={"center"} style={subTitleStyle} padding={'2vh'}>Users</Typography>
                    <Grid container padding={'4vh'}>
                        <Paper>
                        <Grid container xs={12} style={{margin: '2vh'}}>
                            <Grid item xs={3}>
                                <Typography variant="h6" textAlign={'left'} fontWeight={'bold'}>Nom complet</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="h6" textAlign={'left'} fontWeight={'bold'}>E-mail</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="h6" textAlign={'left'} fontWeight={'bold'}>Role</Typography>
                            </Grid>
                            {renderUsers()}
                        </Grid>
                        </Paper>
                    </Grid>
                </Paper>
            </Paper>
        </Container>
    )
}

export default ModerationPage