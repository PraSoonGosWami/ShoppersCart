import React, {useContext} from 'react'
import {AuthContext} from "../../context/AuthContext";
import {Redirect} from "react-router";
import Style from './WishList.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

const WishList = (props) => {
    {/*const [isLoggedIn, setIsLoggedIn, user, setUser] = useContext(AuthContext)
    if (!isLoggedIn) {
        return (
            <Redirect to={"/signin"}/>
        )
    }
else*/}
        return (
            <div className={Style.WishList}>
                <header>
                    <aside>
                        <div className={Style.ProductImage}>
                            <img src="Fossil Sport.png" alt="Fossil Sport Image"/>
                        </div>
                    </aside>
                    <section>
                        <h2>Fossil Sport Black &nbsp; &nbsp; &nbsp; <FontAwesomeIcon icon={faTrash} color="#2FCE98" size="lg" style={{margin:"2px 8px 2px 0"}}/></h2>
                        <h5 style={{margin: "2px", color: "#9d9d9d"}}>in Phones & Accessories</h5>
                        <h2 style={{margin: "6px 0px"}}>₹11995</h2>
                        <h4 style={{color: "#ff2725", fontSize: "0.9em", margin: "0"}}>
                            <del>₹17995</del>
                            &nbsp; 67% off</h4>
                        <h6>inclusive of all taxes</h6>
                    </section>
                </header>
            </div>
        )
}

export default WishList
