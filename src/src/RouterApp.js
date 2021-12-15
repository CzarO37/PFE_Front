import React from 'react'
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom'

import HomePage from "./Components/HomePage/HomePage";
import LoginPage from "./Components/LoginPage/LoginPage";
import SignUpPage from "./Components/SignUpPage/SignUpPage";
import CategoriePage from './Components/CategoriePage/CategoriePage';

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
                <Route path={"/"}>
                    <HomePage />
                </Route>
                <Route path={"/categories"}>
                    <CategoriePage/>
                </Route>
            </Switch>
        </div>
    )
}

export default RouterApp

