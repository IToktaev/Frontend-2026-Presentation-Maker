import { describe, expect, it } from "vitest";
import { generateId } from "../functions/idGeneration";
import { 
    addSlideObject,
    createCircle,
    createImage,
    createRectangle,
    createText,
    createTriangle,
    moveObject,
    removeObjects,
    resizeObject,
    updateObjectColor,
    updateTextFontFamily,
    updateTextFontSize, 
} from '../functions/objects.js'
import { Slide } from "../types/slide.js";
import { 
    CircleData, 
    FigureObject, 
    ImageData, 
    RectangleData, 
    TextData, 
    TextObject, 
    TriangleData 
} from "../types/objects.js";

describe('addSlideObject', () => {
    it('should add circle, rectangle and triangle', () => {
        const circleId = generateId()
        const rectangleId = generateId()
        const triangleId = generateId()

        const slide: Slide = {
            id: generateId(),
            background: {
                type: 'solid',
                color: '#ffffff'
            },
            slideObjects: []
        }

        const circleData: CircleData = {
            size: {width: 100, height: 100},
            position:{x: 0, y: 0},
            color: '#ff0000'
        }
        const circle = createCircle(circleData, circleId)

        const rectangleData: RectangleData = {
            size: {width: 100, height: 100},
            position:{x: 0, y: 0},
            color: '#ff0000'
        }
        const rectangle = createRectangle(rectangleData, rectangleId)

        const triangleData: TriangleData = {
            size: {width: 100, height: 100},
            position:{x: 0, y: 0},
            color: '#ff0000',
            point1: {x: 100, y: 100},
            point2: {x: 100, y: 100},
            point3: {x: 100, y: 100},
        }
        const triangle = createTriangle(triangleData, triangleId)

        const textData: TextData = {
            size: {width: 100, height: 100},
            position:{x: 0, y: 0},
            fontFamily: 'Arial',
            fontSize: 16,
            text: 'abcd',
            color: 'red'
        }
        const text = createText(textData, circleId)

        const imageData: ImageData = {
            size: {width: 100, height: 100},
            position:{x: 0, y: 0},
            src: 'url'
        }
        const image = createImage(imageData, circleId)

        let updatedSlide
        updatedSlide = addSlideObject(slide, text)
        updatedSlide = addSlideObject(updatedSlide, image)

        updatedSlide = addSlideObject(updatedSlide, circle)
        updatedSlide = addSlideObject(updatedSlide, rectangle)
        updatedSlide = addSlideObject(updatedSlide, triangle)

        expect(updatedSlide.slideObjects.length).toBe(5)
        expect(updatedSlide.slideObjects[0].type).toBe('text')
        expect(updatedSlide.slideObjects[1].type).toBe('image')
        expect(updatedSlide.slideObjects[2].type).toBe('Figure')
        expect(updatedSlide.slideObjects[3].type).toBe('Figure')
        expect(updatedSlide.slideObjects[4].type).toBe('Figure')

        expect((updatedSlide.slideObjects[2] as FigureObject).figureType).toBe('circle')
        expect((updatedSlide.slideObjects[3] as FigureObject).figureType).toBe('rectangle')
        expect((updatedSlide.slideObjects[4] as FigureObject).figureType).toBe('triangle')

        expect(slide.slideObjects.length).toBe(0)
    })
})

describe('removeObjects', () => {
    it('should remove each object', () => {
        const firstObjectId = generateId() 
        const secondObjectId = generateId() 
        const thirdObjectId = generateId() 

        const slide: Slide = {
            id: generateId(),
            background: {
                type: 'solid',
                color: '#ffffff'
            },
            slideObjects: [
                {
                    id: firstObjectId,
                    type: 'text',
                    text: 'abc123',
                    position: {x: 0, y: 0},
                    size: {width: 100, height: 100},
                    fontFamily: 'Times New Roman',
                    fontSize: 16,
                    color: '#f0f0f0'
                },
                {
                    id: secondObjectId,
                    type: 'image',
                    src: 'url', 
                    position: {x: 0, y: 0}, 
                    size: {width: 100, height: 100},
                },
                {
                    id: thirdObjectId,
                    type: 'image',
                    src: 'url', 
                    position: {x: 0, y: 0}, 
                    size: {width: 100, height: 100},
                }
            ]
        }

        const updatedSlide = removeObjects(slide, [firstObjectId, secondObjectId, thirdObjectId])

        expect(updatedSlide.slideObjects.length).toBe(0)

        expect(slide.slideObjects.length).toBe(3)
    })

    it('should remove part of objects', () => {
        const firstObjectId = generateId() 
        const secondObjectId = generateId() 
        const thirdObjectId = generateId() 

        const slide: Slide = {
            id: generateId(),
            background: {
                type: 'solid',
                color: '#ffffff'
            },
            slideObjects: [
                {
                    id: firstObjectId,
                    type: 'text',
                    text: 'abc123',
                    position: {x: 0, y: 0},
                    size: {width: 100, height: 100},
                    fontFamily: 'Times New Roman',
                    fontSize: 16,
                    color: '#f0f0f0'
                },
                {
                    id: secondObjectId,
                    type: 'image',
                    src: 'url', 
                    position: {x: 0, y: 0}, 
                    size: {width: 100, height: 100},
                },
                {
                    id: thirdObjectId,
                    type: 'image',
                    src: 'url', 
                    position: {x: 0, y: 0}, 
                    size: {width: 100, height: 100},
                }
            ]
        }

        const updatedSlide = removeObjects(slide, [firstObjectId, thirdObjectId])

        expect(updatedSlide.slideObjects.length).toBe(1)

        expect(slide.slideObjects.length).toBe(3)
    })
})

describe('moveObject', () => {
    it('should move object to new position', () => {
        const objectId = generateId()

        const slide: Slide = {
            id: generateId(),
            background: {
                type: 'solid',
                color: '#ffffff'
            },
            slideObjects: [
                {
                    id: objectId,
                    type: 'text',
                    text: 'abc123',
                    position: {x: 0, y: 0},
                    size: {width: 100, height: 100},
                    fontFamily: 'Times New Roman',
                    fontSize: 16,
                    color: '#f0f0f0'
                }
            ]
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
                type: 'solid',
                color: '#ffffff'
            },
            slideObjects: [
                {
                    id: objectId,
                    type: 'text',
                    text: 'abc123',
                    position: {x: 0, y: 0},
                    size: {width: 100, height: 100},
                    fontFamily: 'Times New Roman',
                    fontSize: 16,
                    color: '#f0f0f0'
                }
            ]
        }

        const updatedSlide = resizeObject(slide, objectId, {width: 1000, height: 1000})

        expect(updatedSlide.slideObjects[0].size).toEqual({width: 1000, height: 1000})

        expect(slide.slideObjects[0].size).toEqual({width: 100, height: 100})
    })
})

describe('updateObjectColor', () => {
    it('should set new color to object', () => {
        const objectId = generateId()

        const slide: Slide = {
            id: generateId(),
            background: {
                type: 'solid',
                color: '#ffffff'
            },
            slideObjects: [
                {
                    id: objectId,
                    type: 'text',
                    text: 'abc123',
                    position: {x: 0, y: 0},
                    size: {width: 100, height: 100},
                    fontFamily: 'Times New Roman',
                    fontSize: 16,
                    color: '#f0f0f0'
                }
            ]
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
                type: 'solid',
                color: '#ffffff'
            },
            slideObjects: [
                {
                    id: objectId,
                    type: 'image',
                    src: 'url',
                    position: {x: 0, y: 0},
                    size: {width: 100, height: 100}
                }
            ]
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
                type: 'solid',
                color: '#ffffff'
            },
            slideObjects: [
                {
                    id: objectId,
                    type: 'text',
                    text: 'abc123',
                    position: {x: 0, y: 0},
                    size: {width: 100, height: 100},
                    fontFamily: 'Times New Roman',
                    fontSize: 16,
                    color: '#f0f0f0'
                }
            ]
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
                type: 'solid',
                color: '#ffffff'
            },
            slideObjects: [
                {
                    id: objectId,
                    type: 'image',
                    src: 'url',
                    position: {x: 0, y: 0},
                    size: {width: 100, height: 100}
                }
            ]
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
                type: 'solid',
                color: '#ffffff'
            },
            slideObjects: [
                {
                    id: objectId,
                    type: 'text',
                    text: 'abc123',
                    position: {x: 0, y: 0},
                    size: {width: 100, height: 100},
                    fontFamily: 'Times New Roman',
                    fontSize: 16,
                    color: '#f0f0f0'
                }
            ]
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
                type: 'solid',
                color: '#ffffff'
            },
            slideObjects: [
                {
                    id: objectId,
                    type: 'Figure',
                    figureType: 'circle',
                    position: {x: 0, y: 0},
                    size: {width: 100, height: 100},
                    color: '#ff0000'
                }
            ]
        }

        const updatedSlide = updateTextFontSize(slide, objectId, 13)

        expect(updatedSlide).toEqual(slide)
    })
})