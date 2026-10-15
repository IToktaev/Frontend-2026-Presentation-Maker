import type { Presentation } from "../types/presentation.js"
import type { Background, Slide } from "../types/slide.js"

function addSlide(presentation: Presentation, slideId: string): Presentation {
    const newSlide: Slide = {
        id: slideId,
        background: {type: 'solid', color: '#ffffff'},
        slideObjects: []
    }

    return {
        ...presentation,
        slides: [
            ...presentation.slides, 
            newSlide
        ]
    }
}

function removeSlides(presentation: Presentation, selectedSlideIds: string[]): Presentation {
    const slides = presentation.slides.filter(slide => !selectedSlideIds.includes(slide.id))

    return {
        ...presentation,
        slides: slides
    }
}

function moveSlides(presentation: Presentation, slideIds: string[]): Presentation {
    const slides = slideIds
        .map(id => presentation.slides.find(slide => slide.id === id))
        .filter(slide => slide !== undefined)

    if (slideIds.length !== slides.length) {
        return presentation
    }

    return {
        ...presentation,
        slides: slides
    }
}

function duplicateSlide(
    presentation: Presentation,
    params: {
        currentId: string,
        newIds: {
            slideId: string,
            objectIds: string[]
        }
    }
): Presentation {
    const { currentId, newIds } = params

    const slides = [...presentation.slides]
    const slideIndex = slides.findIndex(slide => slide.id === currentId)
    const slide = slides[slideIndex]
    
    if (!slide) {
        return presentation
    }

    const newSlide: Slide = structuredClone(slide)
    newSlide.id = newIds.slideId

    newSlide.slideObjects.map((object, index) => {
        object.id = newIds.objectIds[index];
    })
    
    slides.splice(slideIndex + 1, 0, newSlide)

    return {
        ...presentation,
        slides: slides
    }
}

function setBackgroundInPresentation(
    presentation: Presentation,
    params: {
        slideId: string
        background: Background
    }
): Presentation {
    return {
        ...presentation,
        slides: presentation.slides.map(slide => {
            if (slide.id !== params.slideId) {
                return slide
            }

            return {
                ...slide,
                background: params.background
            }
        })
    }
}

function createBackgroundColor(color: string): Background {
    return {type: 'solid', color}
}

function createBackgroundImage(imageUrl: string): Background {
    return {type: 'image', src: imageUrl}
}

function createBackgroundGradient(colors: string[], angle: number = 0): Background {
    return {type: 'gradient', colors, angle}
}

function createBackgroundTransparent(): Background {
    return {type: 'transparent'}
}

export {
    addSlide,
    removeSlides,
    moveSlides,
    duplicateSlide,
    createBackgroundColor,
    createBackgroundImage,
    createBackgroundGradient,
    createBackgroundTransparent,
    setBackgroundInPresentation
}