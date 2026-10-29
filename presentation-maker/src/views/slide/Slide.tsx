import type { Slide as SlideData} from '../../model/types/slide'
import styles from './Slide.module.css'
import { SlideObject } from '../slideObject/SlideObject'
import { getSelectedObjectIds } from '../../viewModel/viewModel'
import type { SlideObject as ObjectType } from '../../model/types/objects'

type SlideType = 'workspace' | 'slidelist' | 'preview'

type SlideProps = {
    type: SlideType,
    slide: SlideData
}

const WORKSPACE_SCALE = 1
const SLIDELIST_SCALE = 0.2
const PREVIEW_SCALE = 1.2

const OFFSET = 5

function getBackgroundStyle(background: SlideData['background']) {
    if (background.type === 'solid') {
        return {
            backgroundColor: background.color
        }
    }

    if (background.type === 'image') {
        return {
            backgroundImage: `url(${background.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }
    }
    if (background.type === 'transparent') {
        return {
            backgroundColor: 'transparent'
        }
    }

    if (background.type === 'gradient') {
        return {
            background: `linear-gradient(
                ${background.angle}deg,
                ${background.colors[0]},
                ${background.colors[1]}
            )`
        }
    }
}

function Slide({type, slide}: SlideProps) {
    const width = 1700
    const height = 880

    const selectedObjectIds = getSelectedObjectIds()

    let scale = 1
    switch (type) {
        case 'preview': scale = PREVIEW_SCALE; break
        case 'slidelist': scale = SLIDELIST_SCALE; break
        case 'workspace': scale = WORKSPACE_SCALE
    }

    if (slide) {
        const background = getBackgroundStyle(slide.background)

        const selectedObjects: ObjectType[] = slide.slideObjects
            .filter(object => selectedObjectIds.includes(object.id))

        const minX = Math.min(...selectedObjects.map(object => object.position.x))
        const maxX = Math.max(
            ...selectedObjects.map(object => object.position.x + object.size.width)
        )
        const minY = Math.min(...selectedObjects.map(object => object.position.y))
        const maxY = Math.max(
            ...selectedObjects.map(object => object.position.y + object.size.height)
        )

        return(
            <div 
                className={styles.content}
                style={{
                    width: width * scale,
                    height: height * scale,
                    ...background
                }}
            >
                {selectedObjects.length > 0 && type === 'workspace' &&
                    <div 
                        className={styles.selectedArea}
                        style={{
                            position: 'absolute',
                            left: minX * scale - OFFSET,
                            top: minY * scale - OFFSET,
                            width: (maxX - minX) * scale + OFFSET,
                            height: (maxY - minY) * scale + OFFSET
                        }}
                    >
                    </div>
                }

                {slide.slideObjects.map(object => (
                    <SlideObject 
                        key={object.id} 
                        object={object} 
                        scale={scale} 
                    />
                ))}
            </div>
        )
    } else {
        return(
            <></>
        )
    }
    
}

export {
    Slide
}