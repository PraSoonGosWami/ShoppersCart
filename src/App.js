import React, {Component} from 'react';
import Toolbar from './components/navigation/toolbar/toolbar'
import {BrowserRouter} from 'react-router-dom'
import Sidebar from './components/navigation/sidebar/sidebar'
import MainContainer from './containers/main/mainContainer'
import AddToHomescreen from 'react-add-to-homescreen';


class App extends Component {
    state = {
        menuOpen: false
    };
    menuButtonHandler = () => {
        this.setState((prevState) => ({menuOpen: !prevState.menuOpen}))
    }

    handleAddToHomescreenClick = () => {
        alert(`
    1. Open Share menu
    2. Tap on "Add to Home Screen" button`);
    };

    render() {
        return (
            <BrowserRouter>
                <div style={{display: 'block'}}>
                    <Toolbar onMenuButtonClicked={this.menuButtonHandler}/>
                    <Sidebar show={this.state.menuOpen} closed={this.menuButtonHandler}/>
                    <MainContainer/>
                    <AddToHomescreen onAddToHomescreenClick={this.handleAddToHomescreenClick}/>
                </div>
            </BrowserRouter>
        );
    }


}

export default App;
