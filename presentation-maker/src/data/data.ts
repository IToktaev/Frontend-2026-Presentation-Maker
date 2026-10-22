import { generateId } from "../model/functions/idGeneration";
import { 
    addObjectToPresentation,
    createCircle, 
    createImage, 
    createRectangle, 
    createText, 
    createTriangle 
} from "../model/functions/objects";
import { createPresentation } from "../model/functions/presentation";
import { 
    addSlide, 
    createBackgroundColor, 
    createBackgroundGradient, 
    createBackgroundImage, 
    createBackgroundTransparent, 
    setBackgroundInPresentation, 
} from "../model/functions/slide";
import type { SlideObject } from "../model/types/objects";
import type { Presentation } from "../model/types/presentation";

import TestImage1 from '../assets/test1.png'
import TestImage2 from '../assets/test2.png'

function createTestPresentation(): Presentation {
    const presentationId = generateId()
    const firstSlideId = generateId()
    const secondSlideId = generateId()
    const thirdSlideId = generateId()
    const fourthSlideId = generateId()

    let presentation = createPresentation('My presentation', presentationId, firstSlideId) 
    let background

    background = createBackgroundColor('#0000ff')
    presentation = setBackgroundInPresentation(
        presentation, 
        {
            slideId: firstSlideId, 
            background: background
        }
    )

    let textObject1: SlideObject = createText({
        fontFamily: 'Arial', 
        fontSize: 40, 
        fontStyle: 'italic',
        fontWeight: 'normal',
        textDecoration: 'none',
        text: 'Добро пожаловать!',
        color: '#ff0000',
        position: {x: 0, y: 0},
        size: {width: 100, height: 50},
    }, generateId())

    let textObject2: SlideObject = createText({
        fontFamily: 'Arial', 
        fontSize: 30, 
        fontStyle: 'italic',
        fontWeight: 'bold',
        textDecoration: 'underline',
        text: 'Лабораторная работа #2',
        color: '#000000',
        position: {x: 500, y: 500},
        size: {width: 100, height: 50}
    }, generateId())


    presentation = addObjectToPresentation(presentation, {
        slideId: firstSlideId,
        object: textObject1
    })

    presentation = addObjectToPresentation(presentation, {
        slideId: firstSlideId,
        object: textObject2
    })

    presentation = addSlide(
        presentation, {currentSlideId: firstSlideId, newSlideId: secondSlideId}
    )

    background = createBackgroundImage('#f0f0f0')
    presentation = setBackgroundInPresentation(
        presentation, 
        {
            slideId: secondSlideId, 
            background: background
        }
    )

    let imageObject: SlideObject = createImage({
        src: TestImage1,
        position: {x: 100, y: 200},
        size: {width: 1000, height: 500},
    }, generateId())

    presentation = addObjectToPresentation(presentation, {
        slideId: secondSlideId,
        object: imageObject
    })

    presentation = addSlide(
        presentation, {currentSlideId: secondSlideId, newSlideId: thirdSlideId}
    )

    background = createBackgroundGradient(['#ff0000', '#00ff00'], 90)
    presentation = setBackgroundInPresentation(
        presentation, 
        {
            slideId: thirdSlideId, 
            background: background
        }
    )

    let circleObject: SlideObject = createCircle({
        color: '#ff0000',
        position: {x: 100, y: 200},
        size: {width: 1000, height: 500},
    }, generateId())

    let rectangleObject: SlideObject = createRectangle({
        color: '#00ff00',
        position: {x: 100, y: 200},
        size: {width: 200, height: 1000},
    }, generateId())

    let triangleObject: SlideObject = createTriangle({
        color: '#0000ff',
        position: {x: 100, y: 200},
        size: {width: 500, height: 300},
        point1: {x: 0, y: 0},
        point2: {x: 10, y: 100},
        point3: {x: 800, y: 200},
    }, generateId())

    presentation = addObjectToPresentation(presentation, {
        slideId: thirdSlideId,
        object: circleObject
    })
    presentation = addObjectToPresentation(presentation, {
        slideId: thirdSlideId,
        object: rectangleObject
    })
    presentation = addObjectToPresentation(presentation, {
        slideId: thirdSlideId,
        object: triangleObject
    })

    presentation = addSlide(
        presentation, {currentSlideId: thirdSlideId, newSlideId: fourthSlideId}
    )

    background = createBackgroundTransparent()
    presentation = setBackgroundInPresentation(
        presentation, 
        {
            slideId: fourthSlideId,
            background: background
        }
    )

    let imageObject2: SlideObject = createImage({
        src: TestImage2,
        position: {x: 100, y: 200},
        size: {width: 1000, height: 500},
    }, generateId())

    presentation = addObjectToPresentation(
        presentation, 
        {slideId: fourthSlideId, object: imageObject2}
    )

    return presentation
}

export {
    createTestPresentation
}