import styles from './SlideTools.module.css'

import AddIcon from '../../../assets/add-slide-icon.png'
import DuplicateIcon from '../../../assets/duplicate-slide.png'
import DeleteIcon from '../../../assets/delete-slide.png'
import { Button } from '../../../components/button/Button'
import { TextInput } from '../../../components/textInput/TextInput'
import { dispatch, getState } from '../../../model/editor'
import { generateId, generateIds } from '../../../model/functions/idGeneration'
import { addSlide, createBackgroundColor, createBackgroundGradient, createBackgroundImage, createBackgroundTransparent, duplicateSlide, removeSlides, setBackgroundInPresentation } from '../../../model/functions/slide'
import { 
    getCurrentSlideId, 
    getSelectedSlideIds, 
    selectSlide, 
    setIdsBeforeRemoval
} from '../../../viewModel/viewModel'
import { Palette } from '../../palette/Palette'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useImageLoad } from '../../../hooks/useImageLoad'

const MIN_DEGREE = 0
const MAX_DEGREE = 360

function handleAddSlide(event: React.MouseEvent) {
    const newId = generateId()
    const currentId = getCurrentSlideId()!

    dispatch(addSlide, {currentSlideId: currentId, newSlideId: newId})
    selectSlide(newId, event.ctrlKey)
}

function handleDuplicateSlide(event: React.MouseEvent) {
    const newId = generateId()
    const currentId = getCurrentSlideId()!

    const slide = getState()?.slides.find(slide => slide.id === currentId)
    const objectIds = generateIds(slide?.slideObjects.length!)

    dispatch(duplicateSlide, {
        currentId,
        newId,
        objectIds,
    })
    selectSlide(newId, event.ctrlKey)
}

function handleRemoveSlides() {
    const slideIds = getSelectedSlideIds()

    setIdsBeforeRemoval()
    dispatch(removeSlides, slideIds)
}

function SlideTools() {
    const [isPaletteOpen, setIsPaletteOpen] = useState<boolean>(false)
    const [isGradient, setIsGradient] = useState<boolean>(false)

    const [firstColor, setFirstColor] = useState<string>('#fff')
    const [secondColor, setSecondColor] = useState<string>('#fff')
    const [degreeValue, setDegreeValue] = useState<number>(MIN_DEGREE)

    const [file, setFile] = useState<File | null>(null)
    const src = useImageLoad(file)

    const loadImageRef = useRef<HTMLInputElement | null>(null)

    const onPickFirstColor = (color: string) => {
        setFirstColor(color)
    }

    const onPickSecondColor = (color: string) => {
        setSecondColor(color)
    }

    const handleDegreeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (
            Number(event.target.value) < MIN_DEGREE ||
            Number(event.target.value) > MAX_DEGREE
        ) {
            return
        }

        setDegreeValue(Number(event.target.value))
    }

    const onSetSolidColor = () => {
        const background = createBackgroundColor(firstColor)
        dispatch(setBackgroundInPresentation, {slideId: getCurrentSlideId(), background: background})
    }

    const onSetTransparent = () => {
        const background = createBackgroundTransparent()
        dispatch(setBackgroundInPresentation, {slideId: getCurrentSlideId(), background: background})
    }

    const onSetGradient = () => {
        const background = createBackgroundGradient([firstColor, secondColor], degreeValue)
        dispatch(setBackgroundInPresentation, {slideId: getCurrentSlideId(), background: background})
    }

    const handleFileChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setFile(event.target.files?.[0] ?? null)
        }, []
    )

    const backgroundChangerRef = useRef<HTMLDivElement>(null)
    const backgroundButtonRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!isPaletteOpen) {
            return
        } 

        const handleMouseDown = (event: MouseEvent) => {
            const target = event.target as Node
            if (
                backgroundChangerRef.current && !backgroundChangerRef.current.contains(target) &&
                backgroundButtonRef.current && !backgroundButtonRef.current.contains(target)
            ) {
                setIsPaletteOpen(false)
            }
        }

        document.addEventListener('mousedown', handleMouseDown)
        return () => document.removeEventListener('mousedown', handleMouseDown)
    }, [isPaletteOpen])

    useEffect(() => {
        const currentSlideId = getCurrentSlideId()

        if (typeof src !== 'string' || !currentSlideId) {
            return
        }

        const background = createBackgroundImage(src)
        dispatch(setBackgroundInPresentation, {slideId: getCurrentSlideId(), background: background})
    }, [src])

    return(  
       <div className ={styles.toolArea}>
           <h3 className={styles.toolName}>Слайд</h3>
                
            <div className={styles.tools}>
                <Button className={styles.icon} onClick={handleAddSlide}>
                    <img src={AddIcon} />
                </Button>
                <Button className={styles.icon} onClick={handleDuplicateSlide}>
                    <img src={DuplicateIcon} className={styles.icon} />
                </Button>
                <Button className={styles.icon} onClick={handleRemoveSlides}>
                    <img src={DeleteIcon} className={styles.icon} />
                </Button>
                <div ref={backgroundButtonRef}>
                    <Button className={styles.backgroundButton} 
                        onClick={() => setIsPaletteOpen(!isPaletteOpen)}
                    >
                        Фон
                    </Button>
                </div>

            </div> 

            {isPaletteOpen && (
                <div className={styles.backgroundDisplay} ref={backgroundChangerRef}>
                    {!isGradient && (
                        <>
                            <Palette defaultColor={firstColor} onPickColor={onPickFirstColor} /> 
                            <Button 
                                className={styles.setBackgroundButton + ' ' + styles.changeColorType}
                                onClick={() => setIsGradient(true)}
                            >
                                Выбор градиента
                            </Button>
                            <Button className={styles.setBackgroundButton} onClick={onSetSolidColor}>
                                Установить цвет
                            </Button>
                        </>
                    )} 

                    {isGradient && (
                        <>
                            <Palette defaultColor={firstColor} onPickColor={onPickFirstColor} />
                            <Palette defaultColor={secondColor} onPickColor={onPickSecondColor} />
                            <div className={styles.gradientAngle}>
                                <p>Угол градиента:</p>
                                <TextInput 
                                    type="number" 
                                    min="0" 
                                    max="360" 
                                    value={degreeValue}
                                    className={styles.setAngle} 
                                    onChange={(event) => handleDegreeChange(event)}
                                />
                            </div>
                            <Button 
                                className={styles.setBackgroundButton + ' ' + styles.changeColorType}
                                onClick={() => setIsGradient(false)}
                            >
                                Выбор цвета
                            </Button>
                            <Button className={styles.setBackgroundButton} onClick={onSetGradient}>
                                Установить градиент
                            </Button>
                        </>
                    )} 

                    <Button 
                        className={styles.setBackgroundButton} 
                        onClick={() => loadImageRef.current?.click()}
                    >
                        Загрузить картинку
                    </Button>
                    <input 
                        type="file" 
                        accept="image/*" 
                        className={styles.loadImage} 
                        ref={loadImageRef} 
                        onChange={handleFileChange}
                    />
                    <Button className={styles.setBackgroundButton} onClick={onSetTransparent}>
                        Установить прозрачный
                    </Button>
                </div>
            )}
       </div> 
    )
}

export {
    SlideTools
}