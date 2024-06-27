import './App.css'
import DraggableComponent from "./components/DraggableComponent.jsx";
import RequestButtons from "./components/RequestButtons.jsx";

function App() {
    const defaultURL = "localhost:4723/"


    return (
        <>
            <h1>Control Appium from Web App</h1>
            <RequestButtons/>

            <DraggableComponent className="appiumBox">
                <iframe className="appiumFrame" src={"http://" + defaultURL}></iframe>
            </DraggableComponent>
        </>
    )
}

export default App
