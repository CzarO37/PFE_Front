import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import RouterApp from './RouterApp'
require('dotenv').config()



const documentElem = document.getElementById('root');

//const componentElem = React.createElement(App);
ReactDOM.render(
    <Router>
        <RouterApp />
    </Router>,
    //componentElem,
    documentElem,
)
