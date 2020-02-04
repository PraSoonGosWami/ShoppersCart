import React, {Component} from 'react'
import Style from './mainContainer.module.css'

class MainContainer extends Component {
    render() {
        return(
            <main className={Style.MainContainer}>
                <h1 style={{color:'black',textAlign:'center'}}>Main page</h1>
            </main>
        )
    }

}

export default MainContainer
