import axios from 'axios';
import './RequestManager.css'
import {Component} from "react";
import loadingAnim from "../assets/lottie/square-loading.json"
import gearIcon from "../assets/gear.svg"
import PropTypes from "prop-types";
import TestContainer from "./TestContainer.jsx";

class RequestManager extends Component {

    constructor(props) {
        super(props);

        const baseURL = props.baseURL != null ? props.baseURL : 'http://localhost:8000/appium/'

        this.state = {
            httpMole: axios.create({
                baseURL: baseURL,
                timeout: 50000
            }),
            testDefinitions: [],
            baseURL: baseURL,
        }
    }

    componentDidMount() {
        this.getTests()
    }

    getTests() {
        this.state.httpMole.post('get_tests/')
            .then(response => {
                console.log('Tests retrieved:', response.data);

                if (response.data == null)
                    return

                this.setState({testDefinitions: response.data})
            })
            .catch(error => {
                console.error('Error reading Appium test requirements:', error);
                return null
            });
    }


    startAppiumServer() {
        this.state.httpMole.post('start_appium/')
            .then(async response => {
            console.log('Appium server started:', response.data);

        })
            .catch(error => {
                console.error('Error starting Appium server:', error);
            });
    }

    stopAppiumServer() {
        this.state.httpMole.post('stop_appium/')
            .then(response => {
                console.log('Appium server stopped:', response.data);
            })
            .catch(error => {
                console.error('Error stopping Appium server:', error);
            });
    }


    render() {
        return (
            <div className='button-container'>
                <RequestButton action={() => {this.startAppiumServer()}} text='Start Appium' loading={false}/>
                <RequestButton action={() => {this.stopAppiumServer()}} text='Stop Appium' loading={false}/>
                <RequestButton action={() => {this.getTests()}} text='Print Tests To Console' loading={false}/>
                {this.state.testDefinitions.map(def => (
                    <TestContainer key={def.test_id} baseURL={this.state.baseURL} testDefinition={def}/>
                ))}
            </div>
        );
    }
}
RequestManager.propTypes = {
    baseURL: PropTypes.string,
}

export default RequestManager;

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
            <img className='loading-gear' src={gearIcon} alt="Your SVG" type="image/svg+xml"
                 style={{visibility: loading ? 'visible' : 'hidden'}}/>
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


