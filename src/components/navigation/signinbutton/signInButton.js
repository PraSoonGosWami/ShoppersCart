import React from 'react'
import {NavLink} from "react-router-dom";

const signInButton = (props) => {
    return(
        <NavLink className={props.style} to="/profile" activeClassName={props.active} exact>
            <h4>Sign in</h4>
        </NavLink>
    )
}

export default signInButton
