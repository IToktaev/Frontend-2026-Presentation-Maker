import type { Slide as SlideData } from '../../model/types/slide'
import { getCurrentSlideId } from '../../viewModel/viewModel'
import { Slide } from '../slide/Slide'
import styles from './Workspace.module.css'

type WorkSpaceProps = {
    slides: SlideData[]
}

function Workspace({slides}: WorkSpaceProps) {
    const currentSlideId = getCurrentSlideId()

    const slide = slides.find(slide => slide.id == currentSlideId)!

    return(
        <div className={styles.workspace}>
            <Slide scale = {1} slide={slide}/>
        </div>
    )
}

export {
    Workspace
}