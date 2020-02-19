import React from 'react'
import Style from "./Login.module.css"
import LoginVector from './loginlanding.svg'
import Logo from '../../../ui/logo/logo.png'
import AuthModal from "../../../ui/AuthModal/AuthModal";

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
                        <input type="email" placeholder={"Email"}/>
                        <input type="password" placeholder={"Password"}/>
                        <div className={Style.ButtonDiv}>
                            <button>Sign In</button>
                            <button>Sign Up</button>
                        </div>
                    </section>
                </main>
            </div>
        </AuthModal>
    )
}

export default Login
