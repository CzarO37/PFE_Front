import React from 'react'
import { Switch, Route, useRouteMatch, Link} from 'react-router-dom'

import HomePage from "./Components/HomePage/HomePage";
import LoginPage from "./Components/LoginPage/LoginPage";
import ProductsPage from './Components/ProductsPage/ProductsPage';
import SignUpPage from "./Components/SignUpPage/SignUpPage";
import AnnouncementPage from './Components/AnnouncementPage/AnnouncementPage';
import CategoriePage from './Components/CategoriePage/CategoriePage';
import Navbar from './Components/Navbar/Navbar';

const RouterApp = () => {


    return (
        <div>
            <Switch>
                <Route path={"/login"}>
                    <LoginPage />
                </Route>
                <Route path={"/signup"}>
                    <SignUpPage />
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
                <Route path={"/"}>
                    <HomePage />
                </Route>
            </Switch>
        </div>
    )
}

export default RouterApp

