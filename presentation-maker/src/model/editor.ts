import type { Presentation } from "./types/presentation"

type Modifier<P = unknown> = (model: Presentation, params: P) => Presentation

let currentPresentation: Presentation | null = null
let editorChangeHandler: (() => void) | null = null

function setInitialState(presentation: Presentation): void {
    currentPresentation = presentation
}

function getState(): Presentation | null {
    return currentPresentation
}

function addEditorChangeHandler(handler: () => void): void {
    editorChangeHandler = handler
}

function dispatch<P>(modifier: Modifier<P>, params: P): void {
    if (!currentPresentation) {
        console.error('State is not initialized! Call setInitialState first.')
        return
    }

    currentPresentation = modifier(currentPresentation, params)

    if (editorChangeHandler) {
        editorChangeHandler()
    }
}

export {
    setInitialState, 
    getState,
    dispatch,
    addEditorChangeHandler
}