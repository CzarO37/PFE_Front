import React, {useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {Grid,Paper,Avatar,Container,Typography,Button,ButtonGroup} from '@mui/material'
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import { margin } from '@mui/system';

import usersService from "../../services/users.js"
import reportService from "../../services/reports.js"
import storage from '../../services/storage';

const titlestyle = {
    color:'#7BA66C',
    fontWeight:'bold'
}

const subTitleStyle = {
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
    borderRadius: 0,
    margin: '1vh'
}

const backPaper = {
    background: 'white'
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

    return (
        <Container>
            <Typography variant="h3" textAlign={"center"} style={titlestyle}>Modération</Typography>
            <Link to="/"><Button startIcon={<KeyboardBackspaceOutlinedIcon/>}>Retour</Button></Link>
            <Paper style={borderStyle}>
                <Paper style={backPaper}>
                    <Typography variant='h4' textAlign={"center"} style={subTitleStyle}>Users</Typography>
                    <Grid container>
                        {userList.map((u)=> 
                            <Grid container xs={12} style={{margin: '2vh'}}>
                                <Grid item xs={3}>
                                    <Typography textAlign={'left'}>{u.firstname} {u.lastname}</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography textAlign={'left'}>{u.email}</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography textAlign={'left'}>Role: {u.role}</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography textAlign={'center'}>{getStatus(u.isBanned)}</Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    {getButton(u)}
                                </Grid>
                            </Grid>)}
                    </Grid>
                </Paper>
            </Paper>
            <Paper style={borderStyle}>
                <Paper style={backPaper}>
                    <Typography variant='h4' textAlign={"center"} style={subTitleStyle}>Reports</Typography>
                    <Grid container>
                        {reportList.map((r)=>
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
                        )}
                    </Grid>
                </Paper>
            </Paper>
        </Container>
    )
}

export default ModerationPage