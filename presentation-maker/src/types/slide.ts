import { SlideObject } from "./objects.js"

type Slide = {
    id: string,
    background: Background,
    slideObjects: SlideObject[],
    selectedObjectIds: string[]
}

type Background = SolidBackground | ImageBackground | GradientBackground | TransparentBackground

type TransparentBackground = {
    type: 'Transparent'
}

type SolidBackground = {
    color: string,
    type: 'Solid'
}

type ImageBackground = {
    src: string,
    type: 'Image'
}

type GradientBackground = {
    colors: string[],
    angle: number,
    type: 'Gradient'
}

export type {
    Slide,
    Background,
    SolidBackground,
    ImageBackground,
    GradientBackground,
    TransparentBackground
}