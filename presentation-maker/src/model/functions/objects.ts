import type { 
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
    FontStyle,
    FontWeight,
    TextDecoration
} from "../types/objects.js"
import type { Presentation } from "../types/presentation.js"
import type { Slide } from "../types/slide.js"

function addObjectToPresentation(presentation: Presentation, params: {
    slideId: string,
    object: SlideObject
}): Presentation {
    return {
        ...presentation,
        slides: presentation.slides.map(slide => {
            if (slide.id !== params.slideId) {
                return slide
            }

            return addSlideObject(slide, params.object)
        })
    }
}

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
        fontWeight: data.fontWeight,
        textDecoration: data.textDecoration,
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

function removeObjectsFromPresentation(presentation: Presentation, params: {
    slideId: string,
    selectedObjectIds: string[]
}) {
    const slides = presentation.slides.map(slide => {
        if (slide.id !== params.slideId) {
            return slide
        }

        slide = removeObjects(slide, params.selectedObjectIds)
    })
    
    return {
        ...presentation,
        slides: slides
    }
}

function removeObjects(slide: Slide, selectedObjectIds: string[]): Slide {
    const slideObjects = slide.slideObjects.filter(object => !selectedObjectIds.includes(object.id))

    return {
        ...slide,
        slideObjects: slideObjects
    }
}

function updateObjectInPresentation(presentation: Presentation, params: {
    slideId: string,
    objectId: string,
    update: (object: SlideObject) => SlideObject
}): Presentation {
    return {
        ...presentation,
        slides: presentation.slides.map(slide => {
            if (slide.id !== params.slideId) {
                return slide
            }

            return updateObject(slide, params.objectId, params.update)
        })
    }
}

function updateObject(
    slide: Slide, 
    objectId: string, 
    updateFunction: (object: SlideObject) => SlideObject
): Slide {
    const objects = slide.slideObjects.map(object => {
        if (object.id === objectId) {
            return updateFunction(object)
        } else {
            return object
        }
    })

    return {
        ...slide,
        slideObjects: objects
    }
}

function updatePosition(slide: Slide, objectId: string, newPosition: Coordinates): Slide {
    return updateObject(slide, objectId, (object) => {
        return {
            ...object,
            position: newPosition
        }
    })
}

function updateSize(slide: Slide, objectId: string, newSize: Size): Slide {
    return updateObject(slide, objectId, (object) => {
        return {
            ...object,
            size: newSize
        }
    })
}

function updateColor(slide: Slide, objectId: string, newColor: string): Slide {
    return updateObject(slide, objectId, (object) => {
        if (object.type === 'image') {
            return object
        }

        return {
            ...object,
            color: newColor
        }
    })
}

function updateFontSize(slide: Slide, objectId: string, newFontSize: number): Slide {
    return updateObject(slide, objectId, (object) => {
        if (object.type !== 'text') {
            return object
        }

        return {
            ...object,
            fontSize: newFontSize
        }
    })
}

function updateFontStyle(slide: Slide, objectId: string, newFontStyle: FontStyle): Slide {
    return updateObject(slide, objectId, (object) => {
        if (object.type !== 'text') {
            return object
        }

        return {
            ...object,
            fontStyle: newFontStyle
        }
    })
}

function updateFontWeight(slide: Slide, objectId: string, newFontWeight: FontWeight): Slide {
    return updateObject(slide, objectId, (object) => {
        if (object.type !== 'text') {
            return object
        }

        return {
            ...object,
            fontWeight: newFontWeight
        }
    })
}

function updateTextDecoration(slide: Slide, objectId: string, newTextDecoration: TextDecoration): Slide {
    return updateObject(slide, objectId, (object) => {
        if (object.type !== 'text') {
            return object
        }

        return {
            ...object,
            textDecoration: newTextDecoration
        }
    })
}

function updateFontFamily(slide: Slide, objectId: string, newFontFamily: string): Slide {
    return updateObject(slide, objectId, (object) => {
        if (object.type !== 'text') {
            return object
        }

        return {
            ...object,
            fontFamily: newFontFamily
        }
    })
}

export {
    addSlideObject,
    addObjectToPresentation,
    updateObjectInPresentation,
    removeObjectsFromPresentation,
    createCircle,
    createRectangle,
    createTriangle,
    createText,
    createImage,
    removeObjects,
    updatePosition,
    updateSize,
    updateColor,
    updateFontFamily,
    updateFontSize,
    updateFontStyle,
    updateFontWeight,
    updateTextDecoration
}