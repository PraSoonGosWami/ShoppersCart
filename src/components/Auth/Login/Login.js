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
                        <h4>Welcome Back</h4>
                        <h5>Please Login to continue</h5>
                    </header>
                    <section>
                        <label style={{marginRight:"140px"}}>Email</label>
                        <input id="email" type="email"/><br/>
                        <label style={{marginRight:"110px"}}>Password</label>
                        <input id="password" type="password"/>
                        <div className={Style.ButtonDiv}>
                            <button>Sign In</button>
                            <label style={{marginTop : "30px"}}>New to Shoppers Cart!</label>
                            <Link to="/signup">
                                <button type="button">Sign Up</button>
                            </Link>
                        </div>
                    </section>
                </main>
            </div>
        </AuthModal>
    )
}

export default Login