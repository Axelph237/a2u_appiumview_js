import axios from 'axios';
import './RequestButtons.css'
import {useState} from "react";
import Lottie from 'react-lottie';
import loadingAnim from "../assets/lottie/square-loading.json"
import PropTypes from "prop-types";

export default function RequestManager() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const httpMole = axios.create({
        baseURL: 'http://localhost:8000/appium/',
        timeout: 50000
    })

    const startAppiumServer = () => {
        httpMole.post('start_appium/')
            .then(async response => {
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
            <RequestButton action={startAppiumServer} text='Start Appium' loading={loading}/>
            <RequestButton action={stopAppiumServer} text='Stop Appium' loading={loading}/>
            <RequestButton action={runAppiumTest} text='Run Appium Test' loading={loading}/>
        </div>
    );
}

function RequestButton({text, action, loading}) {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loadingAnim,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div className='post-button layered' onClick={action}>
            <p>{text}</p>
            <Lottie
                options={defaultOptions}
                height={75}
                width={75}
                style={{position: "relative", left: "125px", visibility: loading ? 'visible' : 'hidden'}}
            />
        </div>
    )
}
RequestButton.propTypes = {
    text: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
}
