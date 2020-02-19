import React, {createContext, useState} from 'react'

export const AuthContext = createContext({})

export const AuthProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({displayName:"Prasoon"});
    return (
        <AuthContext.Provider
            value={{
                isLoggedIn: isLoggedIn,
                setIsLoggedIn: setIsLoggedIn,
                user:user,
                setUser:setUser
            }}>
            {props.children}
        </AuthContext.Provider>
    )
}


