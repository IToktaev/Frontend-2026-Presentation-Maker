import type { Slide } from "../../model/types/slide"
import { Text } from "./objects/Text"
import { Image } from "./objects/Image"
import { Circle } from "./objects/Circle"
import { Rectangle } from "./objects/Rectangle"
import { Triangle } from "./objects/Triangle"
import type {
    CircleObject,
    RectangleObject,
    TriangleObject
} from "../../model/types/objects"
import { selectObject } from "../../viewModel/viewModel"
import type React from "react"

type ObjectProps = {
    object: Slide['slideObjects'][number]
    scale: number
    isInteractive: boolean
    slideId: string
}

function SlideObject({
    object,
    scale,
    isInteractive,
    slideId
}: ObjectProps) {
    let content = null

    const handleMouseDown = (event: React.MouseEvent) => {
        if (isInteractive) {
            selectObject(object.id, event.ctrlKey)
        }
    }

    if (object.type === 'text') {
        content = (
            <Text
                object={object}
                scale={scale}
                slideId={slideId}
            />
        )
    } else if (object.type === 'image') {
        content = (
            <Image
                object={object}
                scale={scale}
            />
        )
    } else if (object.type === 'figure') {
        if (object.figureType === 'circle') {
            content = (
                <Circle
                    object={object as CircleObject}
                    scale={scale}
                />
            )
        } else if (object.figureType === 'rectangle') {
            content = (
                <Rectangle
                    object={object as RectangleObject}
                    scale={scale}
                />
            )
        } else if (object.figureType === 'triangle') {
            content = (
                <Triangle
                    object={object as TriangleObject}
                    scale={scale}
                />
            )
        }
    }

    return (
        <div onMouseDown={handleMouseDown}>
            {content}
        </div>
    )
}

export { SlideObject }