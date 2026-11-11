import { useRef } from 'react'
import { useDragAndDrop } from '../../hooks/useDragAndDrop'
import type { SlideObject } from '../../model/types/objects'
import type { Slide as SlideData } from '../../model/types/slide'
import { deselectObjects, getCurrentSlideId, getEditableTextObjectId, getSelectedObjectIds } from '../../viewModel/viewModel'
import { Slide } from '../slide/Slide'
import styles from './Workspace.module.css'
import { useResize } from '../../hooks/useResize'

type WorkSpaceProps = {
    slides: SlideData[]
}

const OFFSET = 5

function Workspace({slides}: WorkSpaceProps) {
    const onClickToObject = (event: React.MouseEvent) => {
        if (window.getSelection()?.toString()) {
            return
        }

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
    const resizeMarkerRef = useRef<HTMLDivElement>(null)

    const currentSlideId = getCurrentSlideId()
    const slide = slides.find(slide => slide.id == currentSlideId)

    const selectedObjectIds = getSelectedObjectIds()
    const selectedObjects: SlideObject[] =
        slide?.slideObjects?.filter(object => selectedObjectIds.includes(object.id)) ?? [];

    const isTextEditing = getEditableTextObjectId() ? true : false

    const draggedObjects = useDragAndDrop(slide, selectedObjects, slideRef, resizeMarkerRef, isTextEditing)
    const resizedObjects = useResize(slide, selectedObjects, slideRef, resizeMarkerRef)

    if (!slide || !draggedObjects || !resizedObjects) {
        return
    }

    const slideWithModifiedObjects = {
        ...slide,
        slideObjects: slide.slideObjects.map(object => {
            const dragged = draggedObjects.find(item => item.id === object.id)
            const resized = resizedObjects.find(item => item.id === object.id)
            if (dragged) {
                return dragged
            }

            if (resized) {
                return resized
            }

            return object
        })
    }

    let objectsInSelectedArea = selectedObjects

    if (draggedObjects.length > 0) {
        objectsInSelectedArea = draggedObjects
    }

    if (resizedObjects.length > 0) {
        objectsInSelectedArea = resizedObjects
    }

    const minX = Math.min(...objectsInSelectedArea.map(object => object.position.x))
    const minY = Math.min(...objectsInSelectedArea.map(object => object.position.y))
    
    const maxX = Math.max(...objectsInSelectedArea
        .map(object => object.position.x + object.size.width))
    const maxY = Math.max(...objectsInSelectedArea
        .map(object => object.position.y + object.size.height))

    return(
        <div className={styles.workspace} 
            style={{ cursor: resizedObjects.length > 0 ? 'nwse-resize' : 'default'}}
        >
            <Slide 
                scale={1} 
                slide={slideWithModifiedObjects} 
                onObjectClick={onClickToObject} 
                contentRef={slideRef}
                isObjectInteractive={true}
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
                    >
                        <div 
                            className={styles.resizeMarker} 
                            ref={resizeMarkerRef} 
                        />
                    </div>
                )}
            </Slide>
        </div>
    )
}

export {
    Workspace
}