import React from "react";
import tondeuse from "../../images/products/tondeuse.jpg"
import './Product.css'

const Product = ({img, title, price}) =>{
    console.log(img)
    return (
        <div id="product">
            <img src={tondeuse} alt='Tondeuse'></img>
            <p>{title}</p>
            <p>{price} €</p>
        </div>
    )
}

export default Product