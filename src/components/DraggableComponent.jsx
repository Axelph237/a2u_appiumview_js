import {useRef, useState } from 'react'
import PropTypes from "prop-types";

const DraggableComponent = ({ className, children }) => {
    const [pressed, setPressed] = useState(false)
    const [position, setPosition] = useState({x: 0, y: 0})
    const ref = useRef()

    // Update the current position if mouse is down
    const onMouseMove = (event) => {
        if (pressed) {
            setPosition({
                x: position.x + event.movementX,
                y: position.y + event.movementY
            })
        }
    }

    return (
        <div
            ref={ref}
            className={className}
            style={{position: "absolute", top: position.y, left: position.x}}
            onMouseMove={onMouseMove}
            onMouseDown={() => setPressed(true)}
            onMouseUp={() => setPressed(false)}>
            {children}
        </div>
    )
}
DraggableComponent.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
}

export default DraggableComponent