import './App.css'
import a2uLogo from "./assets/a2u-logo-white-nobg.png"
import ScriptPage from "./pages/ScriptPage/main.jsx";

function App() {
    const defaultURL = "localhost:4723/"


    return (
        <>
            <div id='page-layout'>
                <div id='sidebar'>
                    <img src={a2uLogo} alt='a2uLogo' width='100'/>
                    <h1 style={{fontSize: '25px', textAlign: 'center'}}>Checks2U</h1>
                </div>

                <div id='open-page'>
                    <ScriptPage baseURL='http://localhost:3000/api/'/>
                </div>

                {/*<div id='interact-column'>*/}
                {/*    <RequestManager baseURL={'http://localhost:8000/appium/'}/>*/}
                {/*</div>*/}
            </div>

            {/*<DraggableComponent className="appiumBox">*/}
            {/*    <iframe className="appiumFrame" src={"http://" + defaultURL}></iframe>*/}
            {/*</DraggableComponent>*/}
        </>
    )
}

export default App
