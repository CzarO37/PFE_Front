import React from 'react'
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom'

import App from './Components/App/App'
import LoginPage from "./Components/LoginPage/LoginPage";
import SignUpPage from "./Components/SignUpPage/SignUpPage";

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
            </Switch>
        </div>
    )
}

export default RouterApp

