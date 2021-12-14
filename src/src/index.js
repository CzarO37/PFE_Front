import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './Components/App/App'
require('dotenv').config()



const documentElem = document.getElementById('root');

const componentElem = React.createElement(App);
ReactDOM.render(
    componentElem,
    documentElem,
)