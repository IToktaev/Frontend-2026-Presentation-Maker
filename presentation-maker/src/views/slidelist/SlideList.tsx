import type { Slide as SlideData } from '../../model/types/slide'
import { getSelectedSlideIds, selectNewSlide } from '../../viewModel/viewModel'
import { Slide } from '../slide/Slide'
import styles from './slideList.module.css'

type WorkSpaceProps = {
    slides: SlideData[]
}

function handleSlideClick(slideId: string, ctrlKey: boolean) {
    selectNewSlide(slideId, ctrlKey)
}

function SlideList({slides}: WorkSpaceProps) {
    const selectedSlideIds = getSelectedSlideIds()

    return (
        <div className={styles.slideList}>
            {slides.map((slide) => {
                const isSelected = selectedSlideIds.includes(slide.id)

                return (
                    <div
                        key={slide.id}
                        className={isSelected ? styles.selectedSlide : styles.slide}
                        onClick={(event) =>
                            handleSlideClick(slide.id, event.ctrlKey)
                        }
                    >
                        <Slide
                            scale={0.2}
                            slide={slide}
                        />
                    </div>
                )
            })}
        </div>
    )
}

export {
    SlideList
}