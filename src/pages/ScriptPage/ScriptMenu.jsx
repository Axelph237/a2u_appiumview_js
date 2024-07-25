import {Component} from "react";
import ScriptContainer from "./ScriptContainer.jsx";
import PropTypes from "prop-types";

export default class ScriptMenu extends Component {

    render() {
        return (
            <div id='script-menu'>
                {this.props.scripts.map(def => (
                    <ScriptContainer script={def}
                                     onClick={() => {
                                         this.props.setActiveScript(def.script_id)
                                     }}
                                     background={'var(--a2u-blue)'}
                                     key={def.script_id}
                    />
                ))}
            </div>
        )
    }
}
ScriptMenu.propTypes = {
    setActiveScript: PropTypes.func.isRequired,
    scripts: PropTypes.array.isRequired,
}