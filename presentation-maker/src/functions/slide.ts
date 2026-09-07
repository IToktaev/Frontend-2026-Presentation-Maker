import { Presentation } from "../types/presentation.js"
import { Slide } from "../types/slide.js"

function addSlide(presentation: Presentation, slideId: string): Presentation {
    const newSlide: Slide = {
        id: slideId,
        background: {type: 'Solid', color: '#ffffff'},
        slideObjects: [],
        selectedObjectIds: []
    }

    return {
        ...presentation,
        currentSlideId: slideId,
        slides: [
            ...presentation.slides, 
            newSlide
        ],
        selectedSlideIds: [
            ...presentation.selectedSlideIds,
            newSlide.id
        ]
    }
}

function removeSlides(presentation: Presentation, selectedSlideIds: string[]): Presentation {
    const slides = presentation.slides.filter(slide => !selectedSlideIds.includes(slide.id))
    const currentSlideId = findNewCurrentSlideId(
        presentation.slides, 
        slides, 
        presentation.currentSlideId
    )

    return {
        ...presentation,
        currentSlideId: currentSlideId,
        selectedSlideIds: [],
        slides: slides
    }
}

function findNewCurrentSlideId(oldSlides: Slide[], newSlides: Slide[], prevCurrentSlideId: string): string {
    const selectedSlideIndex = oldSlides.findIndex(slide => slide.id == prevCurrentSlideId);

    if (selectedSlideIndex == -1) {
        return ''
    }

    for (let i = selectedSlideIndex; i >= 0; i--) {
        if (newSlides.includes(oldSlides[i])) {
            return oldSlides[i].id
        }
    }

    for (let i = selectedSlideIndex; i <= oldSlides.length - 1; i++) {
        if (newSlides.includes(oldSlides[i])) {
            return oldSlides[i].id
        }
    }

    return ''
}

function moveSlides(
    presentation: Presentation, 
    slideIds: string[], 
    newIndex: number
): Presentation {
    const slides = [...presentation.slides]
    const selectedSlides = slides.filter(slide => slideIds.includes(slide.id))
    const oldIndexes = []

    for (let i = 0; i < selectedSlides.length; i++) {
        const index = slides.findIndex(slide => slide == selectedSlides[i])
        if (index != -1) {
            oldIndexes.push(index)
        }
    }

    if (selectedSlides.length == 0) {
        return presentation
    }

    for (let i = oldIndexes.length - 1; i >= 0; i--) {
        const index = oldIndexes[i]
        slides.splice(index, 1)
    }
    slides.splice(newIndex, 0, ...selectedSlides)

    return {
        ...presentation,
        slides: slides
    }
}

function setCurrentSlide(presentation: Presentation, slideId: string): Presentation {
    return {
        ...presentation,
        currentSlideId: slideId,
    }
}

function setSlideSelection(
    presentation: Presentation, 
    slideId: string, 
    isOnlyCurrentSelected: boolean
): Presentation {
    const selectedSlideIds = [...presentation.selectedSlideIds];

    if (!selectedSlideIds.includes(slideId)) {
        selectedSlideIds.push(slideId)
    } else if (presentation.currentSlideId != slideId) {
        selectedSlideIds.splice(selectedSlideIds.findIndex(id => id == slideId), 1)
    }

    if (isOnlyCurrentSelected) {
        return {
            ...presentation,
            selectedSlideIds: [slideId]
        }
    } else {
        return {
            ...presentation,
            selectedSlideIds: selectedSlideIds
        }
    }
}

function duplicateSlide(
    presentation: Presentation, 
    newSlideId: string,
    newObjectIds: string[]
): Presentation {
    const slides = [...presentation.slides]
    const slideIndex = slides.findIndex(slide => slide.id == presentation.currentSlideId)
    const slide = slides[slideIndex]
    
    if (!slide) {
        return presentation
    }

    const newSlide = {
        id: newSlideId,
        background: slide.background,
        slideObjects: slide.slideObjects.map((object, index) => ({
            ...object,
            id: newObjectIds[index]
        })),
        selectedObjectIds: []
    }
    
    slides.splice(slideIndex + 1, 0, newSlide)

    return {
        ...presentation,
        slides: slides,
        currentSlideId: newSlideId,
        selectedSlideIds: [newSlideId]
    }
}

function setSlideBackgroundColor(slide: Slide, color: string): Slide {
    return {
        ...slide,
        background: {
            type: 'Solid',
            color: color
        }
    }
}

function setSlideBackgroundImage(slide: Slide, imageUrl: string): Slide {
    return {
        ...slide,
        background: {
            type: 'Image',
            src: imageUrl
        }
    }
}

function setSlideBackgroundGradient(slide: Slide, colors: string[], angle: number = 0): Slide {
    return {
        ...slide,
        background: {
            type: 'Gradient',
            colors: colors,
            angle: angle,
        }
    }
}

function setSlideBackgroundTransparent(slide: Slide): Slide {
    return {
        ...slide,
        background: {
            type: 'Transparent'
        }
    }
}

export {
    addSlide,
    removeSlides,
    moveSlides,
    setSlideSelection,
    setCurrentSlide,
    duplicateSlide,
    setSlideBackgroundColor,
    setSlideBackgroundImage,
    setSlideBackgroundGradient,
    setSlideBackgroundTransparent
}