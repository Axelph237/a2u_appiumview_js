import axios from 'axios';
import './RequestManager.css'
import {useState} from "react";
import Lottie from 'react-lottie';
import loadingAnim from "../assets/lottie/square-loading.json"
import gearIcon from "../assets/gear.svg"
import PropTypes from "prop-types";

export default function RequestManager() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const testButtons = []


    const httpMole = axios.create({
        baseURL: 'http://localhost:8000/appium/',
        timeout: 50000
    })

    const getTests = () => {
        httpMole.post('get_tests/')
            .then(response => {
                console.log('Tests retrieved:', response.data);
                return response.data;
            })
            .catch(error => {
                console.error('Error reading Appium test requirements:', error);
            });

        setLoading(true);
    };

    const testDefinitions = getTests()

    for (let def of testDefinitions) {
        testButtons.push((
            <RequestButton action={stopAppiumServer} text='Stop Appium' loading={false}/>
            ))
    }

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


    return (
        <div className='button-container'>
            <RequestButton action={startAppiumServer} text='Start Appium' loading={false}/>
            <RequestButton action={stopAppiumServer} text='Stop Appium' loading={false}/>
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
        <div className='post-button-container layered'>
            <object className='loading-gear' type="image/svg+xml" data={gearIcon} style={{visibility: loading ? 'visible' : 'hidden'}}/>
            <div className={`post-button layered ${loading && 'loading'}`} onClick={action}>
                <h3>{text}</h3>

                {/*<Lottie*/}
                {/*    options={defaultOptions}*/}
                {/*    height={75}*/}
                {/*    width={75}*/}
                {/*    style={{position: "relative", left: "125px", visibility: loading ? 'visible' : 'hidden'}}*/}
                {/*/>*/}
            </div>
        </div>
    )
}
RequestButton.propTypes = {
    text: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
}


