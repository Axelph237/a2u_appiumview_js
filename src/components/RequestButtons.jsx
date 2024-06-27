import axios from 'axios';

export default function RequestButtons() {
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

    const httpMole = axios.create({
        baseURL: 'http://localhost:8000/appium/',
        timeout: 5000
    })

    const startAppiumServer = () => {
        httpMole.post('start_appium/')
            .then(response => {
            console.log('Appium server started:', response.data);
        })
            .catch(error => {
                console.error('Error starting Appium server:', error);
            });

    };

    const stopAppiumServer = () => {
        httpMole.post('stop_appium/')
            .then(response => {
                console.log('Appium server stopped:', response.data);
            })
            .catch(error => {
                console.error('Error stopping Appium server:', error);
            });
    };

    const runAppiumTest = () => {
        httpMole.post('run_appium_test/')
            .then(response => {
                console.log('Appium test started:', response.data);
            })
            .catch(error => {
                console.error('Error running Appium test:', error);
            });
    };

    return (
        <>
            <div style={quickStyling} onClick={startAppiumServer}>Start Appium Server</div>
            <div style={quickStyling} onClick={stopAppiumServer}>Stop Appium Server</div>
            <div style={quickStyling} onClick={runAppiumTest}>Run Appium Test</div>
        </>
    );
}
