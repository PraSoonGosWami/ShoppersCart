import React from 'react'
import Style from "./Login.module.css"
import LoginVector from './loginlanding.svg'
import Logo from '../../../ui/logo/logo.png'
import AuthModal from "../../../ui/AuthModal/AuthModal";
import {Link} from "react-router-dom";

const Login = (props) => {

    return (
        <AuthModal>
            <div className={Style.Login}>
                <aside>
                    <img src={LoginVector}/>
                </aside>
                <main>
                    <header>
                        <img src={Logo}/>
                        <h4>Welcome to Shoppers Cart</h4>
                        <h5>Please Sign Up</h5>
                    </header>
                    <section>
                        <label style={{marginRight:"140px"}}>Email</label>
                        <input type="email"/><br/>
                        <label style={{marginRight:"110px"}}>Password</label>
                        <input type="password"/><br/>
                        <label style={{marginRight:"80px"}}>Mobile Number</label>
                        <input type="tel"/><br/>
                        <label>
                            <input type="checkbox" checked="checked"/>
                            I have read all <Link to="/tc" style={{color:"#2FCE98"}}>terms & conditions</Link>
                        </label>
                        <div className={Style.ButtonDiv}>
                            <button>Sign Up</button>
                        </div>
                    </section>
                </main>
            </div>
        </AuthModal>
    )
}

export default Login
