import React, {createContext, useState} from 'react'

export const AppContext = createContext({})

export const AppProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({displayName:"Prasoon"});
    const [cart, setCart] = useState([])
    const [wishList, setWishList] = useState(null)

    return (
        <AppContext.Provider
            value={{
                isLoggedIn: isLoggedIn,
                setIsLoggedIn: setIsLoggedIn,
                user:user,
                setUser:setUser,
                cart:cart,
                setCart:setCart,
                wishList:wishList,
                setWishList:setWishList
            }}>
            {props.children}
        </AppContext.Provider>
    )
}


