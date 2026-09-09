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
    TriangleData
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
        type: 'Figure',
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
        type: 'Figure',
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
        type: 'Figure',
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

function moveObject(slide: Slide, objectId: string, newCoords: Coordinates): Slide {
    const objects = slide.slideObjects.map(object => {
        if (object.id == objectId) {
            return {
                ...object,
                position: newCoords
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

function resizeObject(slide: Slide, objectId: string, newSize: Size): Slide {
    const objects = slide.slideObjects.map(object => {
        if (object.id == objectId) {
            return {
                ...object,
                size: newSize
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

function updateObjectColor(slide: Slide, objectId: string, newColor: string): Slide {
    const objects = slide.slideObjects.map(object => {
        if (object.id == objectId && object.type != 'image') {
            return {
                ...object,
                color: newColor
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

function updateTextFontFamily(slide: Slide, objectId: string, newFontFamily: string): Slide {
    const objects = slide.slideObjects.map(object => {
        if (object.id == objectId && object.type == 'text') {
            return {
                ...object,
                fontFamily: newFontFamily
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

function updateTextFontSize(slide: Slide, objectId: string, newFontSize: number): Slide {
    const objects = slide.slideObjects.map(object => {
        if (object.id == objectId && object.type == 'text') {
            return {
                ...object,
                fontSize: newFontSize
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
    moveObject,
    removeObjects,
    resizeObject,
    updateObjectColor,
    updateTextFontFamily,
    updateTextFontSize
}