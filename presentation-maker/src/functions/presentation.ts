import { Presentation } from "../types/presentation.js"

function createPresentation(title: string, id: string, slideId: string): Presentation {
    return {
        id,
        title,
        slides: [
            {
                id: slideId,
                background: {
                    type: 'solid',
                    color: '#ffffff'
                },
                slideObjects: []
            }
        ]
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