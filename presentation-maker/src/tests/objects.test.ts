import { describe, expect, it } from "vitest";
import { generateId, generateIds } from "../model/functions/idGeneration.js";
import { 
    addObjectToPresentation,
    createCircle,
    createImage,
    createRectangle,
    createText,
    createTriangle,
    removeObjects,
    updateColor,
    updateFontFamily,
    updateFontSize,
    updateFontStyle,
    updatePosition,
    updateSize
} from '../model/functions/objects.js'
import type { Slide } from "../model/types/slide.js";
import type { 
    CircleData, 
    FigureObject, 
    ImageData, 
    ImageObject, 
    RectangleData, 
    TextData, 
    TextObject, 
    TriangleData 
} from "../model/types/objects.js";
import { createPresentation } from "../model/functions/presentation.js";
import type { Presentation } from "../model/types/presentation.js";

function createTestSlideWithTextObjects(textObjectIds: string[]): Slide {
    return {
        id: generateId(),
        background: {type: 'transparent'},
        slideObjects: textObjectIds.map(id => createTestTextObject(id))
    }
}

function createTestTextObject(id: string): TextObject {
    return {
        size: {width: 100, height: 100},
        position: {x: 0, y: 0},
        fontFamily: 'Arial',
        fontSize: 16,
        fontStyle: 'normal',
        text: 'abc',
        type: 'text',
        color: '#ff0000',
        id
    }
}

function createTestImageObject(id: string): ImageObject {
    return {
        size: {width: 100, height: 100},
        position: {x: 0, y: 0},
        type: 'image',
        id,
        src: 'url'
    }
}

describe('addObjectToPresentation', () => {
    it('should add circle, rectangle and triangle', () => {
        const [circleId, rectangleId, triangleId] = generateIds(3)
        const id = generateId()
        const slideId = generateId()

        const presentation: Presentation = createPresentation('My Presentation', id, slideId)

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
            fontStyle: 'normal',
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

        let updatedPresentation = presentation
        updatedPresentation = addObjectToPresentation(updatedPresentation, {
            slideId: slideId, object: text
        })
        updatedPresentation = addObjectToPresentation(updatedPresentation, {
            slideId: slideId, object: image
        })
        updatedPresentation = addObjectToPresentation(updatedPresentation, {
            slideId: slideId, object: circle
        })
        updatedPresentation = addObjectToPresentation(updatedPresentation, {
            slideId: slideId, object: rectangle
        })
        updatedPresentation = addObjectToPresentation(updatedPresentation, {
            slideId: slideId, object: triangle
        })

        expect(updatedPresentation.slides[0].slideObjects.length).toBe(5)
        expect(updatedPresentation.slides[0].slideObjects[0].type).toBe('text')
        expect(updatedPresentation.slides[0].slideObjects[1].type).toBe('image')
        expect(updatedPresentation.slides[0].slideObjects[2].type).toBe('figure')
        expect(updatedPresentation.slides[0].slideObjects[3].type).toBe('figure')
        expect(updatedPresentation.slides[0].slideObjects[4].type).toBe('figure')

        expect((
            updatedPresentation.slides[0].slideObjects[2] as FigureObject).figureType).toBe('circle')
        expect((
            updatedPresentation.slides[0].slideObjects[3] as FigureObject).figureType).toBe('rectangle')
        expect((
            updatedPresentation.slides[0].slideObjects[4] as FigureObject).figureType).toBe('triangle')

        expect(presentation.slides[0].slideObjects.length).toBe(0)
    })
})

describe('removeObjects', () => {
    it('should remove each object', () => {
        const ids = generateIds(3)
        const slide: Slide = createTestSlideWithTextObjects(ids)

        const updatedSlide = removeObjects(slide, ids)

        expect(updatedSlide.slideObjects.length).toBe(0)

        expect(slide.slideObjects.length).toBe(3)
    })

    it('should remove part of objects', () => {
        const [firstObjectId, secondObjectId, thirdObjectId] = generateIds(3)
        const slide: Slide = 
            createTestSlideWithTextObjects([firstObjectId, secondObjectId, thirdObjectId])

        const updatedSlide = removeObjects(slide, [firstObjectId, thirdObjectId])

        expect(updatedSlide.slideObjects.length).toBe(1)

        expect(slide.slideObjects.length).toBe(3)
    })
})

describe('updatePosition', () => {
    it('should update object position', () => {
        const objectId = generateId()
        const slide: Slide = createTestSlideWithTextObjects([objectId])

        const updatedSlide = updatePosition(slide, objectId, {x: 100, y: 100})

        expect(updatedSlide.slideObjects[0].position).toEqual({x: 100, y: 100})

        expect(slide.slideObjects[0].position).toEqual({x: 0, y: 0})
    })
})

describe('updateSize', () => {
    it('should update object size', () => {
        const objectId = generateId()
        const slide: Slide = createTestSlideWithTextObjects([objectId])

        const updatedSlide = updateSize(slide, objectId, {width: 1000, height: 1000})

        expect(updatedSlide.slideObjects[0].size).toEqual({width: 1000, height: 1000})

        expect(slide.slideObjects[0].size).toEqual({width: 100, height: 100})
    })
})

describe('updateColor', () => {
    it('should update object color', () => {
        const objectId = generateId()
        const slide: Slide = createTestSlideWithTextObjects([objectId])

        const updatedSlide = updateColor(slide, objectId, '#000000')

        expect((updatedSlide.slideObjects[0] as TextObject).color).toEqual('#000000')

        expect((slide.slideObjects[0] as TextObject).color).toEqual('#ff0000')
    })  

    it('should try to set color to Image', () => {
        const objectId = generateId()
        const slide: Slide = createTestSlideWithTextObjects([])
        slide.slideObjects = [createTestImageObject(objectId)]

        const updatedSlide = updateColor(slide, objectId, '#000000')

        expect(updatedSlide).toEqual(slide)
    })  
})

describe('updateTextProperties', () => {
    it('should update text properties (fontStyle, fontSize, fontFamily)', () => {
        const objectId = generateId()
        const slide: Slide = createTestSlideWithTextObjects([objectId])

        let updatedSlide
        updatedSlide = updateFontSize(slide, objectId, 13)
        updatedSlide = updateFontFamily(updatedSlide, objectId, 'Times new Roman')
        updatedSlide = updateFontStyle(updatedSlide, objectId, 'bold')
        

        expect((updatedSlide.slideObjects[0] as TextObject).fontSize).toEqual(13)
        expect((updatedSlide.slideObjects[0] as TextObject).fontFamily).toEqual('Times new Roman')
        expect((updatedSlide.slideObjects[0] as TextObject).fontStyle).toEqual('bold')

        expect((slide.slideObjects[0] as TextObject).fontSize).toEqual(16)
        expect((slide.slideObjects[0] as TextObject).fontFamily).toEqual('Arial')
        expect((slide.slideObjects[0] as TextObject).fontStyle).toEqual('normal')
    })  

    it('should try to set text properties to image', () => {
        const objectId = generateId()
        const slide: Slide = createTestSlideWithTextObjects([])
        slide.slideObjects = [createTestImageObject(objectId)]

        let updatedSlide
        updatedSlide = updateFontSize(slide, objectId, 13)
        updatedSlide = updateFontFamily(slide, objectId, 'Times new Roman')
        updatedSlide = updateFontStyle(slide, objectId, 'bold')
        
        expect(updatedSlide).toEqual(slide)
    })  
})