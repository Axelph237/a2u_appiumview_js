import './App.css'
import DraggableComponent from "./components/DraggableComponent.jsx";
import RequestManager from "./components/RequestManager.jsx";
import a2uLogo from "./assets/a2u-logo-white-nobg.png"

function App() {
    const defaultURL = "localhost:4723/"


    return (
        <>
            <div className='page-row' style={{width: '100vw'}}>
                <div id='sidebar'>
                    <img src={a2uLogo} alt='a2uLogo' width='100'/>
                    <h1 style={{fontSize: '25px', textAlign: 'center'}}>A2U Agent Checker</h1>
                </div>

                <div id='interact-column'>
                    <RequestManager/>
                </div>
            </div>

            {/*<DraggableComponent className="appiumBox">*/}
            {/*    <iframe className="appiumFrame" src={"http://" + defaultURL}></iframe>*/}
            {/*</DraggableComponent>*/}
        </>
    )
}

export default App
