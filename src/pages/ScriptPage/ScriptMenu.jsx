import ScriptContainer from "./ScriptContainer.jsx";
import PropTypes from "prop-types";
import './ScriptMenu.css'

export default function ScriptMenu({scripts, setActiveScript}) {

    return (
            <div id='script-menu'>
                {scripts.map(def => (
                    <ScriptContainer script={def}
                                     onClick={() => {setActiveScript(def.script_id)}}
                                     background={'var(--a2u-blue)'}
                                     key={def.script_id}
                    />
                ))}
            </div>
        )
}
ScriptMenu.propTypes = {
    setActiveScript: PropTypes.func.isRequired,
    scripts: PropTypes.array.isRequired,
}