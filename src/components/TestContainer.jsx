import './TestContainer.css'
import axios from "axios";
import {Component, useState} from "react";
import gearIcon from "../assets/gear.svg";
import PropTypes from "prop-types";

class TestContainer extends Component {

    constructor(props) {
        super(props);

        const baseURL = props.baseURL != null ? props.baseURL : 'http://localhost:8000/appium/'

        this.state = {
            httpMole: axios.create({
                        baseURL: baseURL,
                        timeout: 50000
                    }),
            testDefinition: props.testDefinition,
            testName: this.beautifyTestName(props.testDefinition.file_name),
            testLoading: false,
            baseURL: baseURL
        };
    }

    componentDidMount() {
        console.log('TestContainer componentDidMount');
    }

    beautifyTestName(fileName) {
        const words = fileName.split('_');

        // Map over each word in the array and capitalize the first letter
        const capitalizedWords = words.map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        });

        // Join the array of words back into a single string
        return capitalizedWords.join(' ');
    }

    render() {
        return (
            <div className='test-container'>
                <h2>{this.state.testName}</h2>
                <RunTestButton testDefinition={this.state.testDefinition} baseURL={this.state.baseURL}/>
            </div>
        )
    }

}

TestContainer.propTypes = {
    baseURL: PropTypes.string.isRequired,
    testDefinition: PropTypes.object.isRequired,
}
export default TestContainer;

/// Function components
function RunTestButton({testDefinition, baseURL}) {
    const [loading, setLoading] = useState(false);

    const httpMole = axios.create({
        baseURL: baseURL,
        timeout: 50000
    })

    const runAppiumTest = () => {
        httpMole.post('run_appium_test/',  {
            testID: testDefinition.test_id
        })
            .then(response => {
                console.log('Appium test completed:', response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error running Appium test:', error);
                setLoading(false);
            });

        setLoading(true);
    };

    return (
        <div className='run-button-container layered'>
            <img className='loading-gear' src={gearIcon} alt="Your SVG" type="image/svg+xml" style={{visibility: loading ? 'visible' : 'hidden'}}/>
            <div className={`run-button layered ${loading && 'loading'}`} onClick={runAppiumTest}>
                <h3>Run Test!</h3>
            </div>
        </div>
    )
}

RunTestButton.propTypes = {
    testDefinition: PropTypes.object.isRequired,
    baseURL: PropTypes.string.isRequired,
}


