import { Button } from "../../../components/button/Button";
import { TextInput } from "../../../components/textInput/TextInput";

import TextIcon from '../../../assets/text-icon.png'
import ImageIcon from '../../../assets/image-icon.png'
import FigureIcon from '../../../assets/figure-icon.png'

import styles from './Tools.module.css'
import { Palette } from "../../palette/Palette";
import { useCallback, useEffect, useRef, useState } from "react";
import { getCurrentSlideId, getSelectedObjectIds } from "../../../viewModel/viewModel";
import { dispatch, getState } from "../../../model/editor";
import type { SlideObject } from "../../../model/types/objects";
import { addObjectToPresentation, createImage, updateColor, updateFontFamily, updateFontSize, updateFontStyle, updateFontWeight, updateObjectsInPresentation, updateTextDecoration } from "../../../model/functions/objects";
import { useTextProperties } from "../../../hooks/useTextProperties";
import { useImageLoad } from "../../../hooks/useImageLoad";
import { generateId } from "../../../model/functions/idGeneration";

const MAX_FONT_SIZE = 200
const MIN_FONT_SIZE = 8

const NEW_OBJECT_POSITION = {x: 200, y: 150}
const NEW_OBJECT_SIZE = {width: 300, height: 200}

function Tools() {
    const [isPaletteOpen, setIsPaletteOpen] = useState<boolean>(false) 
    const [file, setFile] = useState<File | null>(null);
    const src = useImageLoad(file);

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

    const onPickColor = (color: string) => {
        updateSelectedText(object => updateColor(object, color))
    } 

    const onChangeFontSize = (fontSize: number) => {
        if (fontSize > MAX_FONT_SIZE || fontSize < MIN_FONT_SIZE) {
            return
        }

        updateSelectedText(object => updateFontSize(object, fontSize))
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
                        value={textProperties?.fontSize ?? 12}
                        min={MIN_FONT_SIZE}
                        max={MAX_FONT_SIZE}
                        onChange={(event) => onChangeFontSize(Number(event.target.value))}
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
                        style={{ backgroundColor: textProperties?.fontColor ?? 'red' }}
                        onClick={() => setIsPaletteOpen(!isPaletteOpen)}
                    >
                    </Button>
                </div> 
            }

            {isPaletteOpen && selectedTextObject && (
                <div className={styles.paletteDisplay}>
                    <Palette onPickColor={onPickColor}/>
                </div>
            )}
       </div> 
    )
}

export {
    Tools
}