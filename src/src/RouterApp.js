
import React from 'react'
import { Switch, Route, useRouteMatch, Link} from 'react-router-dom'

import LoginPage from "./Components/LoginPage/LoginPage";
import ProductsPage from './Components/ProductsPage/ProductsPage';
import SignUpPage from "./Components/SignUpPage/SignUpPage";
import AnnouncementPage from './Components/AnnouncementPage/AnnouncementPage';
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
                <Route path={`/announcement/:id`}>
                    <AnnouncementPage/>
                </Route>
                <Route path={"/products"}>
                    <ProductsPage/>
                </Route>
                <Route path={"/categories"}>
                    <CategoriePage/>
                </Route>
            </Switch>
        </div>
    )
}

export default RouterApp

