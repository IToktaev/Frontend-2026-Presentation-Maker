import { useEffect, useRef, useState, type RefObject } from "react"
import type { SlideObject } from "../model/types/objects"
import { dispatch } from "../model/editor"
import { updateObjectsInPresentation, updateSize } from "../model/functions/objects"
import type { Slide } from "../model/types/slide"

const MIN_SIZE = 30

function useResize(
    slide: Slide | undefined,
    selectedObjects: SlideObject[],
    slideContainer: RefObject<HTMLDivElement | null>,
    resizeMarker: RefObject<HTMLDivElement | null>
): SlideObject[] {
    const [resizedObjects, setResizedObjects] = useState<SlideObject[]>(selectedObjects)

    const selectedObjectsRef = useRef(selectedObjects)
    useEffect(() => {
        selectedObjectsRef.current = selectedObjects
    }, [selectedObjects])

    const resizedObjectsRef = useRef(resizedObjects)
    useEffect(() => {
        resizedObjectsRef.current = resizedObjects
    }, [resizedObjects])

    useEffect(() => {
        if (!slide) { 
            return
        }

        let startX = 0
        let startY = 0
        let base: SlideObject[] = []

        let minDx = 0, minDy = 0, maxDx = 0, maxDy = 0

        const onMouseDown = (event: MouseEvent) => {
            const container = slideContainer.current
            if (!container || event.target !== resizeMarker.current) {
                return
            }

            startX = event.clientX
            startY = event.clientY
            base = selectedObjectsRef.current

            const minWidth = Math.min(...base.map(object => object.size.width))
            const minHeight = Math.min(...base.map(object => object.size.height))

            const maxX = Math.max(...base.map(object => object.position.x + object.size.width))
            const maxY = Math.max(...base.map(object => object.position.y + object.size.height))

            minDx = -minWidth + MIN_SIZE
            maxDx = container.clientWidth - maxX
            minDy = -minHeight + MIN_SIZE
            maxDy = container.clientHeight - maxY

            document.addEventListener("mousemove", onMouseMove)
            document.addEventListener("mouseup", onMouseUp)
        }

        const onMouseMove = (event: MouseEvent) => {
            let dx = event.clientX - startX
            let dy = event.clientY - startY

            dx = Math.max(minDx, Math.min(maxDx, dx))
            dy = Math.max(minDy, Math.min(maxDy, dy))

            setResizedObjects(base.map(object => ({
                ...object,
                size: { width: object.size.width + dx, height: object.size.height + dy },
            })))
        }

        const onMouseUp = () => {
            const selectedObjects = selectedObjectsRef.current
            const resizedObjects = resizedObjectsRef.current

            dispatch(updateObjectsInPresentation, {
                slideId: slide.id,
                objectIds: selectedObjects.map(object => object.id),
                update: (object) => {
                    const resized = resizedObjects.find(item => item.id === object.id)
                    return resized ? updateSize(object, resized.size) : object
                },
            })

            setResizedObjects([])
            document.removeEventListener("mousemove", onMouseMove)
            document.removeEventListener("mouseup", onMouseUp)
        }

        document.addEventListener("mousedown", onMouseDown)

        return () => {
            document.removeEventListener("mousedown", onMouseDown)
            document.removeEventListener("mousemove", onMouseMove)
            document.removeEventListener("mouseup", onMouseUp)
        }
    }, [slide])

    return resizedObjects.length > 0 ? resizedObjects : []
}

export {
    useResize
}