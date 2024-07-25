import {Component} from "react";
import PropTypes from "prop-types";
import ScriptInput, {SelectFromMenu} from "./ScriptInput.jsx";

export default class ScriptView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            scripts: this.props.scripts,
            activeScript: this.props.activeScript,
            inputFields: [],
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.scripts !== this.props.scripts) {
            this.setState({scripts: this.props.scripts});
        }

        if (prevProps.activeScript !== this.props.activeScript) {
            this.setState({activeScript: this.props.activeScript}, () => this.renderInput());
        }
    }

    // Returns the testDefinition of the test with the specified ID
    // Otherwise, returns undefined
    getScript(scriptID) {
        if (scriptID < 0 || scriptID >= this.state.scripts.length)
            return undefined

        return this.state.scripts[scriptID]
    }

    // Returns the input parameters of the test with the specified ID
    // Otherwise, returns undefined
    getDefinitionParams(testID) {
        const script = this.getScript(testID);

        if (script === undefined)
            return script

        if (script?.definition?.parameters == undefined)
            return undefined

        return script.definition.parameters
    }

    // Updates the currently rendered inputFields
    renderInput() {
        // Removes previously rendered input fields, then calls rest of function
        this.setState({inputFields: []}, () => {

            // Maps and prepares render for input fields
            if (this.state.activeScript < 0 || this.state.activeScript > this.state.scripts.length)
                return

            const inputParams = this.getDefinitionParams(this.state.activeScript)

            if (inputParams == undefined)
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
                        <h2>{this.state.activeScript > -1 ? 'Test Parameters' : 'Click test to view parameters.'}</h2>
                        {this.state.inputFields}
                    </div>
                    {/*<ConsoleView />*/}
                    <SelectFromMenu
                        items={['item1', 'item2', 'item3', 'item4', 'item5', 'item6', 'item7', 'item8', 'item9']}/>
                </div>
                <div id='script-run-button' onClick={this.props.runFunc}
                     style={{visibility: this.state.activeScript >= 0 ? 'visible' : 'hidden'}}>
                    <b>Run Test</b>
                </div>
            </div>
        )
    }
}
ScriptView.propTypes = {
    scripts: PropTypes.array.isRequired,
    activeScript: PropTypes.number.isRequired,
    runFunc: PropTypes.func.isRequired,
}