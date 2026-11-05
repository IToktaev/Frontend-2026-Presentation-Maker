import type { Slide as SlideData} from '../../model/types/slide'
import styles from './Slide.module.css'
import { SlideObject } from '../slideObject/SlideObject'
import type React from 'react'

type SlideProps = {
    scale: number,
    slide: SlideData,
    onObjectClick?: (event: React.MouseEvent) => void
    children?: React.ReactNode,
    contentRef?: React.RefObject<HTMLDivElement | null>
}

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

function Slide({scale, slide, onObjectClick, contentRef, children}: SlideProps) {
    const width = 1700
    const height = 880

    if (slide) {
        const background = getBackgroundStyle(slide.background)

        return(
            <div 
                ref={contentRef}
                className={styles.content}
                style={{
                    width: width * scale,
                    height: height * scale,
                    ...background
                }}
                onClick={(event) => onObjectClick?.(event)}
            >
                {children}

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