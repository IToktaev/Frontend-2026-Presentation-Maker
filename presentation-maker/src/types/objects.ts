type SlideObject = TextObject | ImageObject | FigureObject

type DefaultObject = {
    id: string,
    position: Coordinates,
    size: Size
}

type Coordinates = {
    x: number,
    y: number
}

type Size = {
    width: number,
    height: number
}

type TextObject = DefaultObject & {
    text: string,
    fontSize: number,
    fontFamily: string,
    type: 'Text',
    color: string
}

type ImageObject = DefaultObject & {
    src: string,
    type: 'Image'
}

type FigureObject = DefaultObject & {
    type: 'Figure',
    figureType: 'Circle' | 'Triangle' | 'Rectangle',
    color: string
}

type CircleObject = FigureObject & {
    figureType: 'Circle'
}

type RectangleObject = FigureObject & {
    figureType: 'Rectangle'
}

type TriangleObject = FigureObject & {
    point1: Coordinates,
    point2: Coordinates,
    point3: Coordinates,
    figureType: 'Triangle'
}

export type {
    SlideObject,
    TextObject,
    ImageObject,
    FigureObject,
    CircleObject,
    RectangleObject,
    TriangleObject,
    Coordinates,
    Size
}