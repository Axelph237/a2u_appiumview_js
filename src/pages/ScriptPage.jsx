import './ScriptPage.css'
import {Component, useState} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import ConsoleView from "../components/ConsoleView.jsx";
import fitty from "fitty";

export default class ScriptPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            testDefinitions:[],   // TODO refactor to "scripts"
            containers: [],
            inputFields: [],
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

        // Get tests from backend and request backend to start Appium
        this.getTests()
        this.startAppium()
    }

    // Creates a new axios instance
    getHTTPMole() {
        const baseURL = this.props.baseURL != null ? this.props.baseURL : 'http://localhost:8000/appium/'

        return axios.create({
            baseURL: baseURL,
            timeout: 50000
        })
    }

    // Sends a get request to backend to start appium
    // TODO make this a post request. It should not be a get???
    startAppium() {
        this.getHTTPMole().get('start_appium/', {responseType: 'json'})
            .then(response => {

                console.log('Appium started:', response.data);

            })
            .catch(error => {

                console.error('Error starting Appium:', error);

            });
    }

    /*  Sends a GET request to the server backend and returns a list of all scripts
        List is an array of objects with the following fields:
            file_name: Should never be null, the name of the file without any pathing
            test_id: A unique numeric id also representing the index of the script in the list
            definition: May be null, an object containing information on display and input for the script, see
                backend repo README for further information
            capabilities: Should never be null for scripts following Appium format. A list of parameters for the Appium client.
    */
    getTests() {
        this.getHTTPMole().get('tests/', {responseType: 'json'})
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

    // Sends a POST request to the server backend
    // POST contains the test's data as a json
    // TODO rename "testDef" variable to "script"
    runOpenTest() {
        const input = this.retrieveUserInput()
        const testDef = this.state.testDefinitions[this.state.openTest]
        // merge the user input with the test's definition
        if (testDef.definition.parameters !== undefined)
            testDef.definition.parameters = input

        this.getHTTPMole().post('tests/', testDef)
            .then(response => {

                console.log('Tests run with following response:', response.data);

            })
            .catch(error => {

                console.error('Error running Appium test:', error);

            });
    }

    // Returns the testDefinition of the test with the specified ID
    // Otherwise, returns null
    // TODO rename "testID" to "scriptID"
    // TODO rename getTest to getScript
    getTest(testID) {
        if (testID < 0 || testID >= this.state.testDefinitions.length)
            return undefined

        return this.state.testDefinitions[testID]
    }

    // Returns the input parameters of the test with the specified ID
    // Otherwise, returns null
    // TODO rename "data" to "script"
    getDefinitionParams(testID) {
        const data = this.getTest(testID);

        if (data === undefined)
            return data

        // Definition will always be set either to an object or null whereas the
        // parameters field may be missing entirely
        if (data.definition == null || data.definition.parameters === undefined)
            return undefined

        return data.definition.parameters
    }

    // Collects the input data from all available input boxes
    // Returns an object containing each input name and its value
    retrieveUserInput() {
        const inputElems = document.getElementsByClassName('test-input-box')

        let input = {}

        for (let e of inputElems) {
            input[e.name] = this.coerceType(e.value)
        }

        return input
    }

    // This function implicitly coerces a string value into a different type
    // Used for retaining the original type when it may have been lost as a string
    coerceType(value) {
        if (value === null || value === undefined) // To null/undefined
            return value

        if (!isNaN(value) && value.trim() !== '') // To number
            return Number(value)

        if (value.toLowerCase() === 'true') // To boolean
            return true

        if (value.toLowerCase() === 'false') // To boolean
            return false

        return value
    }

    // Updates the currently rendered inputFields
    renderInput() {
        // Removes previously rendered input fields, then calls rest of function
        this.setState({inputFields: []}, () => {

            // Maps and prepares render for input fields
            if (this.state.openTest < 0 || this.state.openTest > this.state.testDefinitions.length)
                return

            const inputParams = this.getDefinitionParams(this.state.openTest)

            if (inputParams === undefined)
                return

            // inputID is of type String
            const inputFields = Object.keys(inputParams).map(inputID => (
                <ScriptInput inputID={inputID} key={inputID} defaultValue={inputParams[inputID]} />
            ))

            this.setState({inputFields: inputFields})
        })
    }

    render() {
        return (
            <div id='script-page'>
                <div id='test-container'>
                    {this.state.testDefinitions.map(def => (
                        <TestButton testDef={def}
                                    onClick={() => {this.setState({openTest: def.test_id}, () => this.renderInput())}}
                                    background={'var(--a2u-blue)'}
                                    key={def.test_id}
                        />
                    ))}
                </div>

                <div id='test-view' className='layered'>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <div className='input-box'>
                            <h2>{this.state.openTest > -1 ? 'Test Parameters' : 'Click test to view parameters.'}</h2>
                            {this.state.inputFields}
                        </div>
                        <ConsoleView />
                        <SelectFromMenu items={['item1', 'item2', 'item3', 'item4', 'item5', 'item6', 'item7', 'item8', 'item9']} />
                    </div>
                    <div id='test-run-button' onClick={() => this.runOpenTest()}
                         style={{visibility: this.state.openTest >= 0 ? 'visible' : 'hidden'}}>
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

// TODO refactor TestButton to clearer name
// TODO refactor "testDef" to "script"
function TestButton({testDef, onClick, background}) {

    fitty('h1', {
        maxSize: 20,
        minSize: 16,
        multiLine: true,
    })

    const beautifyName = (name) => {
        const splitString = name.split('_')

        let finalName = ''
        for (let s of splitString) {

            finalName = finalName + ' ' +  s.charAt(0).toUpperCase() + s.substring(1)
        }

        return finalName.trimEnd()
    }

    // TODO add logic for using the "script_name" field of the "definition" if available before using "file_name"
    return (
        <div className='test-button' style={{background: background}} onClick={onClick}>
            <h1>{beautifyName(testDef.file_name)}</h1>
            <div className='test-info-box'>
                {testDef.definition.parameters !== undefined && (<p>{'Parameter count: ' + Object.keys(testDef.params).length}</p>)}
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

function ScriptInput({inputID, defaultValue}) {
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

        case "boolean":
            inputElement = (
                <div className='checkbox-container'>
                    <input name={inputID} className='test-input-box' type='checkbox' value={String(booleanInput)}/>
                    <div className='tf-container'>
                        <div className={`selection-pill ${!booleanInput && 'selected'}`} onClick={() => setBooleanInput(false)}>False</div>
                        <div className={`selection-pill ${booleanInput && 'selected'}`} onClick={() => setBooleanInput(true)}>True</div>
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
ScriptInput.propTypes = {
    inputID: PropTypes.string.isRequired,
    defaultValue: PropTypes.any,
}

// TODO finish menu selection by adding dropdown carrot and secondary background
function SelectFromMenu({items}) {
    const [selectedIndex, setSelectedIndex] = useState(0)

    const createMenu = () => {
        let menuItems = []

        for (let i = 0; i < items.length; i++) {
            menuItems.push((
                <div className={`selection-pill ${selectedIndex === i && 'selected'}`} onClick={() => setSelectedIndex(i)} style={{margin: '3px 0px'}} key={i}>{items[i]}</div>
            ))
        }

        return menuItems
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '200px', height: '500px'}}>
            {createMenu()}
        </div>
    )
}
SelectFromMenu.propTypes = {
    items: PropTypes.array.isRequired
}