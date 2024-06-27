import axios from 'axios';
import './RequestButtons.css'
import {useState} from "react";
import Lottie from 'react-lottie';
import loadingAnim from "../assets/lottie/square-loading.json"

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

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loadingAnim,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div className='button-container'>
            <div className='post-button layered' onClick={startAppiumServer}>
                <p>Start Appium Server</p>
                <Lottie
                    options={defaultOptions}
                    height={75}
                    width={75}
                    style={{position: "relative", left: "125px"}}
                />
            </div>
            <div className='post-button layered' onClick={stopAppiumServer}>
                <p>Stop Appium Server</p>
                <Lottie
                    options={defaultOptions}
                    height={75}
                    width={75}
                    style={{position: "relative", left: "125px"}}
                />
            </div>
            <div className='post-button layered' onClick={runAppiumTest}>
                <p>Run Appium Test</p>
                <Lottie
                    options={defaultOptions}
                    height={75}
                    width={75}
                    style={{position: "relative", left: "125px"}}
                />
            </div>
        </div>
    );
}
