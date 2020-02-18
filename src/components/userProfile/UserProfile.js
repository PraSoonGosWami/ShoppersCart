import React, {useContext} from 'react'
import {AuthContext} from "../../context/AuthContext";
import {Redirect} from "react-router";

const UserProfile = (props) => {
    const [isLoggedIn, setIsLoggedIn, user, setUser] = useContext(AuthContext)
    if (!isLoggedIn) {
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
