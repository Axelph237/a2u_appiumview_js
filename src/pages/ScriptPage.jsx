import './ScriptPage.css'

import {Component} from "react";
import PropTypes from "prop-types";
import axios from "axios";

export default class ScriptPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            testDefinitions:[],
            containers: [],
            openTest: -1,
        }
    }

    componentDidMount() {
        // Enabling horizontal scrolling for test container
        const container = document.querySelector('#test-container');

        container.addEventListener('wheel', (event) => {
            event.preventDefault()
            container.scrollLeft += event.deltaY
        });

        this.getTests()
    }

    // Sends a GET request to the server backend and returns a list of all test definitions
    getTests() {
        const baseURL = this.props.baseURL != null ? this.props.baseURL : 'http://localhost:8000/appium/'

        const httpMole = axios.create({
            baseURL: baseURL,
            timeout: 50000
        })

        httpMole.get('tests/', {responseType: 'json'})
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

    // Returns the testDefinition of the test with the specified ID
    // Otherwise, returns null
    getTestData(testID) {
        if (testID < 0 || testID >= this.state.testDefinitions.length)
            return null

        return this.state.testDefinitions[testID]
    }

    // Returns the input parameters of the test with the specified ID
    // Otherwise, returns null
    getDefinitionInput(testID) {
        const data = this.getTestData(testID);

        if (data == null)
            return data

        return data.params
    }

    // Creates input elements as an array
    loadInput() {
        if (this.state.openTest < 0 || this.state.openTest > this.state.testDefinitions.length)
            return []

        const inputParams = this.getDefinitionInput(this.state.openTest)

        // inputID is of type String
        return Object.keys(inputParams).map(inputID => (
                    <TestInput inputID={inputID} key={inputID} defaultValue={inputParams[inputID]} />
                ))
    }

    render() {
        return (
            <div id='script-page'>
                <div id='test-container'>
                    {this.state.testDefinitions.map(def => (
                        <TestButton fileName={def.file_name}
                                    onClick={() => this.setState({openTest: def.test_id})}
                                    background={'var(--a2u-blue)'}
                                    key={def.test_id}
                        />
                    ))}
                </div>

                <div id='test-view' className='layered'>
                    <div className='input-box'>
                        <h2>Test Input</h2>
                        {this.loadInput()}
                    </div>
                    <div id='test-run-button'>
                        <b>Run Test</b>
                    </div>
                </div>
            </div>
        )
    }
}
ScriptPage.propTypes = {
    baseURL: PropTypes.string.isRequired,
}

function TestButton({fileName, onClick, background}) {

    return (
        <div className='test-button' style={{background: background}} onClick={onClick}>
            <p>{fileName}</p>
        </div>
    )
}
TestButton.propTypes = {
    fileName: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    background: PropTypes.string.isRequired,
}

function TestInput({inputID, defaultValue}) {

    let inputElement = (<></>)

    switch (typeof defaultValue) {
        case "string":
            inputElement = (
                <input className='test-input-box' type='text' defaultValue={defaultValue}/>
            )
            break;

        case "number":
            inputElement = (
                <input className='test-input-box' type='number' defaultValue={defaultValue}/>
            )
            break;

            // TODO fix checkbox formatting
        case "boolean":
            inputElement = (
                <div className='checkbox-container'>
                    <input className='test-input-box custom-checkbox' type='checkbox' defaultChecked={defaultValue}/>
                    <span className="input-checkmark"></span>
                </div>
            )
            break;

        case "object":
            console.log(defaultValue + " is type Object!")
            break;
        default:
            break;
    }

    return (
        <div className='input-container'>
            <b>{inputID.toUpperCase()}</b>
            {inputElement}
        </div>
    )
}

TestInput.propTypes = {
    inputID: PropTypes.string.isRequired,
    defaultValue: PropTypes.string,
}