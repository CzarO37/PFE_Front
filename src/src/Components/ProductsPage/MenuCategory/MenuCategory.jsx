import { List, ListItem } from '@mui/material'
import { Box } from '@mui/system'
import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import categoriesService from '../../../services/categories'

const MenuCategory = () => {
    
    const [categoryList, setCategoryList] = useState([])

    useEffect(() => {
        categoriesService.getAll().then((response)=>setCategoryList(response))
    }, [])
    
    const textStyle = {
        color : '#628456',
        fontSize: '22px',
        fontWeight: 'bold',
        textDecoration: 'none'
    }

    const sousTextStyle = {
        color : '#7BA66C',
        fontSize: '17px',
        fontWeight: 'bold',
        paddingLeft:'4vh',
        textDecoration: 'none'
    }

    const generateCategoryList = () =>{
        return categoryList.filter((categoryParent) => 
            categoryParent.parentCategoryId == null).map(categorie => (
                <>
                <ListItem style={textStyle}>
                    <Link style={textStyle} to={`/products?categoryId=${categorie.categoryId}`}>{categorie.name}</Link>
                </ListItem>
                <List>
                    {categorie.children.map((child)=>(
                        <ListItem style={sousTextStyle}>
                            <Link style={sousTextStyle} to={`/products?categoryId=${child.categoryId}`}>{child.name}</Link>
                        </ListItem>
                    ))}
                </List>
                </>
            )
        )
    }

    return (
        <List>
            <ListItem style={textStyle}>
                <Link style={textStyle} to ={`/products`}>Tous les produits</Link>
            </ListItem>
            {generateCategoryList()}
        </List>
    )
}

export default MenuCategory
