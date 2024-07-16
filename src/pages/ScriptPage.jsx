import './ScriptPage.css'

import {Component, useState} from "react";
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

    /*retrieveUserInput() {
        const inputElems = document.getElementsByClassName('test-input-box')

        let newDefs = this.state.testDefinitions

        for (let e of inputElems) {
            console.log(e)
            newDefs[this.state.openTest].params[e.name] = e.value
        }

        return this.setState({ testDefinitions: newDefs })
    }*/

    render() {
        return (
            <div id='script-page'>
                <div id='test-container'>
                    {this.state.testDefinitions.map(def => (
                        <TestButton testDef={def}
                                    onClick={() => this.setState({openTest: def.test_id})}
                                    background={'var(--a2u-blue)'}
                                    key={def.test_id}
                        />
                    ))}
                </div>

                <div id='test-view' className='layered'>
                    <div className='input-box'>
                        <h2>{this.state.openTest > -1 ? 'Test Parameters' : 'Click test to view parameters.'}</h2>
                        {this.loadInput()}
                    </div>
                    <div id='test-run-button'>
                        <b>Run Test</b>
                    </div>

                    <div id='test-run-button' style={{background: 'var(--mint-green)', alignSelf: 'end', justifySelf: 'start', color: 'black'}} onClick={() => {console.log(this.state.testDefinitions)}}>
                        <b>Show input</b>
                    </div>
                </div>
            </div>
        )
    }
}
ScriptPage.propTypes = {
    baseURL: PropTypes.string.isRequired,
}

function TestButton({testDef, onClick, background}) {

    const beautifyName = (name) => {
        const splitString = name.split('_')

        let finalName = ''
        for (let s of splitString) {

            finalName = finalName + ' ' +  s.charAt(0).toUpperCase() + s.substring(1)
        }

        return finalName.trimEnd()
    }

    return (
        <div className='test-button' style={{background: background}} onClick={onClick}>
            <h1>{beautifyName(testDef.file_name)}</h1>
            <div className='test-info-box'>
                <p>{'Parameter count: ' + Object.keys(testDef.params).length}</p>
                <p>{testDef.file_name}</p>
            </div>
        </div>
    )
}

TestButton.propTypes = {
    testDef: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    background: PropTypes.string.isRequired,
}

function TestInput({inputID, defaultValue}) {
    const [booleanInput, setBooleanInput] = useState(false)

    let inputElement = (<></>)
    let inputType = typeof defaultValue

    switch (inputType) {
        case "string":
            inputElement = (
                <input name={inputID} className='test-input-box' type='text' defaultValue={defaultValue}/>
            )
            break;

        case "number":
            inputElement = (
                <input name={inputID} className='test-input-box' type='number' defaultValue={defaultValue}/>
            )
            break;

            // TODO fix checkbox formatting
        case "boolean":

            inputElement = (
                <div className='checkbox-container'>
                    <input name={inputID} className='test-input-box' type='checkbox' value={booleanInput}/>
                    <div className='tf-container'>
                        <div className={`boolean-checkbox ${!booleanInput && 'checked'}`} onClick={() => setBooleanInput(false)}>False</div>
                        <div className={`boolean-checkbox ${booleanInput && 'checked'}`} onClick={() => setBooleanInput(true)}>True</div>
                    </div>
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
            <div className='layered' style={{width: '100%'}}>
                <b style={{justifySelf: 'start'}}>{inputID.toUpperCase()}</b>
                <p style={{justifySelf: 'end'}}>{inputType.toUpperCase()}</p>
            </div>
            {inputElement}
        </div>
    )
}

TestInput.propTypes = {
    inputID: PropTypes.string.isRequired,
    defaultValue: PropTypes.string,
}