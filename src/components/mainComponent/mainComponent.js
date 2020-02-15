import React, {Suspense} from 'react'
import {Route, Switch} from "react-router";
import Style from './mainComponent.module.css'

import HomePage from "../../containers/HomePage/HomePage";
import Spinner from "../../ui/spinner/spinner"

const ProductPage = React.lazy(() => import("../../containers/ProductPage/ProductPage"))
const CategoryPage = React.lazy(() => import("../../containers/CategoryPage/CategoryPage"))

const mainComponent = (props) => {
    return (
        <main className={Style.MainContainer}>
            <Suspense fallback={<Spinner/>}>
                <Switch>
                    <Route path='/' exact component={HomePage}/>
                    <Route path='/products/:cid/:pid' exact component={ProductPage}/>
                    <Route path='/category/all' render={() => <h2>Under Construction</h2>}/>
                    <Route path='/category/:cid' exact component={CategoryPage}/>
                </Switch>
            </Suspense>
        </main>
    )
}

export default mainComponent
