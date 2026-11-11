import { useEffect, useRef, useState, type RefObject } from "react"
import type { SlideObject } from "../model/types/objects"
import { dispatch } from "../model/editor"
import { updateObjectsInPresentation, updatePosition } from "../model/functions/objects"
import type { Slide } from "../model/types/slide"

function useDragAndDrop(
    slide: Slide | undefined,
    selectedObjects: SlideObject[],
    slideContainer: RefObject<HTMLDivElement | null>,
    resizeMarker: RefObject<HTMLDivElement | null>,
    isEditing: boolean
): SlideObject[] {
    const [draggedObjects, setDraggedObjects] = useState<SlideObject[]>(selectedObjects)

    const selectedObjectsRef = useRef(selectedObjects)
    useEffect(() => {
        selectedObjectsRef.current = selectedObjects
    }, [selectedObjects])

    const draggedObjectsRef = useRef(draggedObjects)
    useEffect(() => {
        draggedObjectsRef.current = draggedObjects
    }, [draggedObjects])

    useEffect(() => {
        if (!slide || isEditing) { 
            return
        }

        let startX = 0
        let startY = 0
        let base: SlideObject[] = []

        let minDx = 0, minDy = 0, maxDx = 0, maxDy = 0

        const onMouseDown = (event: MouseEvent) => {
            const container = slideContainer.current
            if (
                !container || 
                event.target === resizeMarker.current ||
                !container.contains(event.target as Node)
            ) {
                return
            }

            startX = event.clientX
            startY = event.clientY
            base = selectedObjectsRef.current

            const minX = Math.min(...base.map(object => object.position.x))
            const maxX = Math.max(...base.map(object => object.position.x + object.size.width))
            const minY = Math.min(...base.map(object => object.position.y))
            const maxY = Math.max(...base.map(object => object.position.y + object.size.height))

            minDx = -minX
            maxDx = container.clientWidth - maxX
            minDy = -minY
            maxDy = container.clientHeight - maxY

            document.addEventListener("mousemove", onMouseMove)
            document.addEventListener("mouseup", onMouseUp)
        }

        const onMouseMove = (event: MouseEvent) => {
            let dx = event.clientX - startX
            let dy = event.clientY - startY

            dx = Math.max(minDx, Math.min(maxDx, dx))
            dy = Math.max(minDy, Math.min(maxDy, dy))

            setDraggedObjects(base.map(object => ({
                ...object,
                position: { x: object.position.x + dx, y: object.position.y + dy },
            })))
        }

        const onMouseUp = () => {
            const selected = selectedObjectsRef.current
            const moved = draggedObjectsRef.current

            dispatch(updateObjectsInPresentation, {
                slideId: slide.id,
                objectIds: selected.map(object => object.id),
                update: (object) => {
                    const dragged = moved.find(item => item.id === object.id)
                    return dragged ? updatePosition(object, dragged.position) : object
                },
            })

            setDraggedObjects([])
            document.removeEventListener("mousemove", onMouseMove)
            document.removeEventListener("mouseup", onMouseUp)
        }

        document.addEventListener("mousedown", onMouseDown)

        return () => {
            document.removeEventListener("mousedown", onMouseDown)
            document.removeEventListener("mousemove", onMouseMove)
            document.removeEventListener("mouseup", onMouseUp)
        }
    }, [slide, isEditing])

    return draggedObjects.length > 0 ? draggedObjects : []
}

export {
    useDragAndDrop
}