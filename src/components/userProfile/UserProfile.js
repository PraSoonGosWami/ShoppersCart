import React, {useContext} from 'react'
import {AppContext} from "../../context/AppContext";
import {Redirect} from "react-router";

const UserProfile = (props) => {
    const contextVal = useContext(AppContext)
    if (!contextVal.isLoggedIn) {
        return (
            <Redirect to={"/signin"}/>
        )
    }
    else {
        return (
            <div>
                <h2>My Profile</h2>
            </div>
        )
    }
}

export default UserProfile
