import React from 'react'
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom'

import IndexPage from "./Components/IndexPage/IndexPage";
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
                <Route path={"/"}>
                    <IndexPage />
                </Route>
            </Switch>
        </div>
    )
}

export default RouterApp

