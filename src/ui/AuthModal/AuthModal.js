import React from 'react'
import {useHistory} from "react-router";
import Style from './AuthModal.module.css'
import Backdrop from '../backdrop/backdrop'
const AuthModal = (props) => {
    const history = useHistory()
    const onBackDropClicked = () =>{
        history.goBack()
    }


    return (
        <React.Fragment>
            <Backdrop show onBackDropClicked={onBackDropClicked} />
            <div className={Style.AuthModal}>
                <span onClick={onBackDropClicked}><p>&#10006;</p></span>
                {props.children}
            </div>
        </React.Fragment>

    )
}

export default AuthModal
