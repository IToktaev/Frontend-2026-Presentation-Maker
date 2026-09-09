import { SlideObject } from "./objects.js"

type Slide = {
    id: string,
    background: Background,
    slideObjects: SlideObject[]
}

type Background = SolidBackground | ImageBackground | GradientBackground | TransparentBackground

type TransparentBackground = {
    type: 'transparent'
}

type SolidBackground = {
    color: string,
    type: 'solid'
}

type ImageBackground = {
    src: string,
    type: 'image'
}

type GradientBackground = {
    colors: string[],
    angle: number,
    type: 'gradient'
}

export type {
    Slide,
    Background,
    SolidBackground,
    ImageBackground,
    GradientBackground,
    TransparentBackground
}