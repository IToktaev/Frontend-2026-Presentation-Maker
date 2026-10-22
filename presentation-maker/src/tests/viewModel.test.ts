import { describe, expect, it} from "vitest"
import { setInitialState } from "../model/editor"
import { generateId, generateIds } from "../model/functions/idGeneration"
import type { Presentation } from "../model/types/presentation"
import type { Slide } from "../model/types/slide"
import {
    getCurrentSlideId,
    getPreviewMode,
    getSelectedSlideIds,
    initializeViewModel,
    selectNewSlide,
    setIdsBeforeRemoval,
    setPreviewMode,
    switchSlide,
} from "../viewModel/viewModel"

function createTestSlide(id: string): Slide {
    return {
        id,
        background: { type: "transparent" },
        slideObjects: [],
    }
}

function createTestPresentation(slideIds: string[]): Presentation {
    return {
        id: generateId(),
        title: "Test presentation",
        slides: slideIds.map(createTestSlide),
    }
}

function initializeWithSlides(slideIds: string[]): void {
    setInitialState(createTestPresentation(slideIds))
    initializeViewModel()
}

describe("initializeViewModel", () => {
    it("should select the first slide initially", () => {
        const slideIds = generateIds(3)
        initializeWithSlides(slideIds)

        expect(getCurrentSlideId()).toBe(slideIds[0])
        expect(getSelectedSlideIds()).toEqual([slideIds[0]])
        expect(getPreviewMode()).toBe(false)
    })

    it("should initialize with no selected slides when presentation is empty", () => {
        initializeWithSlides([])

        expect(getCurrentSlideId()).toBe(null)
        expect(getSelectedSlideIds()).toEqual([])
    })
})

describe("selectNewSlide", () => {
    it("should select a slide without Ctrl", () => {
        const slideIds = generateIds(3)
        initializeWithSlides(slideIds)

        selectNewSlide(slideIds[2], false)

        expect(getCurrentSlideId()).toBe(slideIds[2])
        expect(getSelectedSlideIds()).toEqual([slideIds[2]])
    })

    it("should add a slide to selection with Ctrl and make it current", () => {
        const slideIds = generateIds(3)
        initializeWithSlides(slideIds)

        selectNewSlide(slideIds[1], true)

        expect(getCurrentSlideId()).toBe(slideIds[1])
        expect(getSelectedSlideIds()).toEqual([
            slideIds[1],
            slideIds[0],
        ])
    })

    it("should remove a non-current selected slide with Ctrl", () => {
        const slideIds = generateIds(3)
        initializeWithSlides(slideIds)

        selectNewSlide(slideIds[1], true)
        selectNewSlide(slideIds[0], true)

        expect(getCurrentSlideId()).toBe(slideIds[1])
        expect(getSelectedSlideIds()).toEqual([slideIds[1]])
    })

    it("should not deselect the only selected slide", () => {
        const slideIds = generateIds(2)
        initializeWithSlides(slideIds)

        selectNewSlide(slideIds[0], true)

        expect(getSelectedSlideIds()).toEqual([slideIds[0]])
    })
})

describe("switchSlide", () => {
    it("should switch to the next slide", () => {
        const slideIds = generateIds(3)
        initializeWithSlides(slideIds)

        switchSlide(1)

        expect(getCurrentSlideId()).toBe(slideIds[1])
        expect(getSelectedSlideIds()).toEqual([slideIds[1]])
    })

    it("should switch to the previous slide", () => {
        const slideIds = generateIds(3)
        initializeWithSlides(slideIds)
        selectNewSlide(slideIds[2], false)

        switchSlide(-1)

        expect(getCurrentSlideId()).toBe(slideIds[1])
    })

    it("should not switch past the last slide", () => {
        const slideIds = generateIds(3)
        initializeWithSlides(slideIds)
        selectNewSlide(slideIds[2], false)

        switchSlide(1)

        expect(getCurrentSlideId()).toBe(slideIds[2])
    })

    it("should not switch before the first slide", () => {
        const slideIds = generateIds(3)
        initializeWithSlides(slideIds)

        switchSlide(-1)

        expect(getCurrentSlideId()).toBe(slideIds[0])
    })

    it("should do nothing if the current slide is not in the presentation", () => {
        const slideIds = generateIds(2)
        initializeWithSlides(slideIds)

        setInitialState(createTestPresentation([]))
        switchSlide(1)

        expect(getCurrentSlideId()).toBe(slideIds[0])
    })
})

describe("setPreviewMode", () => {
    it("should enable preview mode and keep only the current slide selected", () => {
        const slideIds = generateIds(3)
        initializeWithSlides(slideIds)
        selectNewSlide(slideIds[1], true)

        setPreviewMode(true)

        expect(getPreviewMode()).toBe(true)
        expect(getCurrentSlideId()).toBe(slideIds[1])
        expect(getSelectedSlideIds()).toEqual([slideIds[1]])
    })

    it("should disable preview mode", () => {
        const slideIds = generateIds(2)
        initializeWithSlides(slideIds)

        setPreviewMode(true)
        setPreviewMode(false)

        expect(getPreviewMode()).toBe(false)
    })
})

describe("setIdsBeforeRemoval", () => {
    it("should select an unselected slide before removal", () => {
        const slideIds = generateIds(3)
        initializeWithSlides(slideIds)

        setIdsBeforeRemoval()

        expect(getCurrentSlideId()).toBe(slideIds[1])
        expect(getSelectedSlideIds()).toEqual([slideIds[1]])
    })
})