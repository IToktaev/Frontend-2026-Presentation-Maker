import { describe, it, expect } from 'vitest'
import { generateId, generateNewObjectIds } from '../functions/idGeneration.js'
import { addSlide, moveSlides, removeSlides, setSlideSelection, setCurrentSlide, duplicateSlide, setSlideBackgroundColor, setSlideBackgroundImage, setSlideBackgroundTransparent, setSlideBackgroundGradient } from '../functions/slide.js'
import { Presentation } from '../types/presentation.js'
import { Slide } from '../types/slide.js'

describe('addSlide', () => {
    it('should add slide to empty slidelist, set new currentSlideId and new selected slide id', () => {
        const presentation: Presentation = {
            id: generateId(),
            title: 'Presentation name',
            slides: [],
            currentSlideId: '',
            selectedSlideIds: []
        }

        const slideId = generateId()
        const presentationWithNewSlide = addSlide(presentation, slideId)

        expect(presentationWithNewSlide.slides.length).toBe(1)
        expect(presentationWithNewSlide.currentSlideId).toBe(slideId)
        expect(presentationWithNewSlide.selectedSlideIds).toEqual([slideId])

        expect(presentation.slides.length).toBe(0)
        expect(presentation.currentSlideId).toBe('')
        expect(presentation.selectedSlideIds).toEqual([])
    }) 

    it('should add slide to not empty slidelist, set new currentSlideId and new selected slide id', () => {
        const firstSlideId = generateId()

        const presentation: Presentation = {
            id: firstSlideId,
            title: 'Presentation name',
            slides: [
                {
                    id: firstSlideId,
                    background: {
                        type: 'Solid',
                        color: '#ff0000'
                    },
                    slideObjects: [],
                    selectedObjectIds: []
                },
            ],
            currentSlideId: firstSlideId,
            selectedSlideIds: [firstSlideId]
        }

        const slideId = generateId()
        const presentationWithNewSlide = addSlide(presentation, slideId)

        expect(presentationWithNewSlide.slides.length).toBe(2)
        expect(presentationWithNewSlide.currentSlideId).toBe(slideId)
        expect(presentationWithNewSlide.selectedSlideIds).toEqual([firstSlideId, slideId])

        expect(presentation.slides.length).toBe(1)
        expect(presentation.currentSlideId).toBe(firstSlideId)
        expect(presentation.selectedSlideIds).toEqual([firstSlideId])
    }) 
})

describe('removeSlides', () => {
    it('should remove each slide (all selected)', () => {
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
                        type: 'Solid',
                        color: '#ff0000'
                    },
                    slideObjects: [],
                    selectedObjectIds: []
                },
                {
                    id: secondSlideId,
                    background: {
                        type: 'Solid',
                        color: '#00ff00'
                    },
                    slideObjects: [],
                    selectedObjectIds: []
                },
                {
                    id: thirdSlideId,
                    background: {
                        type: 'Solid',
                        color: '#0000ff'
                    },
                    slideObjects: [],
                    selectedObjectIds: []
                },
            ],
            currentSlideId: thirdSlideId,
            selectedSlideIds: [firstSlideId, secondSlideId, thirdSlideId]
        }

        const presentationWithSecondSlide = removeSlides(presentation, presentation.selectedSlideIds)

        expect(presentationWithSecondSlide.slides.length).toBe(0)
        expect(presentationWithSecondSlide.currentSlideId).toBe('')
        expect(presentationWithSecondSlide.selectedSlideIds).toEqual([])

        expect(presentation.slides.length).toBe(3)
        expect(presentation.currentSlideId).toBe(thirdSlideId)
        expect(presentation.selectedSlideIds).toEqual([firstSlideId, secondSlideId, thirdSlideId])
    }) 

    it('should remove all selectedSlides', () => {
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
                        type: 'Solid',
                        color: '#ff0000'
                    },
                    slideObjects: [],
                    selectedObjectIds: []
                },
                {
                    id: secondSlideId,
                    background: {
                        type: 'Solid',
                        color: '#00ff00'
                    },
                    slideObjects: [],
                    selectedObjectIds: []
                },
                {
                    id: thirdSlideId,
                    background: {
                        type: 'Solid',
                        color: '#0000ff'
                    },
                    slideObjects: [],
                    selectedObjectIds: []
                },
            ],
            currentSlideId: thirdSlideId,
            selectedSlideIds: [firstSlideId, thirdSlideId]
        }

        const presentationWithSecondSlide = removeSlides(presentation, presentation.selectedSlideIds)

        expect(presentationWithSecondSlide.slides.length).toBe(1)
        expect(presentationWithSecondSlide.currentSlideId).toBe(secondSlideId)
        expect(presentationWithSecondSlide.selectedSlideIds).toEqual([])

        expect(presentation.slides.length).toBe(3)
        expect(presentation.currentSlideId).toBe(thirdSlideId)
        expect(presentation.selectedSlideIds).toEqual([firstSlideId, thirdSlideId])
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
                        type: 'Solid',
                        color: '#ff0000'
                    },
                    slideObjects: [],
                    selectedObjectIds: []
                },
                {
                    id: secondSlideId,
                    background: {
                        type: 'Solid',
                        color: '#00ff00'
                    },
                    slideObjects: [],
                    selectedObjectIds: []
                },
                {
                    id: thirdSlideId,
                    background: {
                        type: 'Solid',
                        color: '#0000ff'
                    },
                    slideObjects: [],
                    selectedObjectIds: []
                }
            ],
            currentSlideId: secondSlideId,
            selectedSlideIds: [secondSlideId]
        }

        const updatedPresentation = moveSlides(presentation, [secondSlideId], 0)

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
                        type: 'Solid',
                        color: '#ff0000'
                    },
                    slideObjects: [],
                    selectedObjectIds: []
                },
                {
                    id: secondSlideId,
                    background: {
                        type: 'Solid',
                        color: '#00ff00'
                    },
                    slideObjects: [],
                    selectedObjectIds: []
                },
                {
                    id: thirdSlideId,
                    background: {
                        type: 'Solid',
                        color: '#0000ff'
                    },
                    slideObjects: [],
                    selectedObjectIds: []
                }
            ],
            currentSlideId: secondSlideId,
            selectedSlideIds: [secondSlideId]
        }

        const updatedPresentation = moveSlides(presentation, [secondSlideId, thirdSlideId], 0)

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
                        type: 'Solid',
                        color: '#ff0000'
                    },
                    slideObjects: [],
                    selectedObjectIds: []
                },
                {
                    id: secondSlideId,
                    background: {
                        type: 'Solid',
                        color: '#00ff00'
                    },
                    slideObjects: [],
                    selectedObjectIds: []
                },
                {
                    id: thirdSlideId,
                    background: {
                        type: 'Solid',
                        color: '#0000ff'
                    },
                    slideObjects: [],
                    selectedObjectIds: []
                }
            ],
            currentSlideId: firstSlideId,
            selectedSlideIds: [firstSlideId]
        }

        const updatedPresentation = moveSlides(presentation, [firstSlideId], 1)
        
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
                        type: 'Solid',
                        color: '#ff0000'
                    },
                    slideObjects: [],
                    selectedObjectIds: []
                },
                {
                    id: secondSlideId,
                    background: {
                        type: 'Solid',
                        color: '#00ff00'
                    },
                    slideObjects: [],
                    selectedObjectIds: []
                },
                {
                    id: thirdSlideId,
                    background: {
                        type: 'Solid',
                        color: '#0000ff'
                    },
                    slideObjects: [],
                    selectedObjectIds: []
                },
                {
                    id: fourthSlideId,
                    background: {
                        type: 'Solid',
                        color: '#f0f0f0'
                    },
                    slideObjects: [],
                    selectedObjectIds: []
                }
            ],
            currentSlideId: firstSlideId,
            selectedSlideIds: [firstSlideId]
        }

        const updatedPresentation = moveSlides(presentation, [firstSlideId, fourthSlideId], 1)
        
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
                        type: 'Solid',
                        color: '#ff0000'
                    },
                    slideObjects: [],
                    selectedObjectIds: []
                },
                {
                    id: secondSlideId,
                    background: {
                        type: 'Solid',
                        color: '#00ff00'
                    },
                    slideObjects: [],
                    selectedObjectIds: []
                },
                {
                    id: thirdSlideId,
                    background: {
                        type: 'Solid',
                        color: '#0000ff'
                    },
                    slideObjects: [],
                    selectedObjectIds: []
                }
            ],
            currentSlideId: secondSlideId,
            selectedSlideIds: [secondSlideId]
        }

        const updatedPresentation = moveSlides(presentation, [firstSlideId], 2)

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
                        type: 'Solid',
                        color: '#ff0000'
                    },
                    slideObjects: [],
                    selectedObjectIds: []
                },
                {
                    id: secondSlideId,
                    background: {
                        type: 'Solid',
                        color: '#00ff00'
                    },
                    slideObjects: [],
                    selectedObjectIds: []
                },
                {
                    id: thirdSlideId,
                    background: {
                        type: 'Solid',
                        color: '#0000ff'
                    },
                    slideObjects: [],
                    selectedObjectIds: []
                }
            ],
            currentSlideId: secondSlideId,
            selectedSlideIds: [secondSlideId]
        }

        const updatedPresentation = moveSlides(presentation, [firstSlideId, secondSlideId], 1)

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
                        type: 'Solid',
                        color: '#ff0000'
                    },
                    slideObjects: [],
                    selectedObjectIds: []
                },
                {
                    id: secondSlideId,
                    background: {
                        type: 'Solid',
                        color: '#00ff00'
                    },
                    slideObjects: [],
                    selectedObjectIds: []
                },
                {
                    id: thirdSlideId,
                    background: {
                        type: 'Solid',
                        color: '#0000ff'
                    },
                    slideObjects: [],
                    selectedObjectIds: []
                }
            ],
            currentSlideId: secondSlideId,
            selectedSlideIds: [secondSlideId]
        }

        const updatedPresentation = moveSlides(presentation, [firstSlideId], 0)

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
                        type: 'Solid',
                        color: '#ff0000'
                    },
                    slideObjects: [],
                    selectedObjectIds: []
                },
                {
                    id: secondSlideId,
                    background: {
                        type: 'Solid',
                        color: '#00ff00'
                    },
                    slideObjects: [],
                    selectedObjectIds: []
                }
            ],
            currentSlideId: secondSlideId,
            selectedSlideIds: [secondSlideId]
        }

        const updatedPresentation = moveSlides(presentation, [thirdSlideId], 0)

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

describe('set current slide', () => {
    it('should change current slide', () => {
        const firstSlideId = generateId()
        const secondSlideId = generateId()

        const presentation: Presentation = {
            id: generateId(),
            title: 'Presentation name',
            slides: [
                {
                    id: firstSlideId,
                    background: {
                        type: 'Solid',
                        color: '#ff0000'
                    },
                    slideObjects: [],
                    selectedObjectIds: []
                },
                {
                    id: secondSlideId,
                    background: {
                        type: 'Solid',
                        color: '#00ff00'
                    },
                    slideObjects: [],
                    selectedObjectIds: []
                }
            ],
            currentSlideId: firstSlideId,
            selectedSlideIds: [firstSlideId]
        }

        const updatedPresentation = setCurrentSlide(presentation, secondSlideId)

        expect(updatedPresentation.currentSlideId).toBe(secondSlideId)
        
        expect(presentation.currentSlideId).toBe(firstSlideId)
    })

    it('should set current slide again', () => {
        const firstSlideId = generateId()
        const secondSlideId = generateId()

        const presentation: Presentation = {
            id: generateId(),
            title: 'Presentation name',
            slides: [
                {
                    id: firstSlideId,
                    background: {
                        type: 'Solid',
                        color: '#ff0000'
                    },
                    slideObjects: [],
                    selectedObjectIds: []
                },
                {
                    id: secondSlideId,
                    background: {
                        type: 'Solid',
                        color: '#00ff00'
                    },
                    slideObjects: [],
                    selectedObjectIds: []
                }
            ],
            currentSlideId: firstSlideId,
            selectedSlideIds: [firstSlideId]
        }

        const updatedPresentation = setCurrentSlide(presentation, firstSlideId)

        expect(updatedPresentation.currentSlideId).toBe(firstSlideId)
        
        expect(presentation.currentSlideId).toBe(firstSlideId)
    })
})

describe('setSlideSelection', () => {
    it('should select new slide with shift', () => {
        const firstSlideId = generateId()
        const secondSlideId = generateId()

        const presentation: Presentation = {
            id: generateId(),
            title: 'Presentation name',
            slides: [
                {
                    id: firstSlideId,
                    background: {
                        type: 'Solid',
                        color: '#ff0000'
                    },
                    slideObjects: [],
                    selectedObjectIds: []
                },
                {
                    id: secondSlideId,
                    background: {
                        type: 'Solid',
                        color: '#00ff00'
                    },
                    slideObjects: [],
                    selectedObjectIds: []
                }
            ],
            currentSlideId: firstSlideId,
            selectedSlideIds: [firstSlideId]
        }

        const updatedPresentation = setSlideSelection(presentation, secondSlideId, false)

        expect(updatedPresentation.selectedSlideIds).toEqual([firstSlideId, secondSlideId])
        
        expect(presentation.selectedSlideIds).toEqual([firstSlideId])
    })

    it('should change slide selection width shift', () => {
        const firstSlideId = generateId()
        const secondSlideId = generateId()

        const presentation: Presentation = {
            id: generateId(),
            title: 'Presentation name',
            slides: [
                {
                    id: firstSlideId,
                    background: {
                        type: 'Solid',
                        color: '#ff0000'
                    },
                    slideObjects: [],
                    selectedObjectIds: []
                },
                {
                    id: secondSlideId,
                    background: {
                        type: 'Solid',
                        color: '#00ff00'
                    },
                    slideObjects: [],
                    selectedObjectIds: []
                }
            ],
            currentSlideId: firstSlideId,
            selectedSlideIds: [firstSlideId, secondSlideId]
        }

        const updatedPresentation = setSlideSelection(presentation, secondSlideId, false)

        expect(updatedPresentation.selectedSlideIds).toEqual([firstSlideId])
        
        expect(presentation.selectedSlideIds).toEqual([firstSlideId, secondSlideId])
    })

    it('should try to change current slide selection with shift', () => {
        const firstSlideId = generateId()
        const secondSlideId = generateId()

        const presentation: Presentation = {
            id: generateId(),
            title: 'Presentation name',
            slides: [
                {
                    id: firstSlideId,
                    background: {
                        type: 'Solid',
                        color: '#ff0000'
                    },
                    slideObjects: [],
                    selectedObjectIds: []
                },
                {
                    id: secondSlideId,
                    background: {
                        type: 'Solid',
                        color: '#00ff00'
                    },
                    slideObjects: [],
                    selectedObjectIds: []
                }
            ],
            currentSlideId: firstSlideId,
            selectedSlideIds: [firstSlideId, secondSlideId]
        }

        const updatedPresentation = setSlideSelection(presentation, firstSlideId, false)

        expect(updatedPresentation.selectedSlideIds).toEqual([firstSlideId, secondSlideId])
        
        expect(presentation.selectedSlideIds).toEqual([firstSlideId, secondSlideId])
    })

    it('should change new current slide without shift', () => {
        const firstSlideId = generateId()
        const secondSlideId = generateId()

        const presentation: Presentation = {
            id: generateId(),
            title: 'Presentation name',
            slides: [
                {
                    id: firstSlideId,
                    background: {
                        type: 'Solid',
                        color: '#ff0000'
                    },
                    slideObjects: [],
                    selectedObjectIds: []
                },
                {
                    id: secondSlideId,
                    background: {
                        type: 'Solid',
                        color: '#00ff00'
                    },
                    slideObjects: [],
                    selectedObjectIds: []
                }
            ],
            currentSlideId: firstSlideId,
            selectedSlideIds: [firstSlideId, secondSlideId]
        }

        const updatedPresentation = setSlideSelection(presentation, secondSlideId, true)

        expect(updatedPresentation.selectedSlideIds).toEqual([secondSlideId])
        
        expect(presentation.selectedSlideIds).toEqual([firstSlideId, secondSlideId])
    })
})

describe('duplicateSlide', () => {
    it('should copy slide with another id, change current slide and slide selection', () => {
        const firstSlideId = generateId()
        const slideId = generateId()

        const presentation: Presentation = {
            id: generateId(),
            title: 'Presentation name',
            slides: [
                {
                    id: firstSlideId,
                    background: {
                        type: 'Solid',
                        color: '#ff0000'
                    },
                    slideObjects: [],
                    selectedObjectIds: []
                }
            ],
            currentSlideId: firstSlideId,
            selectedSlideIds: [firstSlideId]
        }

        const currentSlide = presentation.slides.find(slide => slide.id == presentation.currentSlideId)
        const newObjectIds = generateNewObjectIds(currentSlide?.slideObjects)
        const updatedPresentation = duplicateSlide(presentation, slideId, newObjectIds)

        expect(updatedPresentation.slides.map(slide => slide.id)).toEqual([
            firstSlideId,
            slideId
        ])
        expect(updatedPresentation.currentSlideId).toBe(slideId)
        expect(updatedPresentation.selectedSlideIds).toEqual([slideId])

        expect(presentation.slides.map(slide => slide.id)).toEqual([
            firstSlideId
        ])
        expect(presentation.currentSlideId).toBe(firstSlideId)
    })

    it('should copy unexisting slide', () => {
        const slideId = generateId()

        const presentation: Presentation = {
            id: generateId(),
            title: 'Presentation name',
            slides: [],
            currentSlideId: '',
            selectedSlideIds: []
        }

        const currentSlide = presentation.slides.find(slide => slide.id == presentation.currentSlideId)
        const newObjectIds = generateNewObjectIds(currentSlide?.slideObjects)
        const updatedPresentation = duplicateSlide(presentation, slideId, newObjectIds)

        expect(updatedPresentation.slides.map(slide => slide.id)).toEqual([])
        expect(updatedPresentation.currentSlideId).toBe('')
        expect(updatedPresentation.selectedSlideIds).toEqual([])

        expect(presentation.slides.map(slide => slide.id)).toEqual([])
        expect(presentation.currentSlideId).toBe('')
        expect(presentation.selectedSlideIds).toEqual([])
    })
}) 

describe('setSlideBackgroundColor', () => {
    it('should set slide background color to unsolid background', () => {
        const slideId = generateId()

        const slide: Slide = {
            id: slideId,
            background: {
                type: 'Transparent'
            },
            slideObjects: [],
            selectedObjectIds: []
        }

        const updatedSlide = setSlideBackgroundColor(slide, '#ffffff')

        expect(updatedSlide.background).toEqual({
            type: 'Solid',
            color: '#ffffff'
        })

        expect(slide.background).toEqual({
            type: 'Transparent'
        })
    })

    it('should set slide background color to solid background', () => {
        const slideId = generateId()

        const slide: Slide = {
            id: slideId,
            background: {
                type: 'Solid',
                color: '#000000'
            },
            slideObjects: [],
            selectedObjectIds: []
        }

        const updatedSlide = setSlideBackgroundColor(slide, '#ffffff')

        expect(updatedSlide.background).toEqual({
            type: 'Solid',
            color: '#ffffff'
        })

        expect(slide.background).toEqual({
            type: 'Solid',
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
                type: 'Transparent'
            },
            slideObjects: [],
            selectedObjectIds: []
        }

        const updatedSlide = setSlideBackgroundImage(slide, 'url')

        expect(updatedSlide.background).toEqual({
            type: 'Image',
            src: 'url'
        })

        expect(slide.background).toEqual({
            type: 'Transparent'
        })
    })

    it('should set slide background image except another image', () => {
        const slideId = generateId()

        const slide: Slide = {
            id: slideId,
            background: {
                type: 'Image',
                src: 'url'
            },
            slideObjects: [],
            selectedObjectIds: []
        }

        const updatedSlide = setSlideBackgroundImage(slide, 'new_url')

        expect(updatedSlide.background).toEqual({
            type: 'Image',
            src: 'new_url'
        })

        expect(slide.background).toEqual({
            type: 'Image',
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
                type: 'Transparent'
            },
            slideObjects: [],
            selectedObjectIds: []
        }

        const updatedSlide = setSlideBackgroundGradient(slide, ['#ffffff', '#000000'], 0)

        expect(updatedSlide.background).toEqual({
            type: 'Gradient',
            colors: ['#ffffff', '#000000'],
            angle: 0
        })

        expect(slide.background).toEqual({
            type: 'Transparent'
        })
    })

    it('should set slide background gradient to gradient background', () => {
        const slideId = generateId()

        const slide: Slide = {
            id: slideId,
            background: {
                type: 'Gradient',
                colors: ['#ffffff', '#000000'],
                angle: 0
            },
            slideObjects: [],
            selectedObjectIds: []
        }

        const updatedSlide = setSlideBackgroundGradient(slide, ['#ff0000', '#00ff00'], 90)

        expect(updatedSlide.background).toEqual({
            type: 'Gradient',
            colors: ['#ff0000', '#00ff00'],
            angle: 90
        })

        expect(slide.background).toEqual({
            type: 'Gradient',
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
                type: 'Solid',
                color: '#ffffff'
            },
            slideObjects: [],
            selectedObjectIds: []
        }

        const updatedSlide = setSlideBackgroundTransparent(slide)

        expect(updatedSlide.background).toEqual({
            type: 'Transparent'
        })

        expect(slide.background).toEqual({
            type: 'Solid',
            color: '#ffffff'
        })
    })
})