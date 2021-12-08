import React from "react";
import Product from "../Product/Product";
import tondeuse from "../../images/products/tondeuse.jpg"
import './Carrousel.css'

const Carrousel = () =>{
    return (
        <div id='carrousel'>
            <Product src={tondeuse} title='Tondeuse Bosh 500X' price='500'/>
            <Product src={tondeuse} title='Tondeuse Bosh 500X' price='500'/>
            <Product src={tondeuse} title='Tondeuse Bosh 500X' price='500'/>
        </div>
    )
}

export default Carrousel