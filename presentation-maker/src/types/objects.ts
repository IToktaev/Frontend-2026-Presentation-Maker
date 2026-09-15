type SlideObject = TextObject | ImageObject | FigureObject

type DefaultObject = ObjectData & {
    id: string,
}

type Coordinates = {
    x: number,
    y: number
}

type Size = {
    width: number,
    height: number
}

type TextObject = DefaultObject & TextData & {
    type: 'text',
}

type ImageObject = DefaultObject & ImageData & {
    type: 'image'
}

type FigureObject = DefaultObject & FigureData & {
    type: 'Figure',
    figureType: 'circle' | 'rectangle' | 'triangle'
}

type CircleObject = FigureObject & CircleData & {
    figureType: 'circle'
}

type RectangleObject = FigureObject & RectangleData & {
    figureType: 'rectangle'
}

type TriangleObject = FigureObject & TriangleData & {
    point1: Coordinates,
    point2: Coordinates,
    point3: Coordinates,
    figureType: 'triangle'
}

type ObjectData = {
    position: Coordinates,
    size: Size
}

type TextData = ObjectData & {
    fontFamily: string,
    fontSize: number,
    text: string,
    color: string
}

type ImageData = ObjectData & {
    src: string
}

type FigureData = ObjectData & {
    color: string
}

type CircleData = FigureData

type RectangleData = FigureData

type TriangleData = FigureData & {
    point1: Coordinates,
    point2: Coordinates,
    point3: Coordinates
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
    Size,
    ObjectData, 
    TextData,
    ImageData,
    FigureData,
    CircleData,
    RectangleData,
    TriangleData
}