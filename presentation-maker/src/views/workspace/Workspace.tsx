import { useRef } from 'react'
import { useDragAndDrop } from '../../hooks/useDragAndDrop'
import type { SlideObject } from '../../model/types/objects'
import type { Slide as SlideData } from '../../model/types/slide'
import { deselectObjects, getCurrentSlideId, getSelectedObjectIds } from '../../viewModel/viewModel'
import { Slide } from '../slide/Slide'
import styles from './Workspace.module.css'

type WorkSpaceProps = {
    slides: SlideData[]
}

const OFFSET = 5

function Workspace({slides}: WorkSpaceProps) {
    const onClickToObject = (event: React.MouseEvent) => {
        const area = selectedAreaRef.current
        if (area) {
            const rect = area.getBoundingClientRect()
            if (
                event.clientX >= rect.left &&
                event.clientX <= rect.right &&
                event.clientY >= rect.top &&
                event.clientY <= rect.bottom
            ) {
                return
            }
        }
        if (event.target === event.currentTarget) {
            deselectObjects()
        }
    }

    const selectedAreaRef = useRef<HTMLDivElement>(null)
    const slideRef = useRef<HTMLDivElement>(null)

    const currentSlideId = getCurrentSlideId()
    const slide = slides.find(slide => slide.id == currentSlideId)

    const selectedObjectIds = getSelectedObjectIds()
    const selectedObjects: SlideObject[] =
        slide?.slideObjects?.filter(object => selectedObjectIds.includes(object.id)) ?? [];

    const draggedObjects = useDragAndDrop(slide, selectedObjects, slideRef)

    if (!slide || !draggedObjects) {
        return
    }

    const slideWithDraggedObjects = {
        ...slide,
        slideObjects: slide.slideObjects.map(object => {
            const dragged = draggedObjects.find(item => item.id === object.id)
            return dragged ?? object
        })
    }

    const hasSelection = draggedObjects.length > 0

    const minX = hasSelection ? Math.min(...draggedObjects.map(object => object.position.x)) : 0
    const minY = hasSelection ? Math.min(...draggedObjects.map(object => object.position.y)) : 0
    
    const maxX = hasSelection ? Math.max(...draggedObjects
        .map(object => object.position.x + object.size.width)) : 0
    const maxY = hasSelection ? Math.max(...draggedObjects
        .map(object => object.position.y + object.size.height)) : 0

    return(
        <div className={styles.workspace} >
            <Slide 
                scale={1} 
                slide={slideWithDraggedObjects} 
                onObjectClick={onClickToObject} 
                contentRef={slideRef}
            >
                {selectedObjects.length > 0 && (
                    <div
                        className={styles.selectedArea}
                        style={{
                        position: 'absolute',
                        left: minX - OFFSET,
                        top: minY - OFFSET,
                        width: maxX - minX + OFFSET,
                        height: maxY - minY + OFFSET,
                        }}
                        ref={selectedAreaRef}
                    />
                )}
            </Slide>
        </div>
    )
}

export {
    Workspace
}