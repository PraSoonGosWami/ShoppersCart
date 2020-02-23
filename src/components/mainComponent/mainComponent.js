import React, {Suspense, useContext, useEffect} from 'react'
import {Route, Switch} from "react-router";
import Style from './mainComponent.module.css'
import HomePage from "../../containers/HomePage/HomePage";
import Spinner from "../../ui/spinner/spinner"
import {AppContext} from "../../context/AppContext";
import Firebase from "../../config/FirebaseConfig";
import {useToasts} from 'react-toast-notifications'

const ProductPage = React.lazy(() => import("../../containers/ProductPage/ProductPage"))
const CategoryPage = React.lazy(() => import("../../containers/CategoryPage/CategoryPage"))
const UserProfilePage = React.lazy(() => import("../../components/userProfile/UserProfile"))
const Cart = React.lazy(() => import("../../components/cart/Cart"))
const Wishlist = React.lazy(() => import("../../components/wishList/WishList"))
const Signin = React.lazy(() => import("../../components/Auth/Login/Login"))
const Signup = React.lazy(() => import("../../components/Auth/Register/SignUp"))

const MainComponent = (props) => {

    //this is the main component
    //which holds all the routes to SPA

    //getting context value
    const contextValue = useContext(AppContext)

    const {addToast} = useToasts()

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
                addToast("Welcome aboard\nPlease sign in to get the most of us" , {
                    appearance: 'info',
                    autoDismiss: true,
                })

            }
        })
    }

    useEffect(() => {
        authListener()


    }, [Firebase.auth().currentUser])


    return (
        <main className={Style.MainContainer}>
            <Suspense fallback={<Spinner/>}>
                <Switch>
                    {/*Route to home page*/}
                    <Route path='/' exact component={HomePage}/>

                    {/*Route to products page*/}
                    <Route path='/products/:cid/:pid' exact component={ProductPage}/>

                    {/*Route to all category page*/}
                    <Route path='/category/all' render={() => <h2>Under Construction</h2>}/>

                    {/*Route to category page*/}
                    <Route path='/category/:cid' exact component={CategoryPage}/>

                    {/*Route to user profile page*/}
                    <Route path='/profile' exact component={UserProfilePage}/>

                    {/*Route to cart page*/}
                    <Route path='/cart' exact component={Cart}/>

                    {/*Route to wish list page*/}
                    <Route path='/wishlist' exact component={Wishlist}/>

                    {/*Route to sign in page*/}
                    <Route path='/signin' exact component={Signin}/>

                    {/*Route to sign up page*/}
                    <Route path='/signup' exact component={Signup}/>

                    {/*Route to unknown pages are handled here*/}
                    <Route render={() => <h2>Error 404 NOT FOUND</h2>}/>
                </Switch>
            </Suspense>

        </main>
    )
}

export default MainComponent
