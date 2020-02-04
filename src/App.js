import React, {Component} from 'react';
import Toolbar from './components/navigation/toolbar/toolbar'
import {BrowserRouter, Route} from 'react-router-dom'
import Sidebar from './components/navigation/sidebar/sidebar'
import MainContainer from './containers/main/mainContainer'


class App extends Component{
    state = {
        menuOpen:false
    };
    menuButtonHandler = () =>{
        this.setState((prevState) => ({menuOpen: !prevState.menuOpen}))
    }

    render() {
        return (
            <BrowserRouter>
                <div style={{display:'block'}}>
                    <Toolbar onMenuButtonClicked={this.menuButtonHandler}/>
                    <Sidebar show={this.state.menuOpen} closed={this.menuButtonHandler}/>
                    <MainContainer/>

                </div>
            </BrowserRouter>
        );
    }


}

export default App;
