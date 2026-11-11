import { Button } from "../../../components/button/Button";
import { TextInput } from "../../../components/textInput/TextInput";

import TextIcon from '../../../assets/text-icon.png'
import ImageIcon from '../../../assets/image-icon.png'
import FigureIcon from '../../../assets/figure-icon.png'

import styles from './Tools.module.css'
import { Palette } from "../../palette/Palette";
import { useState } from "react";
import { getSelectedObjectIds, getSelectedSlideIds } from "../../../viewModel/viewModel";
import { dispatch, getState } from "../../../model/editor";
import type { SlideObject } from "../../../model/types/objects";
import { updateColor, updateFontFamily, updateFontSize, updateFontStyle, updateFontWeight, updateObjectsInPresentation, updateTextDecoration } from "../../../model/functions/objects";
import { useTextProperties } from "../../../hooks/useTextProperties";

const MAX_FONT_SIZE = 200
const MIN_FONT_SIZE = 8

function Tools() {
    const [isPaletteOpen, setIsPaletteOpen] = useState<boolean>(false) 

    const presentation = getState()
    const selectedSlideId = getSelectedSlideIds()[0]
    const currentSlide = presentation?.slides.find(
        slide => slide.id === selectedSlideId
    )
    const selectedObjectIds = getSelectedObjectIds()
    const lastSelectedObject = currentSlide?.slideObjects.find(
        object => object.id === selectedObjectIds[selectedObjectIds.length - 1]
    )

    const selectedTextObject = lastSelectedObject?.type === 'text' ? lastSelectedObject : undefined
    const textProperties = useTextProperties(selectedTextObject)

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

    return(
       <div className ={styles.toolArea}>
           <div className={styles.tools + ' ' + styles.toolsTop}>
                <h3 className={styles.toolName}>Инструменты</h3>
                <Button className={styles.icon}><img src={TextIcon} /></Button>
                <Button className={styles.icon}><img src={ImageIcon} /></Button>
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