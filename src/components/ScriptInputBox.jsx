import {useState} from "react";
import PropTypes from "prop-types";
import "./ScriptInputBox.css";

export default function TestInput({inputID, defaultValue}) {
    const [booleanInput, setBooleanInput] = useState(false)

    let inputElement = (<></>)
    let inputType = typeof defaultValue

    switch (inputType) {
        case "string":
            inputElement = (
                <input name={inputID} className='test-input-box' type='text' defaultValue={defaultValue}/>
            )
            break;

        case "number":
            inputElement = (
                <input name={inputID} className='test-input-box' type='number' defaultValue={defaultValue}/>
            )
            break;

        // TODO fix checkbox formatting
        case "boolean":
            inputElement = (
                <div className='checkbox-container'>
                    <input name={inputID} className='test-input-box' type='checkbox' value={String(booleanInput)}/>
                    <div className='tf-container'>
                        <div className={`boolean-checkbox ${!booleanInput && 'checked'}`} onClick={() => setBooleanInput(false)}>False</div>
                        <div className={`boolean-checkbox ${booleanInput && 'checked'}`} onClick={() => setBooleanInput(true)}>True</div>
                    </div>
                </div>
            )
            break;

        case "object":
            console.log(defaultValue + " is type Object!")
            break;
        default:
            break;
    }

    return (
        <div className='input-container'>
            <div className='layered' style={{width: '100%'}}>
                <b style={{justifySelf: 'start'}}>{inputID.toUpperCase()}</b>
                <p style={{justifySelf: 'end'}}>{inputType.toUpperCase()}</p>
            </div>
            {inputElement}
        </div>
    )
}
TestInput.propTypes = {
    inputID: PropTypes.string.isRequired,
    defaultValue: PropTypes.any,
}