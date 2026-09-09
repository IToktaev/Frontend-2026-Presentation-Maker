import { Presentation } from "../types/presentation.js"
import { Slide } from "../types/slide.js"

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
        .map(id => presentation.slides.find(slide => slide.id == id))
        .filter(slide => slide != undefined)

    if (slideIds.length != slides.length) {
        return presentation
    }

    return {
        ...presentation,
        slides: slides
    }
}

function duplicateSlide(
    presentation: Presentation, 
    slideId: string,
    newSlideId: string,
    newObjectIds: string[]
): Presentation {
    const slides = [...presentation.slides]
    const slideIndex = slides.findIndex(slide => slide.id == slideId)
    const slide = slides[slideIndex]
    
    if (!slide) {
        return presentation
    }

    const newSlide: Slide = {
        id: newSlideId,
        background: slide.background,
        slideObjects: slide.slideObjects.map((object, index) => ({
            ...object,
            id: newObjectIds[index]
        }))
    }
    
    slides.splice(slideIndex + 1, 0, newSlide)

    return {
        ...presentation,
        slides: slides
    }
}

function setSlideBackgroundColor(slide: Slide, color: string): Slide {
    return {
        ...slide,
        background: {
            type: 'solid',
            color: color
        }
    }
}

function setSlideBackgroundImage(slide: Slide, imageUrl: string): Slide {
    return {
        ...slide,
        background: {
            type: 'image',
            src: imageUrl
        }
    }
}

function setSlideBackgroundGradient(slide: Slide, colors: string[], angle: number = 0): Slide {
    return {
        ...slide,
        background: {
            type: 'gradient',
            colors: colors,
            angle: angle,
        }
    }
}

function setSlideBackgroundTransparent(slide: Slide): Slide {
    return {
        ...slide,
        background: {
            type: 'transparent'
        }
    }
}

export {
    addSlide,
    removeSlides,
    moveSlides,
    duplicateSlide,
    setSlideBackgroundColor,
    setSlideBackgroundImage,
    setSlideBackgroundGradient,
    setSlideBackgroundTransparent
}