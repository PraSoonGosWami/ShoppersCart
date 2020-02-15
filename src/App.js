import React, {Component} from 'react';
import Toolbar from './components/navigation/toolbar/toolbar'
import {BrowserRouter as Router} from 'react-router-dom'
import Sidebar from './components/navigation/sidebar/sidebar'
import MainComponent from './components/mainComponent/mainComponent'
import Backdrop from './ui/backdrop/backdrop'

class App extends Component {
    state = {
        menuOpen: false
    };

    menuButtonHandler = () => {
        this.setState((prevState) => ({menuOpen: !prevState.menuOpen}))
    }



    render() {
        return (
            <Router>
                <div style={{display: 'block'}}>
                    <Toolbar onMenuButtonClicked={this.menuButtonHandler}/>
                    <Backdrop
                        onBackDropClicked={this.menuButtonHandler}
                        show={this.state.menuOpen}
                    />
                    <Sidebar
                        show={this.state.menuOpen}
                        closed={this.menuButtonHandler}
                    />
                    <MainComponent/>
                </div>
            </Router>
        );
    }


}

export default App;
