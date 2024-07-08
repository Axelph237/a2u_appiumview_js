import './ScriptPage.css'

import {Component} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import TestContainer from "../components/TestContainer.jsx";

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

    openTestData(testID) {
        this.setState({openTest: testID})

        console.log(testID)
    }

    getTestData(testID) {
        if (testID < 0)
            return 'Click a test to see its definition!'

        const formattedJson = JSON.stringify(this.state.testDefinitions[testID], null, 2)

        return formattedJson
    }

    render() {
        return (
            <div id='script-page'>
                <div id='test-container'>
                    {this.state.testDefinitions.map(def => (
                        <TestButton fileName={def.file_name}
                                    onClick={() => this.openTestData(def.test_id)}
                                    background={'var(--a2u-blue)'}
                                    key={def.test_id}
                        />
                    ))}
                    <div className='test-button' style={{background: 'var(--a2u-blue)'}}></div>
                    <div className='test-button' style={{background: 'var(--a2u-blue)'}}></div>
                    <div className='test-button' style={{background: 'var(--a2u-blue)'}}></div>
                    <div className='test-button' style={{background: 'var(--a2u-blue)'}}></div>
                    <div className='test-button' style={{background: 'var(--a2u-blue)'}}></div>
                    <div className='test-button' style={{background: 'var(--a2u-blue)'}}></div>
                    <div className='test-button' style={{background: 'var(--a2u-blue)'}}></div>
                    <div className='test-button' style={{background: 'var(--a2u-blue)'}}></div>
                    <div className='test-button' style={{background: 'var(--a2u-blue)'}}></div>
                </div>

                <div id='test-view'>
                    <b>{this.getTestData(this.state.openTest)}</b>
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