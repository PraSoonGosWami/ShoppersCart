import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";


const DeleteButton = (props) => {

    //this component is add to cart button used to add products to cart
    return(
        <div className={props.DeleteButton} onClick={props.onDeleteButtonClickHandler} >
            <FontAwesomeIcon style={props.style} icon={faTrash} size={props.size} color={props.color}/>
            <p>{props.text}</p>
        </div>
    )
}

export default DeleteButton
