import { getState } from "../model/editor"

let currentSlideId: string | null = null
let selectedSlideIds: string[] = []
let viewModelChangeHandler: (() => void) | null = null

let isPreviewMode = false;

function addViewModelChangeHandler(handler: () => void): void {
    viewModelChangeHandler = handler
}

function isSlideSuitable(id: string, selectFromSelected: boolean): boolean {
    if (selectFromSelected) {
        return selectedSlideIds.includes(id)
    }

    return !selectedSlideIds.includes(id)
}

function changeCurrentSlideId(selectFromSelected: boolean): string | null {
    const slideIds = getState()?.slides.map(slide => slide.id) ?? []

    if (slideIds.length === 0) {
        return null;
    }

    const currentIndex = slideIds.indexOf(currentSlideId!)


    for (let i = currentIndex - 1; i >= 0; i--) {
    if (isSlideSuitable(slideIds[i], selectFromSelected)) {
            return slideIds[i];
        }
    }

    for (let i = currentIndex + 1; i < slideIds.length; i++) {
        if (isSlideSuitable(slideIds[i], selectFromSelected)) {
            return slideIds[i];
        }
    }

    return null;
}

function initializeViewModel(): void {
    const slides = getState()?.slides ?? []

    currentSlideId = slides[0]?.id ?? null
    selectedSlideIds = currentSlideId ? [currentSlideId] : []
}

function getCurrentSlideId(): string | null {
    return currentSlideId
}

function getSelectedSlideIds(): string[] {
    return [...selectedSlideIds]
}

function selectNewSlide(newId: string, ctrl: boolean): void {
    if (!ctrl) {
        currentSlideId = newId;
        selectedSlideIds = [newId]
    } else {
        if (newId === currentSlideId) {
            if (selectedSlideIds.length !== 1) {
                const currentIndex = selectedSlideIds.indexOf(currentSlideId)
                selectedSlideIds.splice(currentIndex, 1)
                currentSlideId = changeCurrentSlideId(true)
            }
        } else if (selectedSlideIds.includes(newId)) {
            const newIndex = selectedSlideIds.indexOf(newId)
            selectedSlideIds.splice(newIndex, 1)
        } else {
            currentSlideId = newId
            selectedSlideIds.push(newId)
        }
    }

    if (viewModelChangeHandler) {
        viewModelChangeHandler()
    }
}

function setIdsAfterRemoval() {
    currentSlideId = changeCurrentSlideId(false);
    selectedSlideIds = currentSlideId ? [currentSlideId] : [];

    if (viewModelChangeHandler) {
        viewModelChangeHandler()
    }
}

function setPreviewMode(mode: boolean): void {
    selectedSlideIds = currentSlideId ? [currentSlideId] : []

    isPreviewMode = mode;
    if (viewModelChangeHandler) {
        viewModelChangeHandler();
    }
}

function getPreviewMode(): boolean {
  return isPreviewMode;
}

function switchSlide(direction: -1 | 1) {
    const slides = getState()?.slides
    const currentIndex = slides?.findIndex(slide => slide.id == currentSlideId)

    if (currentIndex == undefined || !slides) {
        return
    }

    currentSlideId = slides[currentIndex + direction].id

    if (viewModelChangeHandler) {
        viewModelChangeHandler()
    }
}

export {
    initializeViewModel,
    getCurrentSlideId,
    getSelectedSlideIds,
    selectNewSlide,
    setIdsAfterRemoval,
    addViewModelChangeHandler,
    setPreviewMode,
    getPreviewMode,
    switchSlide
}

//нужно добавить типы данных, покрыть тестами и избавиться от двойственности selectedSlideId и currentSlideId