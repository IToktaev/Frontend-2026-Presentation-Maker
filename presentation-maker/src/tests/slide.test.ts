import { describe, it, expect } from 'vitest'
import { generateId } from '../functions/idGeneration.js'
import { 
    addSlide, 
    moveSlides, 
    removeSlides,
    duplicateSlide, 
    setSlideBackgroundColor, 
    setSlideBackgroundImage, 
    setSlideBackgroundTransparent, 
    setSlideBackgroundGradient 
} from '../functions/slide.js'
import { Presentation } from '../types/presentation.js'
import { Slide } from '../types/slide.js'

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

        const presentationWithNewSlide = addSlide(presentation, slideId)

        expect(presentationWithNewSlide.slides.length).toBe(1)

        expect(presentation.slides.length).toBe(0)
    }) 

    it('should add slide to not empty slidelist', () => {
        const [slideId, firstSlideId] = [generateId(), generateId()]
        const presentation: Presentation = createTestPresentation([firstSlideId])

        const presentationWithNewSlide = addSlide(presentation, slideId)

        expect(presentationWithNewSlide.slides.length).toBe(2)

        expect(presentation.slides.length).toBe(1)
    }) 
})

describe('removeSlides', () => {
    it('should remove each slide', () => {
        const [firstSlideId, secondSlideId, thirdSlideId] = [generateId(), generateId(), generateId()]
        const presentation: Presentation = createTestPresentation(
            [firstSlideId, secondSlideId, thirdSlideId]
        )

        const presentationWithSecondSlide = removeSlides(
            presentation, [firstSlideId, secondSlideId, thirdSlideId]
        )

        expect(presentationWithSecondSlide.slides.length).toBe(0)

        expect(presentation.slides.length).toBe(3)
    }) 

    it('should remove part of slides', () => {
        const [firstSlideId, secondSlideId, thirdSlideId] = [generateId(), generateId(), generateId()]
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
        const [firstSlideId, secondSlideId, thirdSlideId] = [generateId(), generateId(), generateId()]
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
        const [firstSlideId, secondSlideId, thirdSlideId] = [generateId(), generateId(), generateId()]
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
        const [firstSlideId, secondSlideId, thirdSlideId] = [generateId(), generateId(), generateId()]
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
        const [firstSlideId, secondSlideId, thirdSlideId, fourthSlideId] = [
            generateId(), generateId(), generateId(), generateId()
        ]
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
        const [firstSlideId, secondSlideId, thirdSlideId] = [generateId(), generateId(), generateId()]
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
        const [firstSlideId, secondSlideId, thirdSlideId] = [generateId(), generateId(), generateId()]
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
        const [firstSlideId, secondSlideId, thirdSlideId] = [generateId(), generateId(), generateId()]
        const presentation: Presentation = createTestPresentation(
            [firstSlideId, secondSlideId, thirdSlideId]
        )

        const updatedPresentation = moveSlides(presentation, [firstSlideId, secondSlideId, thirdSlideId])

        expect(updatedPresentation.slides.map(slide => slide.id)).toEqual([
            firstSlideId,
            secondSlideId,
            thirdSlideId
        ])

        expect(presentation.slides.map(slide => slide.id)).toEqual([
            firstSlideId,
            secondSlideId,
            thirdSlideId
        ])
    })

    it('should move unexisting slide', () => {
        const [firstSlideId, secondSlideId, thirdSlideId] = [generateId(), generateId(), generateId()]
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
        const [firstSlideId, newSlideId] = [generateId(), generateId()]
        const presentation: Presentation = createTestPresentation([firstSlideId])
        const currentSlide = presentation.slides.find(slide => slide.id == firstSlideId)

        if (!currentSlide) {
            return
        }

        const newObjectIds = currentSlide.slideObjects.map(() => generateId())
        const newIds = {slideId: newSlideId, objectIds: newObjectIds}

        const updatedPresentation = duplicateSlide(presentation, firstSlideId, newIds)

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
        const newIds = {slideId: unexistingSlideId, objectIds: newObjectIds}

        const updatedPresentation = duplicateSlide(presentation, unexistingSlideId, newIds)

        expect(updatedPresentation.slides.map(slide => slide.id)).toEqual([])

        expect(presentation.slides.map(slide => slide.id)).toEqual([])
    })
}) 

describe('setSlideBackgroundColor', () => {
    it('should set slide background color to unsolid background', () => {
        const slideId = generateId()
        const slide: Slide = createTestSlide(slideId)

        const updatedSlide = setSlideBackgroundColor(slide, '#ffffff')

        expect(updatedSlide.background).toEqual({
            type: 'solid',
            color: '#ffffff'
        })

        expect(slide.background).toEqual({
            type: 'transparent'
        })
    })

    it('should set slide background color to solid background', () => {
        const slideId = generateId()
        const slide: Slide = createTestSlide(slideId)
        slide.background = {type: 'solid', color: '#000000'}

        const updatedSlide = setSlideBackgroundColor(slide, '#ffffff')

        expect(updatedSlide.background).toEqual({
            type: 'solid',
            color: '#ffffff'
        })

        expect(slide.background).toEqual({
            type: 'solid',
            color: '#000000'
        })
    })
})

describe('setSlideBackgroundImage', () => {
    it('should set slide background image', () => {
        const slideId = generateId()
        const slide: Slide = createTestSlide(slideId)

        const updatedSlide = setSlideBackgroundImage(slide, 'url')

        expect(updatedSlide.background).toEqual({
            type: 'image',
            src: 'url'
        })

        expect(slide.background).toEqual({
            type: 'transparent'
        })
    })

    it('should set slide background image except another image', () => {
        const slideId = generateId()
        const slide: Slide = createTestSlide(slideId)
        slide.background = {type: 'image', src: 'url'}

        const updatedSlide = setSlideBackgroundImage(slide, 'new_url')

        expect(updatedSlide.background).toEqual({
            type: 'image',
            src: 'new_url'
        })

        expect(slide.background).toEqual({
            type: 'image',
            src: 'url'
        })
    })
})

describe('setSlideBackgroundColor', () => {
    it('should set slide background gradient to ungradient background', () => {
        const slideId = generateId()
        const slide: Slide = createTestSlide(slideId)

        const updatedSlide = setSlideBackgroundGradient(slide, ['#ffffff', '#000000'], 0)

        expect(updatedSlide.background).toEqual({
            type: 'gradient',
            colors: ['#ffffff', '#000000'],
            angle: 0
        })

        expect(slide.background).toEqual({
            type: 'transparent'
        })
    })

    it('should set slide background gradient to gradient background', () => {
        const slideId = generateId()
        const slide: Slide = createTestSlide(slideId)
        slide.background = {type: 'gradient', colors: ['#ffffff', '#000000'], angle: 0}

        const updatedSlide = setSlideBackgroundGradient(slide, ['#ff0000', '#00ff00'], 90)

        expect(updatedSlide.background).toEqual({
            type: 'gradient',
            colors: ['#ff0000', '#00ff00'],
            angle: 90
        })

        expect(slide.background).toEqual({
            type: 'gradient',
            colors: ['#ffffff', '#000000'],
            angle: 0
        })
    })
})

describe('setSlideTransparentBackground', () => {
    it('should set slide transparent', () => {
        const slideId = generateId()
        const slide: Slide = createTestSlide(slideId)
        slide.background = {type: 'solid', color: '#ffffff'}

        const updatedSlide = setSlideBackgroundTransparent(slide)

        expect(updatedSlide.background).toEqual({
            type: 'transparent'
        })

        expect(slide.background).toEqual({
            type: 'solid',
            color: '#ffffff'
        })
    })
})