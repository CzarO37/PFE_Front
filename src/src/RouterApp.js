import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import App from './Components/App/App'

const RouterApp = () => {

    return (
        <div>
            <Switch>
                <Route path={"/login"}>
                    <App />
                </Route>
            </Switch>
        </div>
    )
}

export default RouterApp

