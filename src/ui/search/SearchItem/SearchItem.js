import React from 'react'
import {Link} from "react-router-dom";
import Style from './SearchItem.module.css'

const SearchItem = (props) => {
    let url
    if(props.type === "cat" ){
        url = '/category/'+props.catId
    }else{
        url = `/products/${props.catId}/${props.id}`
    }
    return(
        <Link to={url} className={Style.SearchItem} onClick={props.onClick}>
            <img src={props.url} alt={props.name}/>
            <section>
                <h4>{props.name}</h4>
                <h5>in {props.catName}</h5>
            </section>
        </Link>
    )
}

export default SearchItem
