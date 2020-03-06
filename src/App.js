import React, {useState} from 'react';
import Toolbar from './components/navigation/toolbar/toolbar'
import {BrowserRouter as Router} from 'react-router-dom'
import Sidebar from './components/navigation/sidebar/sidebar'
import MainComponent from './components/mainComponent/mainComponent'
import Backdrop from './ui/backdrop/backdrop'
import {ToastProvider} from 'react-toast-notifications'
import { DefaultToast } from 'react-toast-notifications';

const MyCustomToast = ({ children, ...props }) => (
    <DefaultToast {...props} style={{maxWidth:"290px",marginTop:"20px"}}>
        {children}
    </DefaultToast>
);

const App = (props) => {
    //init state to control side menu open handler
    const [menuOpen, setMenuOpen] = useState(false)

    const menuButtonHandler = () => {
        setMenuOpen((prevState) => !prevState)
    }


    return (
        <ToastProvider placement="top-center" components={{Toast: MyCustomToast}} >
            <Router>
                <div>
                    <Toolbar onMenuButtonClicked={menuButtonHandler}/>
                    <Backdrop
                        onBackDropClicked={menuButtonHandler}
                        show={menuOpen}
                    />
                    <Sidebar
                        show={menuOpen}
                        closed={menuButtonHandler}
                    />
                    <MainComponent/>

                </div>
            </Router>

        </ToastProvider>
    );


}

export default App;
