import { Slide } from "./slide.js"

type Presentation = {
    id: string,
    title: string,
    slides: Slide[],
    selectedSlideIds: string[],
    currentSlideId: string
}

export type {
    Presentation
}