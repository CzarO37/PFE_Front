import React, {useState} from 'react'
import { Switch, Route, useRouteMatch, Link, useHistory} from 'react-router-dom'
import {Avatar} from '@mui/material'

import HomePage from "./Components/HomePage/HomePage";
import LoginPage from "./Components/LoginPage/LoginPage";
import ProductsPage from './Components/ProductsPage/ProductsPage';
import SignUpPage from "./Components/SignUpPage/SignUpPage";
import AnnouncementPage from './Components/AnnouncementPage/AnnouncementPage';
import CategoriePage from './Components/CategoriePage/CategoriePage';
import Navbar from './Components/Navbar/Navbar';
import UserProfile from './Components/UserProfile/UserProfile'
import NewAnnouncement from "./Components/NewAnnouncement/NewAnnouncement";
import ModerationPage from './Components/ModerationPage/ModerationPage';
import storageService from './services/storage.js'
import usersService from './services/users.js'


const RouterApp = () => {
    const [userPhoto, setUserPhoto] = useState('')
    const [userAvatar, setUserAvatar] = useState('')


    if(!sessionStorage.getItem('token')) {
        let token = storageService.getToken()
        if(token !== undefined) {
            //remember me token found
            usersService.loginViaRememberMe(token).then((response) => {
                storageService.storeUser(response.user)
                storageService.storeToken(response.token, true)
            })
        }
        
    }
    

    return (
        <div>
            <Switch>
                <Route path={"/login"}>
                    <LoginPage />
                </Route>
                <Route path={"/signup"}>
                    <SignUpPage />
                </Route>
                <Route path={"/newAnnouncement"}>
                    <Navbar/>
                    <NewAnnouncement />
                </Route>
                <Route path={`/announcement/:id`}>
                    <Navbar/>
                    <AnnouncementPage/>
                </Route>
                <Route path={"/products"}>
                    <Navbar/>
                    <ProductsPage/>
                </Route>
                <Route path={"/categories"}>
                    <Navbar/>
                    <CategoriePage/>
                </Route>
                <Route path={"/myAccount"}>
                    <Navbar/>
                    <UserProfile/>
                </Route>
                <Route path={"/moderation"}>
                    <Navbar/>
                    <ModerationPage/>
                </Route>
                <Route path={"/"}>
                    <HomePage/>
                </Route>
            </Switch>
        </div>
    )
}

export default RouterApp
