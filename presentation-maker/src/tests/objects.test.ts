import { describe, expect, it } from "vitest";
import { generateId } from "../functions/idGeneration";
import { 
    addFigureObject,
    addImageObject,
    addTextObject,
    createCircle,
    createRectangle,
    createTriangle,
    moveObject,
    removeObjects,
    resizeObject,
    setObjectSelection,
    updateObjectColor,
    updateTextFontFamily,
    updateTextFontSize, 
} from '../functions/objects.js'
import { Slide } from "../types/slide.js";
import { FigureObject, TextObject } from "../types/objects.js";

describe('addTextObject', () => {
    it('should add text object to empty list', () => {
        const objectId = generateId()

        const slide: Slide = {
            id: generateId(),
            background: {
                type: 'Solid',
                color: '#ffffff'
            },
            slideObjects: [],
            selectedObjectIds: []
        }

        const updatedSlide = addTextObject(
            slide, 
            'abc', 
            {x: 0, y: 0}, 
            {width: 100, height: 100},
            'Arial', 
            16, 
            '#ff0000', 
            objectId
        )

        expect(updatedSlide.slideObjects.length).toEqual(1)
        expect(updatedSlide.slideObjects[0].type).toEqual('Text')

        expect(slide.slideObjects.length).toEqual(0)
    })

    it('should add text object to not empty list', () => {
        const firstObjectId = generateId()
        const secondObjectId = generateId()

        const slide: Slide = {
            id: generateId(),
            background: {
                type: 'Solid',
                color: '#ffffff'
            },
            slideObjects: [{
                id: firstObjectId,
                type: 'Text',
                text: 'abc123',
                position: {x: 0, y: 0},
                size: {width: 100, height: 100},
                fontFamily: 'Times New Roman',
                fontSize: 16,
                color: '#f0f0f0'
            }],
            selectedObjectIds: []
        }

        const updatedSlide = addTextObject(
            slide, 
            'abc', 
            {x: 0, y: 0}, 
            {width: 100, height: 100},
            'Arial', 
            16, 
            '#ff0000', 
            secondObjectId
        )

        expect(updatedSlide.slideObjects.length).toEqual(2)
        expect(updatedSlide.slideObjects[1].type).toEqual('Text')

        expect(slide.slideObjects.length).toEqual(1)
    })
})

describe('addImageObject', () => {
    it('should add image object to empty list', () => {
        const objectId = generateId()

        const slide: Slide = {
            id: generateId(),
            background: {
                type: 'Solid',
                color: '#ffffff'
            },
            slideObjects: [],
            selectedObjectIds: []
        }

        const updatedSlide = addImageObject(
            slide, 
            'url', 
            {x: 0, y: 0}, 
            {width: 100, height: 100},
            objectId
        )

        expect(updatedSlide.slideObjects.length).toEqual(1)
        expect(updatedSlide.slideObjects[0].type).toEqual('Image')

        expect(slide.slideObjects.length).toEqual(0)
    })

    it('should add image object to not empty list', () => {
        const firstObjectId = generateId()
        const secondObjectId = generateId()

        const slide: Slide = {
            id: generateId(),
            background: {
                type: 'Solid',
                color: '#ffffff'
            },
            slideObjects: [{
                id: firstObjectId,
                type: 'Text',
                text: 'abc123',
                position: {x: 0, y: 0},
                size: {width: 100, height: 100},
                fontFamily: 'Times New Roman',
                fontSize: 16,
                color: '#f0f0f0'
            }],
            selectedObjectIds: []
        }

        const updatedSlide = addImageObject(
            slide, 
            'url', 
            {x: 0, y: 0}, 
            {width: 100, height: 100},
            secondObjectId
        )

        expect(updatedSlide.slideObjects.length).toEqual(2)
        expect(updatedSlide.slideObjects[1].type).toEqual('Image')

        expect(slide.slideObjects.length).toEqual(1)
    })
})

describe('addFigureObject', () => {
    it('should add circle, rectangle and triangle', () => {
        const circleId = generateId()
        const rectangleId = generateId()
        const triangleId = generateId()

        const slide: Slide = {
            id: generateId(),
            background: {
                type: 'Solid',
                color: '#ffffff'
            },
            slideObjects: [],
            selectedObjectIds: []
        }

        const circle = createCircle({x: 0, y: 0}, {width: 100, height: 100}, '#ff0000', circleId)
        const rectangle = createRectangle({x: 0, y: 0}, {width: 100, height: 100}, '#ff0000', rectangleId)
        const triangle = createTriangle(
            {x: 0, y: 0}, 
            {width: 100, height: 100}, 
            '#ff0000', 
            {x: 0, y: 0}, 
            {x: 50, y: 50}, 
            {x: 100, y: 100}, 
            triangleId
        )

        let updatedSlide
        updatedSlide = addFigureObject(slide, circle)
        updatedSlide = addFigureObject(updatedSlide, rectangle)
        updatedSlide = addFigureObject(updatedSlide, triangle)

        expect(updatedSlide.slideObjects.length).toEqual(3)
        expect(updatedSlide.slideObjects[0].type).toEqual('Figure')
        expect(updatedSlide.slideObjects[1].type).toEqual('Figure')
        expect(updatedSlide.slideObjects[2].type).toEqual('Figure')
        expect((updatedSlide.slideObjects[0] as FigureObject).figureType).toEqual('Circle')
        expect((updatedSlide.slideObjects[1] as FigureObject).figureType).toEqual('Rectangle')
        expect((updatedSlide.slideObjects[2] as FigureObject).figureType).toEqual('Triangle')

        expect(slide.slideObjects.length).toEqual(0)
    })
})

describe('removeObjects', () => {
    it('should remove each object (all selected)', () => {
        const firstObjectId = generateId() 
        const secondObjectId = generateId() 
        const thirdObjectId = generateId() 

        const slide: Slide = {
            id: generateId(),
            background: {
                type: 'Solid',
                color: '#ffffff'
            },
            slideObjects: [
                {
                    id: firstObjectId,
                    type: 'Text',
                    text: 'abc123',
                    position: {x: 0, y: 0},
                    size: {width: 100, height: 100},
                    fontFamily: 'Times New Roman',
                    fontSize: 16,
                    color: '#f0f0f0'
                },
                {
                    id: secondObjectId,
                    type: 'Image',
                    src: 'url', 
                    position: {x: 0, y: 0}, 
                    size: {width: 100, height: 100},
                },
                {
                    id: thirdObjectId,
                    type: 'Image',
                    src: 'url', 
                    position: {x: 0, y: 0}, 
                    size: {width: 100, height: 100},
                }
            ],
            selectedObjectIds: [firstObjectId, secondObjectId, thirdObjectId]
        }

        const updatedSlide = removeObjects(slide)

        expect(updatedSlide.slideObjects.length).toBe(0)
        expect(updatedSlide.selectedObjectIds).toEqual([])

        expect(slide.slideObjects.length).toBe(3)
        expect(slide.selectedObjectIds.length).toBe(3)
    })

    it('should remove all selected objects', () => {
        const firstObjectId = generateId() 
        const secondObjectId = generateId() 
        const thirdObjectId = generateId() 

        const slide: Slide = {
            id: generateId(),
            background: {
                type: 'Solid',
                color: '#ffffff'
            },
            slideObjects: [
                {
                    id: firstObjectId,
                    type: 'Text',
                    text: 'abc123',
                    position: {x: 0, y: 0},
                    size: {width: 100, height: 100},
                    fontFamily: 'Times New Roman',
                    fontSize: 16,
                    color: '#f0f0f0'
                },
                {
                    id: secondObjectId,
                    type: 'Image',
                    src: 'url', 
                    position: {x: 0, y: 0}, 
                    size: {width: 100, height: 100},
                },
                {
                    id: thirdObjectId,
                    type: 'Image',
                    src: 'url', 
                    position: {x: 0, y: 0}, 
                    size: {width: 100, height: 100},
                }
            ],
            selectedObjectIds: [firstObjectId, thirdObjectId]
        }

        const updatedSlide = removeObjects(slide)

        expect(updatedSlide.slideObjects.length).toBe(1)
        expect(updatedSlide.selectedObjectIds).toEqual([])

        expect(slide.slideObjects.length).toBe(3)
        expect(slide.selectedObjectIds.length).toBe(2)
    })
})

describe('moveObject', () => {
    it('should move object to new position', () => {
        const objectId = generateId()

        const slide: Slide = {
            id: generateId(),
            background: {
                type: 'Solid',
                color: '#ffffff'
            },
            slideObjects: [
                {
                    id: objectId,
                    type: 'Text',
                    text: 'abc123',
                    position: {x: 0, y: 0},
                    size: {width: 100, height: 100},
                    fontFamily: 'Times New Roman',
                    fontSize: 16,
                    color: '#f0f0f0'
                }
            ],
            selectedObjectIds: [objectId]
        }

        const updatedSlide = moveObject(slide, objectId, {x: 100, y: 100})

        expect(updatedSlide.slideObjects[0].position).toEqual({x: 100, y: 100})

        expect(slide.slideObjects[0].position).toEqual({x: 0, y: 0})
    })
})

describe('resizeObject', () => {
    it('should set new size to object', () => {
        const objectId = generateId()

        const slide: Slide = {
            id: generateId(),
            background: {
                type: 'Solid',
                color: '#ffffff'
            },
            slideObjects: [
                {
                    id: objectId,
                    type: 'Text',
                    text: 'abc123',
                    position: {x: 0, y: 0},
                    size: {width: 100, height: 100},
                    fontFamily: 'Times New Roman',
                    fontSize: 16,
                    color: '#f0f0f0'
                }
            ],
            selectedObjectIds: [objectId]
        }

        const updatedSlide = resizeObject(slide, objectId, {width: 1000, height: 1000})

        expect(updatedSlide.slideObjects[0].size).toEqual({width: 1000, height: 1000})

        expect(slide.slideObjects[0].size).toEqual({width: 100, height: 100})
    })
})

describe('setObjectSelection', () => {
    it('should set object selection', () => {
        const objectId = generateId()

        const slide: Slide = {
            id: generateId(),
            background: {
                type: 'Solid',
                color: '#ffffff'
            },
            slideObjects: [
                {
                    id: objectId,
                    type: 'Text',
                    text: 'abc123',
                    position: {x: 0, y: 0},
                    size: {width: 100, height: 100},
                    fontFamily: 'Times New Roman',
                    fontSize: 16,
                    color: '#f0f0f0'
                }
            ],
            selectedObjectIds: []
        }

        const updatedSlide = setObjectSelection(slide, objectId)

        expect(updatedSlide.selectedObjectIds).toEqual([objectId])

        expect(slide.selectedObjectIds).toEqual([])
    })

    it('should unset object selection', () => {
        const objectId = generateId()

        const slide: Slide = {
            id: generateId(),
            background: {
                type: 'Solid',
                color: '#ffffff'
            },
            slideObjects: [
                {
                    id: objectId,
                    type: 'Text',
                    text: 'abc123',
                    position: {x: 0, y: 0},
                    size: {width: 100, height: 100},
                    fontFamily: 'Times New Roman',
                    fontSize: 16,
                    color: '#f0f0f0'
                }
            ],
            selectedObjectIds: [objectId]
        }

        const updatedSlide = setObjectSelection(slide, objectId)

        expect(updatedSlide.selectedObjectIds).toEqual([])

        expect(slide.selectedObjectIds).toEqual([objectId])
    })
})

describe('updateObjectColor', () => {
    it('should set new color to object', () => {
        const objectId = generateId()

        const slide: Slide = {
            id: generateId(),
            background: {
                type: 'Solid',
                color: '#ffffff'
            },
            slideObjects: [
                {
                    id: objectId,
                    type: 'Text',
                    text: 'abc123',
                    position: {x: 0, y: 0},
                    size: {width: 100, height: 100},
                    fontFamily: 'Times New Roman',
                    fontSize: 16,
                    color: '#f0f0f0'
                }
            ],
            selectedObjectIds: [objectId]
        }

        const updatedSlide = updateObjectColor(slide, objectId, '#ff0000')

        expect((updatedSlide.slideObjects[0] as TextObject).color).toEqual('#ff0000')

        expect((slide.slideObjects[0] as TextObject).color).toEqual('#f0f0f0')
    })

    it('should set new color to Image', () => {
        const objectId = generateId()

        const slide: Slide = {
            id: generateId(),
            background: {
                type: 'Solid',
                color: '#ffffff'
            },
            slideObjects: [
                {
                    id: objectId,
                    type: 'Image',
                    src: 'url',
                    position: {x: 0, y: 0},
                    size: {width: 100, height: 100}
                }
            ],
            selectedObjectIds: [objectId]
        }

        const updatedSlide = updateObjectColor(slide, objectId, '#ff0000')

        expect(updatedSlide).toEqual(slide)
    })
})

describe('updateTextFontFamily', () => {
    it('should set new font family to object', () => {
        const objectId = generateId()

        const slide: Slide = {
            id: generateId(),
            background: {
                type: 'Solid',
                color: '#ffffff'
            },
            slideObjects: [
                {
                    id: objectId,
                    type: 'Text',
                    text: 'abc123',
                    position: {x: 0, y: 0},
                    size: {width: 100, height: 100},
                    fontFamily: 'Times New Roman',
                    fontSize: 16,
                    color: '#f0f0f0'
                }
            ],
            selectedObjectIds: [objectId]
        }

        const updatedSlide = updateTextFontFamily(slide, objectId, 'Arial')

        expect((updatedSlide.slideObjects[0] as TextObject).fontFamily).toEqual('Arial')

        expect((slide.slideObjects[0] as TextObject).fontFamily).toEqual('Times New Roman')
    })

    it('should set new font family to Image', () => {
        const objectId = generateId()

        const slide: Slide = {
            id: generateId(),
            background: {
                type: 'Solid',
                color: '#ffffff'
            },
            slideObjects: [
                {
                    id: objectId,
                    type: 'Image',
                    src: 'url',
                    position: {x: 0, y: 0},
                    size: {width: 100, height: 100}
                }
            ],
            selectedObjectIds: [objectId]
        }

        const updatedSlide = updateTextFontFamily(slide, objectId, 'Arial')

        expect(updatedSlide).toEqual(slide)
    })
})

describe('updateTextFontSize', () => {
    it('should set new font size to object', () => {
        const objectId = generateId()

        const slide: Slide = {
            id: generateId(),
            background: {
                type: 'Solid',
                color: '#ffffff'
            },
            slideObjects: [
                {
                    id: objectId,
                    type: 'Text',
                    text: 'abc123',
                    position: {x: 0, y: 0},
                    size: {width: 100, height: 100},
                    fontFamily: 'Times New Roman',
                    fontSize: 16,
                    color: '#f0f0f0'
                }
            ],
            selectedObjectIds: [objectId]
        }

        const updatedSlide = updateTextFontSize(slide, objectId, 13)

        expect((updatedSlide.slideObjects[0] as TextObject).fontSize).toEqual(13)

        expect((slide.slideObjects[0] as TextObject).fontSize).toEqual(16)
    })

    it('should set new font size to Figure', () => {
        const objectId = generateId()

        const slide: Slide = {
            id: generateId(),
            background: {
                type: 'Solid',
                color: '#ffffff'
            },
            slideObjects: [
                {
                    id: objectId,
                    type: 'Figure',
                    figureType: 'Circle',
                    position: {x: 0, y: 0},
                    size: {width: 100, height: 100},
                    color: '#ff0000'
                }
            ],
            selectedObjectIds: [objectId]
        }

        const updatedSlide = updateTextFontSize(slide, objectId, 13)

        expect(updatedSlide).toEqual(slide)
    })
})