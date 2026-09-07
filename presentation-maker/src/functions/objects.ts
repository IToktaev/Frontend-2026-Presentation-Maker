import { 
    Coordinates, 
    Size, 
    TextObject, 
    ImageObject, 
    FigureObject, 
    CircleObject, 
    RectangleObject, 
    TriangleObject 
} from "../types/objects.js"
import { Slide } from "../types/slide.js"


function addTextObject(
    slide: Slide, 
    content: string, 
    position: Coordinates,
    size: Size,
    fontFamily: string, 
    fontSize: number, 
    fontColor: string,
    objectId: string
): Slide {
    const textObject: TextObject = {
        type: 'Text',
        text: content,
        position: position,
        size: size,
        fontFamily,
        fontSize,
        color: fontColor,
        id: objectId
    }

    return {
        ...slide,
        slideObjects: [
            ...slide.slideObjects,
            textObject
        ]
    }
}

function addImageObject(
    slide: Slide, 
    imageUrl: string, 
    position: Coordinates,
    size: Size,
    objectId: string
): Slide {
    const imageObject: ImageObject = {
        type: 'Image',
        position: position,
        size: size,
        src: imageUrl,
        id: objectId
    }

    return {
        ...slide,
        slideObjects: [
            ...slide.slideObjects,
            imageObject
        ]
    }
}

function addFigureObject(slide: Slide, figure: FigureObject): Slide {
    return {
        ...slide,
        slideObjects: [
            ...slide.slideObjects,
            figure
        ]
    }
}

function createCircle(
    position: Coordinates,
    size: Size,
    color: string, 
    objectId: string
): CircleObject {
    const circleObject: CircleObject = {
        type: 'Figure',
        figureType: 'Circle',
        position: position,
        size: size,
        color: color,
        id: objectId
    }

    return circleObject
}

function createRectangle(
    position: Coordinates,
    size: Size,
    color: string, 
    objectId: string
): RectangleObject {
    const rectangleObject: RectangleObject = {
        type: 'Figure',
        figureType: 'Rectangle',
        position: position,
        size: size,
        color: color,
        id: objectId
    }

    return rectangleObject
}

function createTriangle(
    position: Coordinates,
    size: Size,
    color: string, 
    point1: Coordinates,
    point2: Coordinates,
    point3: Coordinates,
    objectId: string
): TriangleObject {
    const triangleObject: TriangleObject = {
        type: 'Figure',
        figureType: 'Triangle',
        position: position,
        size: size,
        color: color,
        id: objectId,
        point1: point1,
        point2: point2,
        point3: point3,
    }

    return triangleObject
}

function removeObjects(slide: Slide): Slide {
    const slideObjects = slide.slideObjects.filter(object => !slide.selectedObjectIds.includes(object.id))

    return {
        ...slide,
        slideObjects: slideObjects,
        selectedObjectIds: []
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

function setObjectSelection(slide: Slide, objectId: string): Slide {
    const selectedObjectIds = [...slide.selectedObjectIds]

    if (!selectedObjectIds.includes(objectId)) {
        return {
            ...slide,
            selectedObjectIds: [...selectedObjectIds, objectId]
        }
    } else {
        const newSelectedObjectIds = selectedObjectIds.filter(id => id != objectId)
        return {
            ...slide,
            selectedObjectIds: newSelectedObjectIds
        }
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
        if (object.id == objectId && object.type != 'Image') {
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
        if (object.id == objectId && object.type == 'Text') {
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
        if (object.id == objectId && object.type == 'Text') {
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
    addTextObject,
    addImageObject,
    addFigureObject,
    createCircle,
    createRectangle,
    createTriangle,
    setObjectSelection,
    moveObject,
    removeObjects,
    resizeObject,
    updateObjectColor,
    updateTextFontFamily,
    updateTextFontSize
}