import { useRef, useState } from "react";
import type { TextObject } from "../../../model/types/objects";

function Text(object: TextObject, scale: number) {
    const [isEditing, setIsEditing] = useState(false)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const handleDoubleClick = () => {
        setIsEditing(true)
        textareaRef.current?.focus()
    }

    return (
        <textarea
            ref={textareaRef}
            value={object.text}
            readOnly={!isEditing}
            onDoubleClick={handleDoubleClick}
            onBlur={() => setIsEditing(false)}
            onMouseDown={(event) => {
                if (!isEditing) {
                    event.preventDefault()
                }
            }}
            style={{
                position: 'absolute',
                left: object.position.x * scale,
                top: object.position.y * scale,
                width: object.size.width * scale,
                height: object.size.height * scale,
                fontWeight: object.fontWeight,
                fontStyle: object.fontStyle,
                textDecoration: object.textDecoration,
                fontSize: object.fontSize * scale,
                fontFamily: object.fontFamily,
                color: object.color,
                background: 'none',
                border: 'none',
                resize: 'none',
                outline: 'none',
                userSelect: isEditing ? 'text' : 'none',
                cursor: isEditing ? 'text' : 'default',
                overflow: 'hidden'
            }}
        />
    )
}

export { 
    Text 
}