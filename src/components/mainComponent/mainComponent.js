import React, {Suspense} from 'react'
import {Route, Switch} from "react-router";
import Style from './mainComponent.module.css'
import HomePage from "../../containers/HomePage/HomePage";
import Spinner from "../../ui/spinner/spinner"
import Landing from "../Admin/Landing/landing"
import addProd from "../Admin/addProduct/addProduct"
import modProd from "../Admin/modProd/modProd"
import delProd from "../Admin/delProd/delProduct"
import tc from "../../ui/termsConditions/termsConditions"

const ProductPage = React.lazy(() => import("../../containers/ProductPage/ProductPage"))
const CategoryPage = React.lazy(() => import("../../containers/CategoryPage/CategoryPage"))
const UserProfilePage = React.lazy(() => import("../../components/userProfile/UserProfile"))
const Cart = React.lazy(() => import("../../components/cart/Cart"))
const Wishlist = React.lazy(() => import("../../components/wishList/WishList"))
const Signin = React.lazy(() => import("../../components/Auth/Login/Login"))
const Signup = React.lazy(() => import("../../components/Auth/Login/SignUp"))

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
                    <Route path='/signup' exact component={Signup}/>
                    <Route path='/admin' exact component={Landing}/>
                    <Route path='/admin/addprod' exact component={addProd}/>
                    <Route path='/admin/modprod' exact component={modProd}/>
                    <Route path='/admin/delprod' exact component={delProd}/>
                    <Route path='/terms-conditions' exact component={tc}/>
                </Switch>
            </Suspense>

        </main>
    )
}

export default mainComponent
