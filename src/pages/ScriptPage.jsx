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

    getTests() {
        const baseURL = this.props.baseURL != null ? this.props.baseURL : 'http://localhost:8000/appium/'

        const httpMole = axios.create({
            baseURL: baseURL,
            timeout: 50000
        })

        httpMole.post('get_tests/')
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

    getTestData(testID) {
        if (testID < 0 || testID >= this.state.testDefinitions.length)
            return null

        return this.state.testDefinitions[testID]
    }

    getDefinitionInputs(testID) {
        const data = this.getTestData(testID);

        if (data == null)
            return data

        return Object.keys(data.params)
    }

    // THIS IS A TEMPORARY FUNCTION FOR TESTING PURPOSES
    getDefinitionAsString(testID) {
        if (testID < 0 || testID >= this.state.testDefinitions.length)
            return 'Click a test to see its definition!'

        const formattedJson = JSON.stringify(this.state.testDefinitions[testID], null, 2)

        return formattedJson
    }

    loadInput() {
        if (this.state.openTest < 0 || this.state.openTest > this.state.testDefinitions.length)
            return []

        return this.getDefinitionInputs(this.state.openTest).map(input => (
                    <div className='input-box' key={input}>{input}</div>
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
                    <div className='input-container'>
                        <b>{this.getDefinitionAsString(this.state.openTest)}</b>
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