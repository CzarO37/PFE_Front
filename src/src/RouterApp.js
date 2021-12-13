
import React from 'react'
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom'

import LoginPage from "./Components/LoginPage/LoginPage";
import ProductsPage from './Components/ProductsPage/ProductsPage';
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
                <Route path={"/products"}>
                    <ProductsPage/>
                </Route>
            </Switch>
        </div>
    )
}

export default RouterApp

