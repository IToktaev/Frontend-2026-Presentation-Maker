import type { Presentation } from "./types/presentation"

type Modifier<P = unknown> = (model: Presentation, params: P) => Presentation

let currentPresentation: Presentation | null = null
let past: Presentation[] = []
let future: Presentation[] = []
let editorChangeHandlers: Array<() => void> = []

const MAX_HISTORY = 50

function setInitialState(presentation: Presentation): void {
    currentPresentation = presentation
    past = []
    future = []
}

function getState(): Presentation | null {
    return currentPresentation
}

function getHistoryState(): { canUndo: boolean; canRedo: boolean } {
  return {
    canUndo: past.length > 0,
    canRedo: future.length > 0,
  };
}

function updateChanges() {
    editorChangeHandlers.forEach((handler) => handler())
}

function addEditorChangeHandler(handler: () => void): void {
    editorChangeHandlers.push(handler)
}

function deleteEditorChangeHandler(handlerForRemoval: () => void): void {
    editorChangeHandlers = editorChangeHandlers.filter((handler) => handler !== handlerForRemoval)
}

function dispatch<P>(modifier: Modifier<P>, params: P): void {
    if (!currentPresentation) {
        console.error('State is not initialized! Call setInitialState first.')
        return
    }

    past = [...past, currentPresentation]
    if (past.length > MAX_HISTORY) {
        past = past.slice(past.length - MAX_HISTORY)
    }

    future = []
    currentPresentation = modifier(currentPresentation, params)

    updateChanges()
}

function undo(): void {
    if (past.length === 0 || !currentPresentation) {
        return
    }
    future = [currentPresentation, ...future]
    const previous = past[past.length - 1]
    past = past.slice(0, -1)
    currentPresentation = previous
    updateChanges()
}

function redo(): void {
    if (future.length === 0 || !currentPresentation) {
        return
    } 
    past = [...past, currentPresentation]
    const next = future[0]
    future = future.slice(1)
    currentPresentation = next
    updateChanges()
}

function getCanUndo(): boolean { return past.length > 0 }
function getCanRedo(): boolean { return future.length > 0 }

export {
    setInitialState, 
    getState,
    dispatch,
    addEditorChangeHandler,
    getCanRedo,
    getCanUndo,
    redo,
    undo,
    getHistoryState,
    deleteEditorChangeHandler
}