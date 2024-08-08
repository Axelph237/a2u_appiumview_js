import './main.css'
import {Component} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import ConsoleView from "../../components/ConsoleView.jsx";

import ScriptContainer from "./ScriptContainer.jsx";
import ScriptView from "./ScriptView.jsx";
import ScriptMenu from "./ScriptMenu.jsx";

export default class ScriptPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            scripts:[],
            activeScriptID: -1,
        }
    }

    componentDidMount() {
        // Enabling horizontal scrolling for test container
        const container = document.querySelector('#script-menu');

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
        this.getHTTPMole().post('appium/run')
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
            script_id: A unique numeric id also representing the index of the script in the list
            definition: May be null, an object containing information on display and input for the script, see
                backend repo README for further information
            capabilities: Should never be null for scripts following Appium format. A list of parameters for the Appium client.
    */
    getTests() {
        this.getHTTPMole().get('scripts/', {responseType: 'json'})
            .then(response => {
                console.log('Tests retrieved:', response.data);

                if (response.data == null)
                    return

                this.setState({scripts: response.data})
            })
            .catch(error => {
                console.error('Error reading Appium test requirements:', error);
                return null
            });
    }

    // Sends a POST request to the server backend
    // POST contains the test's data as a json
    runActiveScript() {
        const input = this.retrieveUserInput()
        const script = this.state.scripts[this.state.activeScriptID]
        // merge the user input with the test's definition
        if (script?.definition?.parameters != undefined)
            script.definition.parameters = input

        this.getHTTPMole().post('scripts/run/', script)
            .then(response => {

                console.log('Tests run with following response:', response.data);

            })
            .catch(error => {

                console.error('Error running Appium test:', error);

            });
    }

    // Collects the input data from all available input boxes
    // Returns an object containing each input name and its value
    retrieveUserInput() {
        const inputElems = document.getElementsByClassName('script-input')

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

    render() {
        return (
            <div id='script-page'>
                <ScriptMenu scripts={this.state.scripts} setActiveScript={(scriptID) => this.setState({activeScriptID: scriptID})} />
                <ScriptView scripts={this.state.scripts} activeScriptID={this.state.activeScriptID} runFunc={() => this.runActiveScript()} />
            </div>
        )
    }
}
ScriptPage.propTypes = {
    baseURL: PropTypes.string.isRequired,
}