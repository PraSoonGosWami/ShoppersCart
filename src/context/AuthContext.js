import React, {createContext, useState} from 'react'

export const AuthContext = createContext({})

export const AuthProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    return(
        <AuthContext.Provider value={[isLoggedIn,setIsLoggedIn,user,setUser]}>
            {props.children}
        </AuthContext.Provider>
    )
}


