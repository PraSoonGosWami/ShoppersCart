import React, {Suspense} from 'react'
import {Route, Switch} from "react-router";
import Style from './mainComponent.module.css'
import HomePage from "../../containers/HomePage/HomePage";
import Spinner from "../../ui/spinner/spinner"

const ProductPage = React.lazy(() => import("../../containers/ProductPage/ProductPage"))
const CategoryPage = React.lazy(() => import("../../containers/CategoryPage/CategoryPage"))
const UserProfilePage = React.lazy(() => import("../../components/userProfile/UserProfile"))
const Cart = React.lazy(() => import("../../components/cart/Cart"))
const Wishlist = React.lazy(() => import("../../components/wishList/WishList"))
const Signin = React.lazy(() => import("../../components/Auth/Login/Login"))

const mainComponent = (props) => {
    return (
        <main className={Style.MainContainer}>
            <Suspense fallback={<Spinner/>}>
                <Switch>
                    <Route path='/' exact component={HomePage}/>
                    <Route path='/products/:cid/:pid' exact component={ProductPage}/>
                    <Route path='/category/all' render={() => <h2>Under Construction</h2>}/>
                    <Route path='/category/:cid' exact component={CategoryPage}/>
                    <Route path='/profile' exact component={UserProfilePage}/>
                    <Route path='/cart' exact component={Cart}/>
                    <Route path='/wishlist' exact component={Wishlist}/>
                    <Route path='/signin' exact component={Signin}/>
                </Switch>
            </Suspense>

        </main>
    )
}

export default mainComponent
