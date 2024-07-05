import './App.css'
import DraggableComponent from "./components/DraggableComponent.jsx";
import RequestManager from "./components/RequestManager.jsx";
import a2uLogo from "./assets/a2u-logo-white-nobg.png"
import TestContainer from "./components/TestContainer.jsx";

function App() {
    const defaultURL = "localhost:4723/"


    return (
        <>
            <div className='page-row' style={{width: '100vw'}}>
                <div id='sidebar'>
                    <img src={a2uLogo} alt='a2uLogo' width='100'/>
                    <h1 style={{fontSize: '25px', textAlign: 'center'}}>Test.IT</h1>
                </div>

                <div id='interact-column'>
                    <RequestManager baseURL={'http://localhost:8000/appium/'}/>
                </div>
            </div>

            {/*<DraggableComponent className="appiumBox">*/}
            {/*    <iframe className="appiumFrame" src={"http://" + defaultURL}></iframe>*/}
            {/*</DraggableComponent>*/}
        </>
    )
}

export default App
