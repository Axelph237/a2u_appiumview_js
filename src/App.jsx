import './App.css'
import DraggableComponent from "./components/DraggableComponent.jsx";
import {useState, useEffect} from "react";

function App() {

    const button = (
        <div className="runButton">
            <p>{buttonText}</p>
        </div>
    )

    return (
        <>
            <div className="buttonContainer">
                {button}
            </div>

            <DraggableComponent className="appiumBox">
                <input type="text" id="appiumBoxInput" placeholder={defaultURL} onChange={getInputURL}></input>
                <iframe className="appiumFrame" src={"http://" + inputURL}></iframe>
            </DraggableComponent>
        </>
    )
}

export default App
