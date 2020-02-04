import React from 'react'
import Style from './sidebar.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimesCircle,faHome} from "@fortawesome/free-solid-svg-icons";
import UserSection from '../profileSection/profileSection'

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
                <h4><FontAwesomeIcon icon={faHome} color='#2FCE98' style={{margin:'1px 8px'}}/>Home</h4>
                <FontAwesomeIcon icon={faTimesCircle} color='white' onClick={props.closed}/>
            </div>
            <hr/>
            <UserSection size='lg'/>
        </nav>
    )
}

export default sidebar
