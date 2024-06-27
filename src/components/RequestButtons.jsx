import axios from 'axios';
import './Requestbuttons.css'
import {useState} from "react";

export default function RequestButtons() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

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
        <div className='button-container'>
            <div className='post-button' onClick={startAppiumServer}>Start Appium Server</div>
            <div className='post-button' onClick={stopAppiumServer}>Stop Appium Server</div>
            <div className='post-button' onClick={runAppiumTest}>Run Appium Test</div>
        </div>
    );
}
