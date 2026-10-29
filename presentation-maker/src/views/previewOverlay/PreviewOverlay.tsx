import { Button } from "../../components/button/Button"
import type { Slide as SlideData } from "../../model/types/slide"
import { getCurrentSlideId, switchSlide} from "../../viewModel/viewModel"
import styles from './previewOverlay.module.css'

import Cross from '../../assets/preview-cross.png'
import { Slide } from "../slide/Slide"

type PreviewProps = {
    slides: SlideData[]
    onClose: () => void
}

function handlePrev() {
    switchSlide(-1)
}

function handleNext() {
    switchSlide(+1)
}

function PreviewOverlay({slides, onClose}: PreviewProps) {
    const currentSlideId = getCurrentSlideId()
    const slide = slides.find(slide => slide.id == currentSlideId)!

    const slideIndex = slides.findIndex(slide => slide.id == currentSlideId)
    const slidesAmount = slides.length

    let leftSwitcherClassName = styles.switcher
    let rightSwitcherClassName = styles.switcher

    if (slideIndex === 0) {
        leftSwitcherClassName += ' ' + styles.switcherDisabled
    }

    if (slideIndex === slidesAmount - 1) {
        rightSwitcherClassName += ' ' + styles.switcherDisabled
    }


    return(
        <div className={styles.preview}>
            <Button className={styles.cross} onClick={onClose}>
                <img src={Cross} />
            </Button>
            <Slide 
                type='preview'
                slide={slide}
            />
            <div className={styles.switchPanel}>
                <Button className={leftSwitcherClassName} onClick={handlePrev}>Назад</Button>
                <p className={styles.counter}>{slideIndex + 1}/{slidesAmount}</p>
                <Button className={rightSwitcherClassName} onClick={handleNext}>Дальше</Button>
            </div>
        </div>
    )
}

export {
    PreviewOverlay
}