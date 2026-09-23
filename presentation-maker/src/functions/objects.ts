import { 
    Coordinates, 
    Size, 
    TextObject, 
    ImageObject, 
    CircleObject, 
    RectangleObject, 
    TriangleObject, 
    SlideObject,
    ImageData,
    TextData,
    CircleData,
    RectangleData,
    TriangleData,
    ObjectUpdate
} from "../types/objects.js"
import { Slide } from "../types/slide.js"

function addSlideObject(slide: Slide, object: SlideObject): Slide {
    return {
        ...slide,
        slideObjects: [
            ...slide.slideObjects,
            object
        ]
    }
}

function createText(data: TextData, objectId: string): TextObject {
    const textObject: TextObject = {
        type: 'text',
        text: data.text,
        position: data.position,
        size: data.size,
        color: data.color,
        fontFamily: data.fontFamily,
        fontSize: data.fontSize,
        fontStyle: data.fontStyle,
        id: objectId
    }

    return textObject
}

function createImage(data: ImageData, objectId: string): ImageObject {
    const imageObject: ImageObject = {
        type: 'image',
        src: data.src,
        position: data.position,
        size: data.size,
        id: objectId
    }

    return imageObject
}

function createCircle(data: CircleData, objectId: string): CircleObject {
    const circleObject: CircleObject = {
        type: 'figure',
        figureType: 'circle',
        position: data.position,
        size: data.size,
        color: data.color,
        id: objectId
    }

    return circleObject
}

function createRectangle(data: RectangleData, objectId: string): RectangleObject {
    const rectangleObject: RectangleObject = {
        type: 'figure',
        figureType: 'rectangle',
        position: data.position,
        size: data.size,
        color: data.color,
        id: objectId
    }

    return rectangleObject
}

function createTriangle(data: TriangleData, objectId: string): TriangleObject {
    const triangleObject: TriangleObject = {
        type: 'figure',
        figureType: 'triangle',
        position: data.position,
        size: data.size,
        color: data.color,
        id: objectId,
        point1: data.point1,
        point2: data.point2,
        point3: data.point3,
    }

    return triangleObject
}

function removeObjects(slide: Slide, selectedObjectIds: string[]): Slide {
    const slideObjects = slide.slideObjects.filter(object => !selectedObjectIds.includes(object.id))

    return {
        ...slide,
        slideObjects: slideObjects
    }
}

function isUpdateForbidden(object: SlideObject, update: ObjectUpdate): boolean {
    return  (object.type == 'image' && update.property == 'color') ||
            (object.type != 'text' && update.property == 'fontFamily') || 
            (object.type != 'text' && update.property == 'fontSize') ||
            (object.type != 'text' && update.property == 'fontStyle') 
}

function updateObject(slide: Slide, objectId: string, update: ObjectUpdate): Slide {
    const objects = slide.slideObjects.map(object => {
        if (object.id == objectId && !isUpdateForbidden(object, update)) {
            return {
                ...object,
                [update.property]: update.value
            }
        } else {
            return object
        }
    })

    return {
        ...slide,
        slideObjects: objects
    }
}

export {
    addSlideObject,
    createCircle,
    createRectangle,
    createTriangle,
    createText,
    createImage,
    removeObjects,
    updateObject
}