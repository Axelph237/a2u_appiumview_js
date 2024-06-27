import './App.css'
import DraggableComponent from "./components/DraggableComponent.jsx";
import RequestButtons from "./components/RequestButtons.jsx";

function App() {
    const defaultURL = "localhost:4723/"


    return (
        <>
            <div className='page-row'>
                <div className='page-column' id='text-column' style={{alignItems: 'center', padding: '50px'}}>
                    <h1>Control Appium from Web App</h1>
                </div>
                <div className='page-column' id='interact-column' style={{width: '50vw',alignItems: 'center', padding: '50px'}}>
                    <RequestButtons/>

                    <DraggableComponent className="appiumBox">
                        <iframe className="appiumFrame" src={"http://" + defaultURL}></iframe>
                    </DraggableComponent>
                </div>
            </div>
        </>
    )
}

export default App
