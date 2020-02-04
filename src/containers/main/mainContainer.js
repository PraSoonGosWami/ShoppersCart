import React, {Component} from 'react'
import Style from './mainContainer.module.css'
import {Route} from "react-router";
import HomePage from "../HomePage/HomePage";

class MainContainer extends Component {
    render() {
        return(
            <main className={Style.MainContainer}>
               <Route path='/' exact component={HomePage}/>
            </main>
        )
    }

}

export default MainContainer
