import React from 'react'
import logo from '../../../ui/logo/logo192.png'
import Style from './sidebar.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";

const sidebar = (props) => {
    const show = props.show;
    let className
    if (show)
        className = [Style.Sidebar, Style.Show]
    else
        className = [Style.Sidebar, Style.Hide]
    return (
        <nav className={className.join(' ')}>
            <div className={Style.Image}>
                <h3>Home</h3>
                <span onClick={props.closed}><FontAwesomeIcon icon={faTimesCircle} color='white' size='lg'/></span>
            </div>
            <hr/>
        </nav>
    )
}

export default sidebar
