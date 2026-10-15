import styles from './slideTools.module.css'

import AddIcon from '../../../assets/add-slide-icon.png'
import DuplicateIcon from '../../../assets/duplicate-slide.png'
import DeleteIcon from '../../../assets/delete-slide.png'
import { Button } from '../../../components/button/Button'
import { TextInput } from '../../../components/textInput/TextInput'
import { dispatch, getState } from '../../../model/editor'
import { generateId, generateIds } from '../../../model/functions/idGeneration'
import { addSlide, duplicateSlide, removeSlides } from '../../../model/functions/slide'
import { 
    getCurrentSlideId, 
    getSelectedSlideIds, 
    setIdsAfterRemoval
} from '../../../viewModel/viewModel'
import { Palette } from '../../palette/Palette'

function handleAddSlide() {
    const slideId = generateId()

    dispatch(addSlide, slideId)
}

function handleDuplicateSlide() {
    const duplicatedId = generateId()
    const currentId = getCurrentSlideId()!

    const slide = getState()?.slides.find(slide => slide.id === currentId)
    const newObjectIds = generateIds(slide?.slideObjects.length!)

    dispatch(
        duplicateSlide, 
        {currentId, newIds: {slideId: duplicatedId, objectIds: newObjectIds}}
    )
}

function handleRemoveSlides() {
    const slideIds = getSelectedSlideIds()

    dispatch(removeSlides, slideIds)
    setIdsAfterRemoval()
}

function SlideTools() {
    const isBackgroundDisplayVisible = false;
    const isGradient = false;

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
                <Button className={styles.backgroundButton}>Фон</Button>
            </div> 

            {isBackgroundDisplayVisible && (
                <div className={styles.backgroundDisplay}>
                    {!isGradient && (
                        <>
                            <Palette /> 
                            <Button className={
                                styles.setBackgroundButton + ' ' + styles.changeColorType
                            }>
                                Выбор градиента
                            </Button>
                            <Button className={styles.setBackgroundButton}>
                                Установить цвет
                            </Button>
                        </>
                    )} 

                    {isGradient && (
                        <>
                            <Palette />
                            <div className={styles.gradientAngle}>
                                <p>Угол градиента:</p>
                                <TextInput 
                                    type="number" 
                                    min="0" 
                                    max="360" 
                                    defaultValue="0"
                                    className={styles.setAngle} 
                                />
                            </div>
                            <Button className={
                                styles.setBackgroundButton + ' ' + styles.changeColorType
                            }>
                                Выбор цвета
                            </Button>
                            <Button className={styles.setBackgroundButton}>
                                Установить градиент
                            </Button>
                        </>
                    )} 

                    <Button className={styles.setBackgroundButton}>
                        Загрузить картинку
                    </Button>
                    <Button className={styles.setBackgroundButton}>
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