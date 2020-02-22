import firebase from "firebase/app";
import "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyAtGTnUB7BBk_mMUgT_SpwwAYXD1MyNS30",
    authDomain: "shopper-cart.firebaseapp.com",
    databaseURL: "https://shopper-cart.firebaseio.com",
    projectId: "shopper-cart",
    storageBucket: "shopper-cart.appspot.com",
    messagingSenderId: "998465429346",
    appId: "1:998465429346:web:adae155d9195ae02dd563b",
    measurementId: "G-44H45H8972"
};

const Firebase = firebase.initializeApp(firebaseConfig)

export default Firebase
