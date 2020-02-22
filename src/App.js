import React, {useContext, useEffect, useState} from 'react';
import Toolbar from './components/navigation/toolbar/toolbar'
import {BrowserRouter as Router} from 'react-router-dom'
import Sidebar from './components/navigation/sidebar/sidebar'
import MainComponent from './components/mainComponent/mainComponent'
import Backdrop from './ui/backdrop/backdrop'
import Firebase from "./config/FirebaseConfig";
import {AppContext} from "./context/AppContext";


const App = (props) => {
    //init state to control side menu open handler
    const [menuOpen,setMenuOpen] = useState(false)

    //getting context value
    const contextValue = useContext(AppContext)

    const menuButtonHandler = () => {
        setMenuOpen((prevState) => !prevState )
    }

    //firebase auth listener
    //listens to any changes (login/logout)
    //updates app context accordingly
    const authListener = () => {
        Firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                contextValue.setIsLoggedIn(true)
                contextValue.setUser(user)
            } else {
                // User is signed out.
                contextValue.setIsLoggedIn(false)
                contextValue.setUser(null)

            }
        })
    }

    useEffect(()=>{
        authListener()
    })

    return (
        <Router>
            <div>
                <Toolbar onMenuButtonClicked={menuButtonHandler}/>
                <Backdrop
                    onBackDropClicked={menuButtonHandler}
                    show={menuOpen}
                />
                <Sidebar
                    show={menuOpen}
                    closed={menuButtonHandler}
                />
                <MainComponent/>
            </div>
        </Router>
    );


}

export default App;
