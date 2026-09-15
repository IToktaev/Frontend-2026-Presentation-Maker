import { describe, it, expect } from 'vitest'
import { generateId } from '../functions/idGeneration.js'
import { 
    createPresentation, 
    loadPresentation, 
    savePresentation, 
    updatePresentationTitle 
} from '../functions/presentation.js'
import { Presentation } from '../types/presentation.js'

function createTestPresentation(): Presentation {
    return {
        id: generateId(),
        title: 'Presentation name',
        slides: []
    }
}

describe('createPresentation', () => {
    it('should create a presentation with default slide', () => {
        const id = generateId()
        const slideId = generateId()

        const presentation: Presentation = createPresentation('My Presentation', id, slideId)
        
        expect(presentation.id).toBe(id)
        expect(presentation.title).toBe('My Presentation')
        expect(presentation.slides.length).toBe(1)
    })
})

describe('updatePresentationTitle', () => {
    it('should change presentation name', () => {
        const presentation: Presentation = createTestPresentation()

        const updatedPresentation = updatePresentationTitle(presentation, 'New presentation name')

        expect(updatedPresentation.title).toBe('New presentation name')
        
        expect(presentation.title).toBe('Presentation name')
    })
})

describe('savePresentation', () => {
    it('should convert presentation to JSON', () => {
        const presentation: Presentation = createTestPresentation()

        const json = savePresentation(presentation)

        expect(json).toBe(JSON.stringify(presentation, null, 2))
    })
})

describe('loadPresentation', () => {
    it('should load presentation from JSON', () => {
        const presentation: Presentation = createTestPresentation()

        const json = JSON.stringify(presentation)
        const loadedPresentation = loadPresentation(json)

        expect(loadedPresentation).toEqual(presentation)
    })
})