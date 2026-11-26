import { useEffect, useRef, useState } from "react"
import type { TextObject } from "../../../model/types/objects"
import {
    getEditableTextObjectId,
    setEditableTextObjectId
} from "../../../viewModel/viewModel"
import { dispatch } from "../../../model/editor"
import {
    updateObjectsInPresentation,
    updateText
} from "../../../model/functions/objects"

type TextProps = {
    object: TextObject
    scale: number
    slideId: string
}

function Text({ object, scale, slideId }: TextProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [value, setValue] = useState(object.text)
    const divRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!isEditing) {
            setValue(object.text)
        }
    }, [object.text, isEditing])

    const handleDoubleClick = () => {
        setIsEditing(true)
        setEditableTextObjectId(object.id)
        divRef.current?.focus()
    }

    const onUpdateText = () => {
        const editableTextObjectId = getEditableTextObjectId()

        dispatch(updateObjectsInPresentation, {
            slideId,
            objectIds: editableTextObjectId ? [editableTextObjectId] : [],
            update: (currentObject) => updateText(currentObject, value),
        })
    }

    const finishEditing = () => {
        onUpdateText()
        setIsEditing(false)
        setEditableTextObjectId(null)
    }

    const handleInput = (event: React.FormEvent<HTMLDivElement>) => {
        setValue(event.currentTarget.innerText)
    }

    useEffect(() => {
        if (!isEditing) {
            return
        }

        const handleMouseDown = (event: MouseEvent) => {
            if (!divRef.current?.contains(event.target as Node)) {
                finishEditing()
                window.getSelection()?.removeAllRanges()
            }
        }

        document.addEventListener("mousedown", handleMouseDown)

        return () => {
            document.removeEventListener("mousedown", handleMouseDown)
        }
    }, [isEditing, value])

    return (
        <div
            ref={divRef}
            contentEditable={isEditing}
            suppressContentEditableWarning
            onInput={handleInput}
            onKeyDown={(event) => {
                if (event.key === "Enter") {
                    event.preventDefault()
                    finishEditing()
                    divRef.current?.blur()
                }
            }}
            onDoubleClick={handleDoubleClick}
            onMouseDown={(event) => {
                if (!isEditing) {
                    event.preventDefault()
                }
            }}
            style={{
                position: "absolute",
                left: object.position.x * scale,
                top: object.position.y * scale,
                width: object.size.width * scale,
                minHeight: object.size.height * scale,
                fontWeight: object.fontWeight,
                fontStyle: object.fontStyle,
                textDecoration: object.textDecoration,
                fontSize: object.fontSize * scale,
                fontFamily: object.fontFamily,
                color: object.color,
                background: "none",
                border: "none",
                outline: "none",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                lineHeight: 1.2,
                overflow: "visible",
                userSelect: isEditing ? "text" : "none",
                cursor: isEditing ? "text" : "inherit",
            }}
        >
            {value}
        </div>
    )
}

export { Text }