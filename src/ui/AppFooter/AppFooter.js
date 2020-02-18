import React from 'react'
import Style from './appFooter.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faEnvelope,
    faPhone,
    faLock,
    faFileInvoice,
    faTruck,
    faUndo,
    faCheck,
} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

const AppFooter = (props) => {
    return (
        <React.Fragment>
            <footer className={Style.Footer}>
                <section className={Style.FooterBasic}>
                <span>
                    <FontAwesomeIcon icon={faEnvelope} className={Style.FooterIcon} size="lg"/>
                    <a href="mailto:admin@shopperscart.com" target="_top"><strong>Mail us at: </strong> admin@shopperscart.com</a>
                </span>

                    <span>
                    <FontAwesomeIcon icon={faPhone} className={Style.FooterIcon} size="lg"/>
                    <a href="tel:+91 88880 88880"><strong>Call us at: </strong> +91 88880 88880</a>
                </span>

                    <span>
                    <FontAwesomeIcon icon={faLock} className={Style.FooterIcon} size="lg"/>
                     <Link to="/privacy-policy"><strong>Our Privacy Policy</strong></Link>
                </span>

                    <span>
                    <FontAwesomeIcon icon={faFileInvoice} className={Style.FooterIcon} size="lg"/>
                     <Link to="/terms-conditions"><strong>Our Terms & Conditions</strong></Link>
                </span>

                </section>
                <section className={Style.FooterFeature}>
                <span>
                    <FontAwesomeIcon icon={faCheck} className={Style.FooterIcon} size="lg"/>
                    <p><strong>100% ORIGINAL </strong> guarantee for all products at Shopper's Cart</p>
                </span>

                    <span>
                    <FontAwesomeIcon icon={faUndo} className={Style.FooterIcon} size="lg"/>
                    <p><strong>Return within 30days</strong> of receiving your order</p>
                </span>

                    <span>
                    <FontAwesomeIcon icon={faTruck} className={Style.FooterIcon} size="lg"/>
                    <p><strong>Get free delivery </strong> for every order above Rs. 1199</p>
                </span>

                </section>
            </footer>
            <p className={Style.Copyright}>© 2020 Shopper's Car All rights reserved.</p>
        </React.Fragment>
    )
}

export default AppFooter
