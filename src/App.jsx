import './App.css'
import DraggableComponent from "./components/DraggableComponent.jsx";
import RequestButtons from "./components/RequestButtons.jsx";

function App() {
    const defaultURL = "localhost:4723/"


    return (
        <>
            <div className='page-row' style={{width: '100vw'}}>
                <div id='sidebar'>
                    <p>Control Appium from Web App</p>
                </div>

                <div id='interact-column'>
                    <RequestButtons/>
                </div>
            </div>

            <DraggableComponent className="appiumBox">
                <iframe className="appiumFrame" src={"http://" + defaultURL}></iframe>
            </DraggableComponent>
        </>
    )
}

export default App
