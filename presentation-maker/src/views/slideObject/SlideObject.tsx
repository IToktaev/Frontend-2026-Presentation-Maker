import type { Slide } from "../../model/types/slide"
import { Text } from "./objects/Text"
import { Image } from "./objects/Image"
import { Circle } from "./objects/Circle"
import { Rectangle } from "./objects/Rectangle"
import { Triangle } from "./objects/Triangle"
import type { CircleObject, RectangleObject, TriangleObject } from "../../model/types/objects"
import { selectNewObject } from "../../viewModel/viewModel"

type ObjectProps = {
    object: Slide['slideObjects'][number];
    scale: number;
};

function SlideObject({ object, scale }: ObjectProps) {
    let content

    if (object.type === 'text') {
        content = Text(object, scale)
    } else if (object.type === 'image') {
        content = Image(object, scale)
    } else if (object.type === 'figure') {
        if (object.figureType === 'circle') {
            content = Circle(object as CircleObject, scale)
        } else if (object.figureType === 'rectangle') {
            content = Rectangle(object as RectangleObject, scale)
        } else if (object.figureType === 'triangle') {
            content = Triangle(object as TriangleObject, scale)
        }
    }

    return (
        <div onClick={(event) => selectNewObject(object.id, event.ctrlKey)}>
            {content}
        </div>
    )
}

export {
    SlideObject
}