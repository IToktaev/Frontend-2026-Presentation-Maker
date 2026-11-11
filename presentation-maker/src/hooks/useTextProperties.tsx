import { useEffect, useState } from "react";
import type { TextObject } from "../model/types/objects";

function useTextProperties(selectedObject: TextObject | undefined) {
    const [fontFamily, setFontFamily] = useState('Arial')
    const [fontSize, setFontSize] = useState(24)
    const [fontColor, setFontColor] = useState('#000000')
    const [textDecoration, setTextDecoration] = useState('none')
    const [fontWeight, setFontWeight] = useState('normal')
    const [fontStyle, setFontStyle] = useState('cursive')

    useEffect(() => {
        if (!selectedObject) {
            setFontFamily('Arial')
            setFontSize(24)
            setFontColor('#000000')
            setTextDecoration('none')
            setFontWeight('normal')
            setFontStyle('normal')
            return
        }

        setFontFamily(selectedObject.fontFamily)
        setFontSize(selectedObject.fontSize)
        setFontColor(selectedObject.color)
        setTextDecoration(selectedObject.textDecoration)
        setFontWeight(selectedObject.fontWeight)
        setFontStyle(selectedObject.fontStyle)
    }, [selectedObject])

    return {
        fontFamily,
        fontSize,
        fontColor,
        textDecoration,
        fontWeight,
        fontStyle
    }
}

export {
    useTextProperties
}