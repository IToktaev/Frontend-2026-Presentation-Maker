import { useEffect } from "react"
import { dispatch } from "../model/editor"
import { removeObjectsFromPresentation } from "../model/functions/objects"
import { removeSlides } from "../model/functions/slide"
import { 
    getSelectedObjectIds, 
    getCurrentSlideId, 
    deselectObjects,
    getSelectedSlideIds, 
    setIdsBeforeRemoval
} from "../viewModel/viewModel"

function useKeyBoard() {
    const selectedObjectIds = getSelectedObjectIds()
    const selectedSlideIds = getSelectedSlideIds()
    const currentSlideId = getCurrentSlideId()

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Delete') {
                if (selectedObjectIds.length !== 0) {
                    deselectObjects()
                    dispatch(removeObjectsFromPresentation, {
                        slideId: currentSlideId,
                        selectedObjectIds: selectedObjectIds
                    })
                } else { 
                    setIdsBeforeRemoval()
                    dispatch(removeSlides, selectedSlideIds)
                }
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [selectedObjectIds, currentSlideId])
}

export {
    useKeyBoard
}