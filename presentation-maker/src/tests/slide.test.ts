import { describe, it, expect } from 'vitest'
import { generateId } from '../functions/idGeneration.js'
import { addSlide, moveSlides, removeSlides, duplicateSlide, setSlideBackgroundColor, setSlideBackgroundImage, setSlideBackgroundTransparent, setSlideBackgroundGradient } from '../functions/slide.js'
import { Presentation } from '../types/presentation.js'
import { Slide } from '../types/slide.js'

describe('addSlide', () => {
    it('should add slide to empty slidelist', () => {
        const presentation: Presentation = {
            id: generateId(),
            title: 'Presentation name',
            slides: []
        }

        const slideId = generateId()
        const presentationWithNewSlide = addSlide(presentation, slideId)

        expect(presentationWithNewSlide.slides.length).toBe(1)

        expect(presentation.slides.length).toBe(0)
    }) 

    it('should add slide to not empty slidelist', () => {
        const firstSlideId = generateId()

        const presentation: Presentation = {
            id: firstSlideId,
            title: 'Presentation name',
            slides: [
                {
                    id: firstSlideId,
                    background: {
                        type: 'solid',
                        color: '#ff0000'
                    },
                    slideObjects: []
                },
            ]
        }

        const slideId = generateId()
        const presentationWithNewSlide = addSlide(presentation, slideId)

        expect(presentationWithNewSlide.slides.length).toBe(2)

        expect(presentation.slides.length).toBe(1)
    }) 
})

describe('removeSlides', () => {
    it('should remove each slide', () => {
        const firstSlideId = generateId()
        const secondSlideId = generateId()
        const thirdSlideId = generateId()

        const presentation: Presentation = {
            id: generateId(),
            title: 'Presentation name',
            slides: [
                {
                    id: firstSlideId,
                    background: {
                        type: 'solid',
                        color: '#ff0000'
                    },
                    slideObjects: []
                },
                {
                    id: secondSlideId,
                    background: {
                        type: 'solid',
                        color: '#00ff00'
                    },
                    slideObjects: []
                },
                {
                    id: thirdSlideId,
                    background: {
                        type: 'solid',
                        color: '#0000ff'
                    },
                    slideObjects: []
                },
            ]
        }

        const presentationWithSecondSlide = removeSlides(
            presentation, [firstSlideId, secondSlideId, thirdSlideId]
        )

        expect(presentationWithSecondSlide.slides.length).toBe(0)

        expect(presentation.slides.length).toBe(3)
    }) 

    it('should remove part of slides', () => {
        const firstSlideId = generateId()
        const secondSlideId = generateId()
        const thirdSlideId = generateId()

        const presentation: Presentation = {
            id: generateId(),
            title: 'Presentation name',
            slides: [
                {
                    id: firstSlideId,
                    background: {
                        type: 'solid',
                        color: '#ff0000'
                    },
                    slideObjects: []
                },
                {
                    id: secondSlideId,
                    background: {
                        type: 'solid',
                        color: '#00ff00'
                    },
                    slideObjects: []
                },
                {
                    id: thirdSlideId,
                    background: {
                        type: 'solid',
                        color: '#0000ff'
                    },
                    slideObjects: []
                },
            ]
        }

        const presentationWithSecondSlide = removeSlides(presentation, [firstSlideId, thirdSlideId])

        expect(presentationWithSecondSlide.slides.length).toBe(1)

        expect(presentation.slides.length).toBe(3)
    }) 
})

describe('moveSlides', () => {
    it('should move one slide to start of the list', () => {
        const firstSlideId = generateId()
        const secondSlideId = generateId()
        const thirdSlideId = generateId()

        const presentation: Presentation = {
            id: generateId(),
            title: 'Presentation name',
            slides: [
                {
                    id: firstSlideId,
                    background: {
                        type: 'solid',
                        color: '#ff0000'
                    },
                    slideObjects: []
                },
                {
                    id: secondSlideId,
                    background: {
                        type: 'solid',
                        color: '#00ff00'
                    },
                    slideObjects: []
                },
                {
                    id: thirdSlideId,
                    background: {
                        type: 'solid',
                        color: '#0000ff'
                    },
                    slideObjects: []
                }
            ]
        }

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
        const firstSlideId = generateId()
        const secondSlideId = generateId()
        const thirdSlideId = generateId()

        const presentation: Presentation = {
            id: generateId(),
            title: 'Presentation name',
            slides: [
                {
                    id: firstSlideId,
                    background: {
                        type: 'solid',
                        color: '#ff0000'
                    },
                    slideObjects: []
                },
                {
                    id: secondSlideId,
                    background: {
                        type: 'solid',
                        color: '#00ff00'
                    },
                    slideObjects: []
                },
                {
                    id: thirdSlideId,
                    background: {
                        type: 'solid',
                        color: '#0000ff'
                    },
                    slideObjects: []
                }
            ]
        }

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
        const firstSlideId = generateId()
        const secondSlideId = generateId()
        const thirdSlideId = generateId()

        const presentation: Presentation = {
            id: generateId(),
            title: 'Presentation name',
            slides: [
                {
                    id: firstSlideId,
                    background: {
                        type: 'solid',
                        color: '#ff0000'
                    },
                    slideObjects: []
                },
                {
                    id: secondSlideId,
                    background: {
                        type: 'solid',
                        color: '#00ff00'
                    },
                    slideObjects: []
                },
                {
                    id: thirdSlideId,
                    background: {
                        type: 'solid',
                        color: '#0000ff'
                    },
                    slideObjects: []
                }
            ]
        }

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
        const firstSlideId = generateId()
        const secondSlideId = generateId()
        const thirdSlideId = generateId()
        const fourthSlideId = generateId()

        const presentation: Presentation = {
            id: generateId(),
            title: 'Presentation name',
            slides: [
                {
                    id: firstSlideId,
                    background: {
                        type: 'solid',
                        color: '#ff0000'
                    },
                    slideObjects: []
                },
                {
                    id: secondSlideId,
                    background: {
                        type: 'solid',
                        color: '#00ff00'
                    },
                    slideObjects: []
                },
                {
                    id: thirdSlideId,
                    background: {
                        type: 'solid',
                        color: '#0000ff'
                    },
                    slideObjects: []
                },
                {
                    id: fourthSlideId,
                    background: {
                        type: 'solid',
                        color: '#f0f0f0'
                    },
                    slideObjects: []
                }
            ]
        }

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
        const firstSlideId = generateId()
        const secondSlideId = generateId()
        const thirdSlideId = generateId()

        const presentation: Presentation = {
            id: generateId(),
            title: 'Presentation name',
            slides: [
                {
                    id: firstSlideId,
                    background: {
                        type: 'solid',
                        color: '#ff0000'
                    },
                    slideObjects: []
                },
                {
                    id: secondSlideId,
                    background: {
                        type: 'solid',
                        color: '#00ff00'
                    },
                    slideObjects: []
                },
                {
                    id: thirdSlideId,
                    background: {
                        type: 'solid',
                        color: '#0000ff'
                    },
                    slideObjects: []
                }
            ]
        }

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
        const firstSlideId = generateId()
        const secondSlideId = generateId()
        const thirdSlideId = generateId()

        const presentation: Presentation = {
            id: generateId(),
            title: 'Presentation name',
            slides: [
                {
                    id: firstSlideId,
                    background: {
                        type: 'solid',
                        color: '#ff0000'
                    },
                    slideObjects: []
                },
                {
                    id: secondSlideId,
                    background: {
                        type: 'solid',
                        color: '#00ff00'
                    },
                    slideObjects: []
                },
                {
                    id: thirdSlideId,
                    background: {
                        type: 'solid',
                        color: '#0000ff'
                    },
                    slideObjects: []
                }
            ]
        }

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
        const firstSlideId = generateId()
        const secondSlideId = generateId()
        const thirdSlideId = generateId()

        const presentation: Presentation = {
            id: generateId(),
            title: 'Presentation name',
            slides: [
                {
                    id: firstSlideId,
                    background: {
                        type: 'solid',
                        color: '#ff0000'
                    },
                    slideObjects: []
                },
                {
                    id: secondSlideId,
                    background: {
                        type: 'solid',
                        color: '#00ff00'
                    },
                    slideObjects: []
                },
                {
                    id: thirdSlideId,
                    background: {
                        type: 'solid',
                        color: '#0000ff'
                    },
                    slideObjects: []
                }
            ]
        }

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
        const firstSlideId = generateId()
        const secondSlideId = generateId()
        const thirdSlideId = generateId()

        const presentation: Presentation = {
            id: generateId(),
            title: 'Presentation name',
            slides: [
                {
                    id: firstSlideId,
                    background: {
                        type: 'solid',
                        color: '#ff0000'
                    },
                    slideObjects: []
                },
                {
                    id: secondSlideId,
                    background: {
                        type: 'solid',
                        color: '#00ff00'
                    },
                    slideObjects: []
                }
            ]
        }

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
        const firstSlideId = generateId()
        const slideId = generateId()

        const presentation: Presentation = {
            id: generateId(),
            title: 'Presentation name',
            slides: [
                {
                    id: firstSlideId,
                    background: {
                        type: 'solid',
                        color: '#ff0000'
                    },
                    slideObjects: []
                }
            ]
        }

        const currentSlide = presentation.slides.find(slide => slide.id == firstSlideId)

        if (!currentSlide) {
            return
        }

        const newObjectIds = currentSlide.slideObjects.map(() => generateId())
        const updatedPresentation = duplicateSlide(presentation, firstSlideId, slideId, newObjectIds)

        expect(updatedPresentation.slides.map(slide => slide.id)).toEqual([
            firstSlideId,
            slideId
        ])

        expect(presentation.slides.map(slide => slide.id)).toEqual([
            firstSlideId
        ])
    })

    it('should copy unexisting slide', () => {
        const unexistingSlideId = generateId()
        const slideId = generateId()

        const presentation: Presentation = {
            id: generateId(),
            title: 'Presentation name',
            slides: []
        }

        const newObjectIds: string[] = []
        const updatedPresentation = duplicateSlide(presentation, unexistingSlideId, slideId, newObjectIds)

        expect(updatedPresentation.slides.map(slide => slide.id)).toEqual([])

        expect(presentation.slides.map(slide => slide.id)).toEqual([])
    })
}) 

describe('setSlideBackgroundColor', () => {
    it('should set slide background color to unsolid background', () => {
        const slideId = generateId()

        const slide: Slide = {
            id: slideId,
            background: {
                type: 'transparent'
            },
            slideObjects: []
        }

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

        const slide: Slide = {
            id: slideId,
            background: {
                type: 'solid',
                color: '#000000'
            },
            slideObjects: []
        }

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

        const slide: Slide = {
            id: slideId,
            background: {
                type: 'transparent'
            },
            slideObjects: []
        }

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

        const slide: Slide = {
            id: slideId,
            background: {
                type: 'image',
                src: 'url'
            },
            slideObjects: []
        }

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

        const slide: Slide = {
            id: slideId,
            background: {
                type: 'transparent'
            },
            slideObjects: []
        }

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

        const slide: Slide = {
            id: slideId,
            background: {
                type: 'gradient',
                colors: ['#ffffff', '#000000'],
                angle: 0
            },
            slideObjects: []
        }

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

        const slide: Slide = {
            id: slideId,
            background: {
                type: 'solid',
                color: '#ffffff'
            },
            slideObjects: []
        }

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