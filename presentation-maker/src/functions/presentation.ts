import { Presentation } from "../types/presentation.js"

function createPresentation(title: string, id: string, slideId: string): Presentation {
    return {
        id,
        title,
        slides: [
            {
                id: slideId,
                background: {
                    type: 'Solid',
                    color: '#ffffff'
                },
                slideObjects: [],
                selectedObjectIds: []
            }
        ],
        selectedSlideIds: [slideId],
        currentSlideId: slideId
    }
}

function updatePresentationTitle(presentation: Presentation, newTitle: string): Presentation {
    return {
        ...presentation,
        title: newTitle
    }
}

function savePresentation(presentation: Presentation): string {
    return JSON.stringify(presentation, null, 2)
}

function loadPresentation(json: string): Presentation {
    return JSON.parse(json) as Presentation
}

export {
    createPresentation,
    updatePresentationTitle,
    savePresentation,
    loadPresentation
}