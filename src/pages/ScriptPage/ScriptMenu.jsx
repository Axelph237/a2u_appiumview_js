import ScriptContainer from "./ScriptContainer.jsx";
import PropTypes from "prop-types";
import {useState} from "react";
import './ScriptMenu.css'

export default function ScriptMenu({scripts, setActiveScript}) {
    const [openContainer, setOpenContainer] = useState(-1);

    const handleClick = (scriptID) => {
        if (openContainer === scriptID)
            scriptID = -1

        setActiveScript(scriptID)
        setOpenContainer(scriptID)
    }

    return (
            <div id='script-menu'>
                {scripts.map(def => (
                    <ScriptContainer script={def}
                                     onClick={() => {handleClick(def.script_id)}}
                                     background={openContainer === def.script_id ? 'var(--federal-blue)' : 'var(--a2u-blue)'}
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