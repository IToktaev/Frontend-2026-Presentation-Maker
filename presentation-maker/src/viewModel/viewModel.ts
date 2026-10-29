import { getState } from "../model/editor"

type ViewModel = {
    selectedSlideIds: string[],
    selectedObjectIds: string[]
    isPreviewMode: boolean
}

let viewModel: ViewModel | null = null
let viewModelChangeHandler: (() => void) | null

function addViewModelChangeHandler(handler: () => void): void {
    viewModelChangeHandler = handler
}

function isSlideSuitable(
    selectedSlideIds: string[], 
    id: string, 
    selectFromSelected: boolean
): boolean {
    if (selectFromSelected) {
        return selectedSlideIds.includes(id)
    }

    return !selectedSlideIds.includes(id)
}

function changeCurrentSlideId(
    selectedSlideIds: string[], 
    selectFromSelected: boolean
): string | null {
    const slideIds = getState()?.slides.map(slide => slide.id) ?? []
    const currentSlideId = getCurrentSlideId()

    if (slideIds.length === 0 || currentSlideId === null) {
        return null
    }

    const currentIndex = slideIds.indexOf(currentSlideId)

    if (currentIndex === -1) {
        return slideIds.find(
            id => isSlideSuitable(selectedSlideIds, id, selectFromSelected)
        ) ?? null
    }

    for (let i = currentIndex - 1; i >= 0; i--) {
        if (isSlideSuitable(selectedSlideIds, slideIds[i], selectFromSelected)) {
            return slideIds[i]
        }
    }

    for (let i = currentIndex + 1; i < slideIds.length; i++) {
        if (isSlideSuitable(selectedSlideIds, slideIds[i], selectFromSelected)) {
            return slideIds[i]
        }
    }

    return null
}

function initializeViewModel(): void {
    const slides = getState()?.slides ?? []
    const selectedSlideIds = []

    if (slides.length > 0) {
        selectedSlideIds.push(slides[0].id)
    }

    viewModel = {
        selectedSlideIds: selectedSlideIds,
        selectedObjectIds: [],
        isPreviewMode: false
    }
}

function getCurrentSlideId(): string | null {
    return viewModel?.selectedSlideIds[0] ?? null
}

function getSelectedSlideIds(): string[] {
    if (!viewModel) {
        return []
    }

    return [...viewModel.selectedSlideIds]
}

function getSelectedObjectIds(): string[] {
    if (!viewModel) {
        return []
    }

    return [...viewModel.selectedObjectIds]
}

function selectNewObject(newId: string, ctrl: boolean) {
    if (!viewModel) {
        return
    }

    const selectedObjectIds = viewModel.selectedObjectIds

    if (!ctrl) {
        viewModel.selectedObjectIds = [newId]
    } else {
        if (selectedObjectIds.includes(newId)) {
            viewModel.selectedObjectIds = selectedObjectIds.filter(id => id !== newId)
        } else {
            viewModel.selectedObjectIds = [
                ...selectedObjectIds,
                newId
            ]
        }
    }

    viewModelChangeHandler?.()
}

function deselectObjects(): void {
    if (!viewModel) {
        return
    }

    viewModel.selectedObjectIds = []
}

function selectNewSlide(newId: string, ctrl: boolean): void {
    if (!viewModel) {
        return
    }
    deselectObjects()
    const selectedIds = viewModel.selectedSlideIds

    if (!ctrl) {
        viewModel.selectedSlideIds = [newId]
    } else {
        const currentSlideId = getCurrentSlideId()

        if (newId === currentSlideId) {
            if (viewModel.selectedSlideIds.length !== 1) {
                const nextCurrentSlideId = changeCurrentSlideId(selectedIds, true)

                viewModel.selectedSlideIds = selectedIds.filter(id => id !== currentSlideId)

                if (nextCurrentSlideId) {
                    viewModel.selectedSlideIds = [
                        nextCurrentSlideId,
                        ...selectedIds.filter(id => id !== nextCurrentSlideId),
                    ]
                }
            }
        } else if (selectedIds.includes(newId)) {
            viewModel.selectedSlideIds = selectedIds.filter(id => id !== newId)
        } else {
            viewModel.selectedSlideIds = [
                newId,
                ...selectedIds,
            ]
        }
    }

    viewModelChangeHandler?.()
}

function setIdsBeforeRemoval(): void {
    if (!viewModel) {
        return
    }

    deselectObjects()
    const nextCurrentSlideId = changeCurrentSlideId(viewModel.selectedSlideIds, false)

    viewModel.selectedSlideIds = nextCurrentSlideId ? [nextCurrentSlideId] : []
    viewModelChangeHandler?.()
}

function setPreviewMode(mode: boolean): void {
    if (!viewModel) {
        return
    }

    if (mode) {
        viewModel.selectedSlideIds = viewModel.selectedSlideIds.slice(0, 1)
    }

    viewModel.isPreviewMode = mode
    viewModelChangeHandler?.()
}

function getPreviewMode(): boolean {
    return viewModel?.isPreviewMode ?? false
}

function switchSlide(direction: -1 | 1): void {
    if (!viewModel) {
        return
    }

    const slides = getState()?.slides ?? []
    const currentSlideId = viewModel?.selectedSlideIds[0]

    const currentIndex = slides.findIndex(
        slide => slide.id === currentSlideId
    )

    if (currentIndex === -1) {
        return
    }

    const nextIndex = currentIndex + direction

    if (nextIndex < 0 || nextIndex >= slides.length) {
        return
    }

    viewModel.selectedSlideIds = [slides[nextIndex].id]
    viewModelChangeHandler?.()
}

export {
    initializeViewModel,
    getCurrentSlideId,
    getSelectedSlideIds,
    selectNewSlide,
    setIdsBeforeRemoval,
    addViewModelChangeHandler,
    setPreviewMode,
    getPreviewMode,
    switchSlide,
    selectNewObject,
    deselectObjects,
    getSelectedObjectIds
}
