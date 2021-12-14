
import React from 'react'
import { Switch, Route, useRouteMatch, Link} from 'react-router-dom'

import LoginPage from "./Components/LoginPage/LoginPage";
import ProductsPage from './Components/ProductsPage/ProductsPage';
import SignUpPage from "./Components/SignUpPage/SignUpPage";
<<<<<<< HEAD
import AnnouncementPage from './Components/AnnouncementPage/AnnouncementPage';
=======
import CategoriePage from './Components/CategoriePage/CategoriePage';
>>>>>>> 90b2e175b53cd970403ed9e974eb6cd7a19733ad

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
<<<<<<< HEAD
                <Route path={`/announcement/:id`}>
                    <AnnouncementPage/>
=======
                <Route path={"/products"}>
                    <ProductsPage/>
                </Route>
                <Route path={"/categories"}>
                    <CategoriePage/>
>>>>>>> 90b2e175b53cd970403ed9e974eb6cd7a19733ad
                </Route>
            </Switch>
        </div>
    )
}

export default RouterApp

