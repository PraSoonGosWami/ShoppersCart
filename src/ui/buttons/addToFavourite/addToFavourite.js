import React, {useContext} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import {AppContext} from "../../../context/AppContext";
import {useHistory} from "react-router";

const AddToFavourite = (props) => {
    const contextVal = useContext(AppContext)
    const history = useHistory()
    const onClickHandler = () => {
        if(!contextVal.isLoggedIn)
            history.push("/signin")
    }

    return(
        <div className={props.AddToFavourite} onClick={onClickHandler}>
            <FontAwesomeIcon style={props.style} icon={faHeart} size={props.size} color={props.color}/>
            <p>{props.text}</p>
        </div>
    )
}

export default AddToFavourite
