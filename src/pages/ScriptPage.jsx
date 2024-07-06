import './ScriptPage.css'

import {Component} from "react";
import PropTypes from "prop-types";

export default class ScriptPage extends Component {

    constructor(props) {
        super(props)

        const colors = ['--mint-green', '--light-blue', '--a2u-blue', '--federal-blue', '--dark-purple']
        const containers = []
        for (let i = 0; i < 20; i++) {
            containers.push(
                (
                    <TestButton fileName='Test Block' onClick={() => {}} background={'var(' + colors[(i % colors.length)] + ')'}/>
                )
            )
        }

        this.state = {
            containers: containers,
        }
    }

    render() {
        return (
            <div className='test-container'>
                {this.state.containers}
            </div>
        )
    }
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