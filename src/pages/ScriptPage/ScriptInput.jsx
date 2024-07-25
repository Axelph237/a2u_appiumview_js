import {useState} from "react";
import PropTypes from "prop-types";
import './ScriptInput.css'

export default function ScriptInput({inputID, defaultValue}) {
    const [booleanInput, setBooleanInput] = useState(false)

    let inputElement = (<></>)
    let inputType = typeof defaultValue

    switch (inputType) {
        case "string":
            inputElement = (
                <input name={inputID} className='script-input' type='text' defaultValue={defaultValue}/>
            )
            break;

        case "number":
            inputElement = (
                <input name={inputID} className='script-input' type='number' defaultValue={defaultValue}/>
            )
            break;

        case "boolean":
            inputElement = (
                <div className='checkbox-container'>
                    <input name={inputID} className='script-input' type='checkbox' value={String(booleanInput)}/>
                    <div className='tf-container'>
                        <div className={`selection-pill ${!booleanInput && 'selected'}`} onClick={() => setBooleanInput(false)}>False</div>
                        <div className={`selection-pill ${booleanInput && 'selected'}`} onClick={() => setBooleanInput(true)}>True</div>
                    </div>
                </div>
            )
            break;

        case "dropdown":

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
ScriptInput.propTypes = {
    inputID: PropTypes.string.isRequired,
    defaultValue: PropTypes.any,
}

// TODO finish menu selection by adding dropdown carrot and secondary background
export function SelectFromMenu({items}) {
    const [selectedIndex, setSelectedIndex] = useState(0)

    const createMenu = () => {
        let menuItems = []

        for (let i = 0; i < items.length; i++) {
            menuItems.push((
                <div className={`selection-pill ${selectedIndex === i && 'selected'}`} onClick={() => setSelectedIndex(i)} style={{margin: '3px 0px'}} key={i}>{items[i]}</div>
            ))
        }

        return menuItems
    }

    return (
        <div className='layered'>
            <div className='dropdown-carrot'></div>
            <div className='dropdown-item-container'>
                {createMenu()}
            </div>
        </div>
    )
}

SelectFromMenu.propTypes = {
    items: PropTypes.array.isRequired
}