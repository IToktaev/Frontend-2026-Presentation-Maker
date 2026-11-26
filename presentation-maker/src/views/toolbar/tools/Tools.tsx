import { Button } from "../../../components/button/Button"
import { TextInput } from "../../../components/textInput/TextInput"

import TextIcon from '../../../assets/text-icon.png'
import ImageIcon from '../../../assets/image-icon.png'
import FigureIcon from '../../../assets/figure-icon.png'

import styles from './Tools.module.css'
import { Palette } from "../../palette/Palette"
import { useCallback, useEffect, useRef, useState} from "react"
import { getCurrentSlideId, getSelectedObjectIds } from "../../../viewModel/viewModel"
import { dispatch, getState } from "../../../model/editor"
import type { SlideObject } from "../../../model/types/objects"
import { 
    addObjectToPresentation, 
    createImage, 
    updateColor, 
    updateFontFamily, 
    updateFontSize, 
    updateFontStyle, 
    updateFontWeight, 
    updateObjectsInPresentation, 
    updateTextDecoration 
} from "../../../model/functions/objects"
import { useTextProperties } from "../../../hooks/useTextProperties"
import { useImageLoad } from "../../../hooks/useImageLoad"
import { generateId } from "../../../model/functions/idGeneration"

type ToolProps = {
    localChangedObjects: SlideObject[]
    onLocalChangedObjectsChange: (objects: SlideObject[]) => void
}

const MAX_FONT_SIZE = 200
const MIN_FONT_SIZE = 8

const BASE_FONT_SIZE = 12

const NEW_OBJECT_POSITION = {x: 200, y: 150}
const NEW_OBJECT_SIZE = {width: 300, height: 200}

function clampFontSize(fontSize: number): number {
    if (fontSize > MAX_FONT_SIZE) {
        return MAX_FONT_SIZE
    } else if (fontSize < MIN_FONT_SIZE) {
        return MIN_FONT_SIZE
    } else {
        return fontSize
    }
} 

function Tools({localChangedObjects, onLocalChangedObjectsChange }: ToolProps) {
    const [isPaletteOpen, setIsPaletteOpen] = useState<boolean>(false) 
    const [file, setFile] = useState<File | null>(null)
    const [fontSize, setFontSize] = useState<number>(BASE_FONT_SIZE)

    const src = useImageLoad(file)

    const presentation = getState()
    const selectedSlideId = getCurrentSlideId()
    const currentSlide = presentation?.slides.find(
        slide => slide.id === selectedSlideId
    )
    const selectedObjectIds = getSelectedObjectIds()
    const lastSelectedObject = currentSlide?.slideObjects.find(
        object => object.id === selectedObjectIds[selectedObjectIds.length - 1]
    )

    const selectedTextObject = lastSelectedObject?.type === 'text' ? lastSelectedObject : undefined

    const textProperties = useTextProperties(selectedTextObject)
    const defaultColor = textProperties.fontColor ?? '#000000'

    useEffect(() => {
        setFontSize(textProperties.fontSize)
    }, [textProperties.fontSize])

    const loadImageRef = useRef<HTMLInputElement | null>(null)

    const updateSelectedText = (update: (object: SlideObject) => SlideObject) => {
        if (!selectedSlideId || !selectedTextObject) {
            return
        }

        dispatch(updateObjectsInPresentation, {
            slideId: selectedSlideId,
            objectIds: [selectedTextObject.id],
            update: object => {
                if (object.type !== 'text') {
                    return object
                }

                return update(object)
            }
        })
    }

    const updateTextColor = (color: string) => {
        if (!selectedSlideId || !selectedTextObject) {
            return
        }

        const updatedObject = updateColor(selectedTextObject, color)

        onLocalChangedObjectsChange([
            ...localChangedObjects.filter(
                object => object.id !== selectedTextObject.id
            ),
            updatedObject
        ])
    }

    const onPickColor = (color: string) => {
        updateTextColor(color)

        if (!selectedSlideId || !selectedTextObject) {
            return
        }

        dispatch(updateObjectsInPresentation, {
            slideId: selectedSlideId,
            objectIds: [selectedTextObject.id],
            update: object => {
                if (object.type !== 'text') return object
                return updateColor(object, color)
            }
        })

        onLocalChangedObjectsChange([])
    }

    const onChangeColor = (color: string) => {
        console.log(color)
        updateTextColor(color)
    }

    const onChangeFontSize = (fontSize: number) => {
        setFontSize(fontSize)

        const objectId = getSelectedObjectIds()[0]
        const object = localChangedObjects.find(object => object.id === objectId) ?? selectedTextObject

        if (!object || object.type !== 'text') {
            return
        }

        const updatedObject = updateFontSize(object, clampFontSize(fontSize))

        onLocalChangedObjectsChange([
            ...localChangedObjects.filter(object => object.id !== objectId),
            updatedObject
        ])
    }

    const onChangeFontFamily = (fontFamily: string) => {
        updateSelectedText(object => updateFontFamily(object, fontFamily))
    } 

    const handleTextDecoration = () => {
        const value = textProperties.textDecoration === 'underline' ? 'none' : 'underline'
        updateSelectedText(object => updateTextDecoration(object, value))
    }

    const handleFontWeight = () => {
        const value = textProperties.fontWeight === 'bold' ? 'normal' : 'bold'
        updateSelectedText(object => updateFontWeight(object, value))
    }

    const handleCursive = () => {
        const value = textProperties.fontStyle === 'italic' ? 'normal' : 'italic'
        updateSelectedText(object => updateFontStyle(object, value))
    }

    const handleFileChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setFile(event.target.files?.[0] ?? null)
        }, []
    )

    const onUpdateFontSize = () => {
        updateSelectedText(object => updateFontSize(object, clampFontSize(fontSize)))
        onLocalChangedObjectsChange([])
    }

    useEffect(() => {
        const currentSlideId = getCurrentSlideId()

        if (typeof src !== 'string' || !currentSlideId) {
            return
        }

        const imageObject: SlideObject = createImage({
            src: src,
            position: NEW_OBJECT_POSITION,
            size: NEW_OBJECT_SIZE,
        }, generateId())

        dispatch(addObjectToPresentation, {slideId: currentSlideId, object: imageObject})
        setFile(null)
    }, [src])

    return(
       <div className ={styles.toolArea}>
           <div className={styles.tools + ' ' + styles.toolsTop}>
                <h3 className={styles.toolName}>Инструменты</h3>
                <Button className={styles.icon}><img src={TextIcon} /></Button>
                <Button className={styles.icon} onClick={() => loadImageRef.current?.click()}>
                    <img src={ImageIcon} />
                </Button>
                <input 
                    type="file" 
                    accept="image/*" 
                    className={styles.loadImage} 
                    ref={loadImageRef} 
                    onChange={handleFileChange}
                />
                <Button className={styles.icon}><img src={FigureIcon} /></Button>
            </div>

            {selectedTextObject &&
                <div className={styles.tools + ' ' + styles.toolsBottom}>
                    <select 
                        className={styles.fontFamily} 
                        value={textProperties?.fontFamily ?? 'Arial'}
                        onChange={(event) => onChangeFontFamily(event.target.value)}
                    >
                        <option>Arial</option>
                        <option>Times New Roman</option>
                        <option >Georgia</option>
                    </select>
                    <TextInput 
                        className={styles.fontSize}
                        type="number"
                        value={fontSize}
                        min={MIN_FONT_SIZE}
                        max={MAX_FONT_SIZE}
                        onChange={(event) => onChangeFontSize(Number(event.target.value))}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                onUpdateFontSize()
                            }
                        }}
                        onBlur={onUpdateFontSize}
                    /> 
                    <Button 
                        className={
                            textProperties.textDecoration === 'underline'
                                ? styles.fontStyleIcon + ' ' + styles.activeFontIcon 
                                : styles.fontStyleIcon
                        }
                        onClick={handleTextDecoration}
                    >
                        <u>u</u>
                    </Button>
                    <Button 
                        className={
                            textProperties.fontWeight === 'bold'
                                ? styles.fontStyleIcon + ' ' + styles.activeFontIcon 
                                : styles.fontStyleIcon
                        }
                        onClick={handleFontWeight}
                    >
                        <b>b</b>
                    </Button>
                    <Button 
                        className={
                            textProperties.fontStyle === 'italic'
                                ? styles.fontStyleIcon + ' ' + styles.activeFontIcon 
                                : styles.fontStyleIcon
                        }
                        onClick={handleCursive}
                    >
                        <i>i</i>
                    </Button>

                    <Button 
                        className={styles.palette} 
                        style={{backgroundColor: textProperties?.fontColor}}
                        onClick={() => setIsPaletteOpen(!isPaletteOpen)}
                    >
                    </Button>
                </div> 
            }

            {isPaletteOpen && selectedTextObject && (
                <div className={styles.paletteDisplay}>
                    <Palette 
                        defaultColor={defaultColor} 
                        onPickColor={onPickColor}
                        onChangeColor={onChangeColor}
                    />
                </div>
            )}
       </div> 
    )
}

export {
    Tools
}