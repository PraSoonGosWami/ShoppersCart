import React, {Suspense, useContext, useEffect} from 'react'
import {Route, Switch} from "react-router";
import Style from './mainComponent.module.css'
import HomePage from "../../containers/HomePage/HomePage";
import Spinner from "../../ui/spinner/spinner"
import {AppContext} from "../../context/AppContext";
import Firebase from "../../config/FirebaseConfig";
import Axios from "../../AxiosInstance";

const ProductPage = React.lazy(() => import("../../containers/ProductPage/ProductPage"))
const CategoryPage = React.lazy(() => import("../../containers/CategoryPage/CategoryPage"))
const UserProfilePage = React.lazy(() => import("../../components/userProfile/UserProfile"))
const Cart = React.lazy(() => import("../../components/cart/Cart"))
const Wishlist = React.lazy(() => import("../../components/wishList/WishList"))
const Signin = React.lazy(() => import("../../components/Auth/Login/Login"))
const Signup = React.lazy(() => import("../../components/Auth/Register/SignUp"))
const ErrorPage = React.lazy(() => import("../../ui/Error404Page/Error404Page"))
const PaymentPage = React.lazy(() => import("../cart/payment/Payment"))
const MyOrdersPage = React.lazy(() => import('../myOrders/MyOrders'))

const MainComponent = (props) => {

    //this is the main component
    //which holds all the routes to SPA

    //getting context value
    const contextValue = useContext(AppContext)

    //firebase auth listener
    //listens to any changes (login/logout)
    //updates app context accordingly
    const authListener = async () => {

        Firebase.auth().onAuthStateChanged(await function (user) {
            if (user) {
                contextValue.setIsLoggedIn(true)
                //setting user data to app context
                contextValue.setUser(user)

                //populating cart app context from database
                const url = `/cart/${user.uid}.json`
                Axios.get(url)
                    .then(response => {
                        Object.keys(response.data).map(key=>{
                           return  contextValue.setCart(prevVal=>prevVal.concat(response.data[key]))
                        })
                    })
                    .catch(error => {
                        //console.error(error)
                    })


            } else {
                // User is signed out.
                contextValue.setIsLoggedIn(false)
                contextValue.setUser(null)
                contextValue.setCart([])


            }
        })
    }

    useEffect(() => {
        authListener().then().catch()

    }, [Firebase.auth()])


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

                    {/*Route to payment page*/}
                    <Route path='/checkout/payment' exact component={PaymentPage}/>

                    {/*Route to My Order page*/}
                    <Route path='/orders' exact component={MyOrdersPage}/>

                    {/*Route to unknown pages are handled here*/}
                    <Route component={ErrorPage}/>
                </Switch>
            </Suspense>

        </main>
    )
}

export default MainComponent
