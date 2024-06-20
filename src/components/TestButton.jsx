import axios from 'axios';

export default function TestButton() {
    const quickStyling = {
        width: 200,
        height: 100,
        cursor: 'pointer',
        background: 'red',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '10px',
    }

    const startAppiumServer = () => {
        axios.post('http://localhost:8000/appium/start_appium/')
            .then(response => {
                console.log('Appium server started:', response.data);
            })
            .catch(error => {
                console.error('Error starting Appium server:', error);
            });
    };

    const stopAppiumServer = () => {
        axios.post('http://localhost:8000/appium/stop_appium/')
            .then(response => {
                console.log('Appium server stopped:', response.data);
            })
            .catch(error => {
                console.error('Error stopping Appium server:', error);
            });
    };

    const runAppiumTest = () => {
        axios.post('http://localhost:8000/appium/run_appium_test/')
            .then(response => {
                console.log('Appium test started:', response.data);
            })
            .catch(error => {
                console.error('Error running Appium test:', error);
            });
    };

    return (
        <>
            <h1>Control Appium from Web App</h1>
            <div style={quickStyling} onClick={startAppiumServer}>Start Appium Server</div>
            <div style={quickStyling} onClick={stopAppiumServer}>Stop Appium Server</div>
            <div style={quickStyling} onClick={runAppiumTest}>Run Appium Test</div>
        </>
    );
}
