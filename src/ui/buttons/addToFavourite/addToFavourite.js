import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";


const AddToFavourite = (props) => {

    return(
        <div className={props.AddToFavourite} onClick={props.onClickHandler}>
            <FontAwesomeIcon style={props.style} icon={faHeart} size={props.size} color={props.color}/>
            <p>{props.text}</p>
        </div>
    )
}

export default AddToFavourite
