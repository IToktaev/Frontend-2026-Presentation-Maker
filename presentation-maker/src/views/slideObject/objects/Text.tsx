import { useEffect, useRef, useState } from "react";
import type { TextObject } from "../../../model/types/objects";
import { getEditableTextObjectId, setEditableTextObjectId } from "../../../viewModel/viewModel";
import { dispatch } from "../../../model/editor";
import { updateObjectsInPresentation, updateText } from "../../../model/functions/objects";

function Text(object: TextObject, scale: number, slideId: string) {
    const [isEditing, setIsEditing] = useState(false)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const handleDoubleClick = () => {
        setIsEditing(true)
        setEditableTextObjectId(object.id)
        textareaRef.current?.focus()
    }

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (object.type === 'text') {
            const editableTextObjectId = getEditableTextObjectId()

            dispatch(updateObjectsInPresentation, {
                slideId: slideId,
                objectIds: editableTextObjectId ? [editableTextObjectId] : [],
                update: (object) => {
                    return updateText(object, event.target.value)
                },
            })
        }
    }

    useEffect(() => {
        if (!isEditing) return

        const handleMouseDown = (event: MouseEvent) => {
            if (!textareaRef.current?.contains(event.target as Node)) {
                setIsEditing(false)
                setEditableTextObjectId(null)
                window.getSelection()?.removeAllRanges()
            }
        }

        document.addEventListener('mousedown', handleMouseDown)

        return () => {
            document.removeEventListener('mousedown', handleMouseDown)
        }
    }, [isEditing])

    return (
        <textarea
            ref={textareaRef}
            value={object.text}
            readOnly={!isEditing}
            onDoubleClick={handleDoubleClick}
            onMouseDown={(event) => {
                if (!isEditing) {
                    event.preventDefault()
                }
            }}
            onChange={(event) => handleChange(event)}
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