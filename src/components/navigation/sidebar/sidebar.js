import React from 'react'
import Style from './sidebar.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimesCircle, faHome} from "@fortawesome/free-solid-svg-icons";
import UserSection from '../profileSection/profileSection'
import {NavLink} from "react-router-dom";


// this component is used to show navigation items
// in mobile view

const sidebar = (props) => {
    //contains the value - to show the side menu or not
    const show = props.show;

    let className
    if (show)
        className = [Style.Sidebar, Style.Show]
    else
        className = [Style.Sidebar, Style.Hide]
    return (
        <nav className={className.join(' ')} onClick={props.closed}>
            <div className={Style.Image}>
                <NavLink to="/"  exact className={Style.home} activeClassName={Style.active}>
                    <FontAwesomeIcon icon={faHome} size='lg' className={Style.icon}/>
                    <p>Home</p>
                </NavLink>
                <FontAwesomeIcon icon={faTimesCircle} color='#212529'/>
            </div>
            <hr/>
            <UserSection size='lg'/>
        </nav>
    )
}

export default sidebar
