import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import Style from './addToFavourite.module.css'

const addToFavourite = (props) => {
    return(
        <div className={Style.AddToFavourite}>
            <FontAwesomeIcon className={Style.AddToFavouriteIcon} icon={faHeart} size="2x"/>
            <h6>Add to favourite</h6>
        </div>
    )
}

export default addToFavourite
