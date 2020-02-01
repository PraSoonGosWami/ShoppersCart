import React, {Component} from 'react';
import Toolbar from './components/navigation/toolbar/toolbar'
import {BrowserRouter} from 'react-router-dom'
import Sidebar from './components/navigation/sidebar/sidebar'


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
                <div>
                    <Toolbar onMenuButtonClicked={this.menuButtonHandler}/>
                    <Sidebar show={this.state.menuOpen} closed={this.menuButtonHandler}/>
                </div>
            </BrowserRouter>
        );
    }


}

export default App;
