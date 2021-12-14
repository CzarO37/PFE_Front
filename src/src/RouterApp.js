import React from 'react'
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom'

import LoginPage from "./Components/LoginPage/LoginPage";
import SignUpPage from "./Components/SignUpPage/SignUpPage";
import NewAnnouncement from "./Components/NewAnnouncement/NewAnnouncement";

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
                <Route path={"/newAnnouncement"}>
                    <NewAnnouncement />
                </Route>
            </Switch>
        </div>
    )
}

export default RouterApp

