import { describe, it, expect } from 'vitest'
import { generateId, generateIds } from '../model/functions/idGeneration.js'
import { 
    addSlide, 
    moveSlides, 
    removeSlides,
    duplicateSlide,
    createBackgroundColor,
    setBackgroundInPresentation,
    createBackgroundImage,
    createBackgroundGradient,
    createBackgroundTransparent
} from '../model/functions/slide.js'
import type { Presentation } from '../model/types/presentation.js'
import type { Slide } from '../model/types/slide.js'

function createTestPresentation(slideIds: string[]): Presentation {
    return {
        id: generateId(),
        title: 'Presentation name',
        slides: slideIds.map(id => createTestSlide(id))
    }
}

function createTestSlide(slideId: string): Slide {
    return {
        id: slideId,
        background: {type: 'transparent'},
        slideObjects: []
    }
}

describe('addSlide', () => {
    it('should add slide to empty slidelist', () => {
        const presentation: Presentation = createTestPresentation([])
        const slideId = generateId()

        const presentationWithNewSlide = addSlide(presentation, {newSlideId: slideId})

        expect(presentationWithNewSlide.slides.length).toBe(1)

        expect(presentation.slides.length).toBe(0)
    }) 

    it('should add slide to not empty slidelist', () => {
        const [slideId, defaultSlideId] = generateIds(2);
        const presentation: Presentation = createTestPresentation([defaultSlideId])

        const presentationWithNewSlide = addSlide(
            presentation, {currentSlideId: defaultSlideId, newSlideId: slideId}
        )

        expect(presentationWithNewSlide.slides.length).toBe(2)

        expect(presentation.slides.length).toBe(1)
    }) 
})

describe('removeSlides', () => {
    it('should remove each slide', () => {
        const ids = generateIds(3);
        const presentation: Presentation = createTestPresentation(
            ids
        )

        const presentationWithSecondSlide = removeSlides(
            presentation, ids
        )

        expect(presentationWithSecondSlide.slides.length).toBe(0)

        expect(presentation.slides.length).toBe(3)
    }) 

    it('should remove part of slides', () => {
        const [firstSlideId, secondSlideId, thirdSlideId] = generateIds(3);
        const presentation: Presentation = createTestPresentation(
            [firstSlideId, secondSlideId, thirdSlideId]
        )

        const presentationWithSecondSlide = removeSlides(presentation, [firstSlideId, thirdSlideId])

        expect(presentationWithSecondSlide.slides.length).toBe(1)

        expect(presentation.slides.length).toBe(3)
    }) 
})

describe('moveSlides', () => {
    it('should move one slide to start of the list', () => {
        const [firstSlideId, secondSlideId, thirdSlideId] = generateIds(3);
        const presentation: Presentation = createTestPresentation(
            [firstSlideId, secondSlideId, thirdSlideId]
        )

        const updatedPresentation = moveSlides(presentation, [secondSlideId, firstSlideId, thirdSlideId])

        expect(updatedPresentation.slides.map(slide => slide.id)).toEqual([
            secondSlideId,
            firstSlideId,
            thirdSlideId
        ])

        expect(presentation.slides.map(slide => slide.id)).toEqual([
            firstSlideId,
            secondSlideId,
            thirdSlideId
        ])
    })

    it('should move two slides to start of the list', () => {
        const [firstSlideId, secondSlideId, thirdSlideId] = generateIds(3);
        const presentation: Presentation = createTestPresentation(
            [firstSlideId, secondSlideId, thirdSlideId]
        )

        const updatedPresentation = moveSlides(presentation, [secondSlideId, thirdSlideId, firstSlideId])

        expect(updatedPresentation.slides.map(slide => slide.id)).toEqual([
            secondSlideId,
            thirdSlideId,
            firstSlideId
        ])

        expect(presentation.slides.map(slide => slide.id)).toEqual([
            firstSlideId,
            secondSlideId,
            thirdSlideId
        ])
    })

    it('should move one slide to middle of the list', () => {
        const [firstSlideId, secondSlideId, thirdSlideId] = generateIds(3);
        const presentation: Presentation = createTestPresentation(
            [firstSlideId, secondSlideId, thirdSlideId]
        )

        const updatedPresentation = moveSlides(presentation, [secondSlideId, firstSlideId, thirdSlideId])
        
        expect(updatedPresentation.slides.map(slide => slide.id)).toEqual([
            secondSlideId,
            firstSlideId,
            thirdSlideId
        ])

        expect(presentation.slides.map(slide => slide.id)).toEqual([
            firstSlideId,
            secondSlideId,
            thirdSlideId
        ])
    })

    it('should move two slides to middle of the list', () => {
        const [firstSlideId, secondSlideId, thirdSlideId, fourthSlideId] = generateIds(4);
        const presentation: Presentation = createTestPresentation(
            [firstSlideId, secondSlideId, thirdSlideId, fourthSlideId]
        )

        const updatedPresentation = moveSlides(
            presentation, [secondSlideId, firstSlideId, fourthSlideId, thirdSlideId]
        )
        
        expect(updatedPresentation.slides.map(slide => slide.id)).toEqual([
            secondSlideId,
            firstSlideId,
            fourthSlideId,
            thirdSlideId
        ])

        expect(presentation.slides.map(slide => slide.id)).toEqual([
            firstSlideId,
            secondSlideId,
            thirdSlideId,
            fourthSlideId
        ])
    })

    it('should move slide to end of the list', () => {
        const [firstSlideId, secondSlideId, thirdSlideId] = generateIds(3)
        const presentation: Presentation = createTestPresentation(
            [firstSlideId, secondSlideId, thirdSlideId]
        )

        const updatedPresentation = moveSlides(presentation, [secondSlideId, thirdSlideId, firstSlideId])

        expect(updatedPresentation.slides.map(slide => slide.id)).toEqual([
            secondSlideId,
            thirdSlideId,
            firstSlideId
        ])

        expect(presentation.slides.map(slide => slide.id)).toEqual([
            firstSlideId,
            secondSlideId,
            thirdSlideId
        ])
    })

    it('should move two slides to end of the list', () => {
        const [firstSlideId, secondSlideId, thirdSlideId] = generateIds(3);
        const presentation: Presentation = createTestPresentation(
            [firstSlideId, secondSlideId, thirdSlideId]
        )

        const updatedPresentation = moveSlides(presentation, [thirdSlideId, firstSlideId, secondSlideId])

        expect(updatedPresentation.slides.map(slide => slide.id)).toEqual([
            thirdSlideId,
            firstSlideId,
            secondSlideId
        ])

        expect(presentation.slides.map(slide => slide.id)).toEqual([
            firstSlideId,
            secondSlideId,
            thirdSlideId
        ])
    })

    it('should move slide to it current place', () => {
        const ids = generateIds(3)
        const presentation: Presentation = createTestPresentation(ids)

        const updatedPresentation = moveSlides(presentation, ids)

        expect(updatedPresentation.slides.map(slide => slide.id)).toEqual(ids)

        expect(presentation.slides.map(slide => slide.id)).toEqual(ids)
    })

    it('should move unexisting slide', () => {
        const [firstSlideId, secondSlideId, thirdSlideId] = generateIds(3)
        const presentation: Presentation = createTestPresentation([firstSlideId, secondSlideId])

        const updatedPresentation = moveSlides(presentation, [firstSlideId, secondSlideId, thirdSlideId])

        expect(updatedPresentation.slides.map(slide => slide.id)).toEqual([
            firstSlideId,
            secondSlideId
        ])

        expect(presentation.slides.map(slide => slide.id)).toEqual([
            firstSlideId,
            secondSlideId
        ])
    })
})

describe('duplicateSlide', () => {
    it('should copy first slide with another id', () => {
        const [firstSlideId, newSlideId] = generateIds(2)
        const presentation: Presentation = createTestPresentation([firstSlideId])
        const currentSlide = presentation.slides.find(slide => slide.id === firstSlideId)

        if (!currentSlide) {
            return
        }

        const newObjectIds = currentSlide.slideObjects.map(() => generateId())

        const updatedPresentation = duplicateSlide(presentation, {
            currentId: firstSlideId,
            newId: newSlideId,
            objectIds: newObjectIds,
        })

        expect(updatedPresentation.slides.map(slide => slide.id)).toEqual([
            firstSlideId,
            newSlideId
        ])
        expect(updatedPresentation.slides[1].slideObjects.map(object => object.id)).toEqual(newObjectIds)

        expect(presentation.slides.map(slide => slide.id)).toEqual([
            firstSlideId
        ])
    })

    it('should copy unexisting slide', () => {
        const unexistingSlideId = generateId()
        const presentation: Presentation = createTestPresentation([])
        const newObjectIds: string[] = []
        const newSlideId = generateId()

        const updatedPresentation = duplicateSlide(presentation, {
            currentId: unexistingSlideId,
            newId: newSlideId,
            objectIds: newObjectIds
})

        expect(updatedPresentation.slides.map(slide => slide.id)).toEqual([])

        expect(presentation.slides.map(slide => slide.id)).toEqual([])
    })
}) 

describe('setSlideBackgroundColor', () => {
    it('should set slide background color to unsolid background', () => {
        const slideId = generateId()
        const presentation: Presentation = createTestPresentation([slideId])

        const background = createBackgroundColor('#ffffff')
        const updatedPresentation = setBackgroundInPresentation(presentation, {
            background: background,
            slideId: slideId
        })

        expect(updatedPresentation.slides[0].background).toEqual({
            type: 'solid',
            color: '#ffffff'
        })

        expect(presentation.slides[0].background).toEqual({
            type: 'transparent'
        })
    })

    it('should set slide background color to solid background', () => {
        const slideId = generateId()
        const presentation: Presentation = createTestPresentation([slideId])
        presentation.slides[0].background = {type: 'solid', color: '#000000'}

        const background = createBackgroundColor('#ffffff')
        const updatedPresentation = setBackgroundInPresentation(presentation, {
            background: background,
            slideId: slideId
        })

        expect(updatedPresentation.slides[0].background).toEqual({
            type: 'solid',
            color: '#ffffff'
        })

        expect(presentation.slides[0].background).toEqual({
            type: 'solid', 
            color: '#000000'
        })
    })
})

describe('setSlideBackgroundImage', () => {
    it('should set slide background image', () => {
        const slideId = generateId()
        const presentation: Presentation = createTestPresentation([slideId])

        const background = createBackgroundImage('url')
        const updatedPresentation = setBackgroundInPresentation(presentation, {
            background: background,
            slideId: slideId
        })

        expect(updatedPresentation.slides[0].background).toEqual({
            type: 'image',
            src: 'url'
        })

        expect(presentation.slides[0].background).toEqual({
            type: 'transparent'
        })
    })

    it('should set slide background image except another image', () => {
        const slideId = generateId()
        const presentation: Presentation = createTestPresentation([slideId])
        presentation.slides[0].background = {type: 'image', src: 'url1'}

        const background = createBackgroundImage('url2')
        const updatedPresentation = setBackgroundInPresentation(presentation, {
            background: background,
            slideId: slideId
        })

        expect(updatedPresentation.slides[0].background).toEqual({
            type: 'image',
            src: 'url2'
        })

        expect(presentation.slides[0].background).toEqual({
            type: 'image', 
            src: 'url1'
        })
    })
})

describe('setSlideBackgroundColor', () => {
    it('should set slide background gradient to ungradient background', () => {
        const slideId = generateId()
        const presentation: Presentation = createTestPresentation([slideId])

        const background = createBackgroundGradient(['#ff0000', '#00ff00'], 90)
        const updatedPresentation = setBackgroundInPresentation(presentation, {
            background: background,
            slideId: slideId
        })

        expect(updatedPresentation.slides[0].background).toEqual({
            type: 'gradient',
            colors: ['#ff0000', '#00ff00'],
            angle: 90
        })

        expect(presentation.slides[0].background).toEqual({
            type: 'transparent'
        })
    })

    it('should set slide background gradient to gradient background', () => {
        const slideId = generateId()
        const presentation: Presentation = createTestPresentation([slideId])
        presentation.slides[0].background = {
            type: 'gradient', colors: ['#ffffff', '#000000'], angle: 45
        }

        const background = createBackgroundGradient(['#ff0000', '#00ff00'], 90)
        const updatedPresentation = setBackgroundInPresentation(presentation, {
            background: background,
            slideId: slideId
        })

        expect(updatedPresentation.slides[0].background).toEqual({
            type: 'gradient', 
            colors: ['#ff0000', '#00ff00'],
            angle: 90
        })

        expect(presentation.slides[0].background).toEqual({
            type: 'gradient', 
            colors: ['#ffffff', '#000000'],
            angle: 45
        })
    })
})

describe('setSlideTransparentBackground', () => {
    it('should set slide background to transparent', () => {
        const slideId = generateId()
        const presentation: Presentation = createTestPresentation([slideId])

        const background = createBackgroundTransparent()
        const updatedPresentation = setBackgroundInPresentation(presentation, {
            background: background,
            slideId: slideId
        })

        expect(updatedPresentation.slides[0].background).toEqual({
            type: 'transparent'
        })

        expect(presentation.slides[0].background).toEqual({
            type: 'transparent'
        })   
    })
})