import fitty from "fitty";
import PropTypes from "prop-types";
import './ScriptContainer.css'

export default function ScriptContainer({script, onClick, background}) {

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
        <div className='script-container' style={{background: background}} onClick={onClick}>
            <h1>{script?.definition?.script_name !== undefined ? script.definition.script_name : beautifyName(script.file_name)}</h1>
            <div className='script-info-box'>
                {
                    script?.definition?.parameters ? (
                        <p>{'Parameter count: ' + Object.keys(script.definition.parameters).length}</p>
                    ) : null
                }
                <p>{script.file_name}</p>
            </div>
        </div>
    )
}
ScriptContainer.propTypes = {
    script: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    background: PropTypes.string.isRequired,
}