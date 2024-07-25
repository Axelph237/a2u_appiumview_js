import {Component} from "react";
import PropTypes from "prop-types";
import ScriptInput, {SelectFromMenu} from "./ScriptInput.jsx";
import './ScriptView.css'

export default class ScriptView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            scripts: this.props.scripts,
            activeScript: this.getScript(this.props.activeScriptID),
            inputFields: [],
        }
    }

    // Updates state based on prop changes
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.scripts !== this.props.scripts) {
            this.setState({scripts: this.props.scripts});
        }

        if (prevProps.activeScriptID !== this.props.activeScriptID) {
            this.setState({activeScript: this.getScript(this.props.activeScriptID)},
                () => this.renderInput());
        }
    }

    // Returns the testDefinition of the test with the specified ID
    // Otherwise, returns undefined
    getScript(scriptID) {
        if (scriptID < 0 || scriptID >= this.state.scripts.length)
            return undefined

        return this.state.scripts[scriptID]
    }

    // Returns the input parameters of the test
    // Otherwise, returns undefined
    getDefinitionParams(script) {
        if (script === undefined)
            return script

        if (script?.definition?.parameters === undefined)
            return undefined

        return script.definition.parameters
    }

    // Updates the currently rendered inputFields
    renderInput() {
        // Removes previously rendered input fields, then calls rest of function
        this.setState({inputFields: []}, () => {

            // Maps and prepares render for input fields
            const inputParams = this.getDefinitionParams(this.state.activeScript)

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
            <div id='script-view' className='layered'>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div className='input-menu'>
                        {this.state.activeScript !== undefined ?
                            (<>
                                <h2>{this.state.activeScript.file_name}</h2>
                                <h2>Test Parameters:</h2>
                            </>)
                            : (<h2>Click test to view parameters.</h2>)
                        }
                        {this.state.inputFields}
                    </div>
                    {/*<ConsoleView />*/}
                    {/*<SelectFromMenu*/}
                    {/*    items={['item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', 'item', ]}/>*/}
                </div>
                <div id='script-run-button' onClick={this.props.runFunc}
                     style={{visibility: this.state.activeScript !== undefined ? 'visible' : 'hidden'}}>
                    <b>Run Test</b>
                </div>
            </div>
        )
    }
}
ScriptView.propTypes = {
    scripts: PropTypes.array.isRequired,
    activeScriptID: PropTypes.number.isRequired,
    runFunc: PropTypes.func.isRequired,
}