import React from 'react'
import Style from "./Login.module.css"
import LoginVector from './loginlanding.svg'
import Logo from '../../../ui/logo/logo.png'

const Login = (props) => {

    return (

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
                    <div style={{display:"flex"}}>
                        <button>Sign In</button>
                        <button>Sign Up</button>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Login
