import { useState, useEffect, useCallback } from 'react'
import { addEditorChangeHandler, deleteEditorChangeHandler, getCanRedo, getCanUndo, redo, undo } from '../model/editor.js'

type HistoryUI = {
    canUndo: boolean
    canRedo: boolean
    onUndo: () => void
    onRedo: () => void
}

function useHistoryUI(): HistoryUI {
    const [canUndo, setCanUndo] = useState(getCanUndo())
    const [canRedo, setCanRedo] = useState(getCanRedo())

    useEffect(() => {
        const sync = () => {
            setCanUndo(getCanUndo())
            setCanRedo(getCanRedo())
        }
            addEditorChangeHandler(sync)
        return () => {
            deleteEditorChangeHandler(sync)
        }
    }, [])

    const onUndo = useCallback(() => {
        undo()
    }, [])

    const onRedo = useCallback(() => {
        redo()
    }, [])
    return { 
        canUndo, 
        canRedo, 
        onUndo, 
        onRedo 
    }
}

export {
    useHistoryUI
}