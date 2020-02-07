import React, {Component} from 'react'
import Style from './mainContainer.module.css'
import {Route} from "react-router";
import HomePage from "../HomePage/HomePage";
import ProductPage from "../ProductPage/ProductPage";
import CategoryPage from "../CategoryPage/CategoryPage";

class MainContainer extends Component {
    render() {
        return(
            <main className={Style.MainContainer}>
               <Route path='/' exact component={HomePage}/>
               <Route path='/products'  component={ProductPage}/>
               <Route path='/category'  component={CategoryPage}/>
            </main>
        )
    }

}

export default MainContainer
