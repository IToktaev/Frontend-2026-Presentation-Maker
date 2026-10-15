import type { Slide } from "../../model/types/slide"
import { Text } from "./objects/Text"
import { Image } from "./objects/Image"
import { Circle } from "./objects/Circle"
import { Rectangle } from "./objects/Rectangle"
import { Triangle } from "./objects/Triangle"
import type { CircleObject, RectangleObject, TriangleObject } from "../../model/types/objects"

type ObjectProps = {
    object: Slide['slideObjects'][number];
    scale: number;
};

function SlideObject({ object, scale }: ObjectProps) {
    if (object.type === 'text') {
        return Text(object, scale)
    }

    if (object.type === 'image') {
        return Image(object, scale)
    }

    if (object.type === 'figure') {
        if (object.figureType === 'circle') {
            return Circle(object as CircleObject, scale)
        }
        if (object.figureType === 'rectangle') {
            return Rectangle(object as RectangleObject, scale)
        }
        if (object.figureType === 'triangle') {
            return Triangle(object as TriangleObject, scale)
        }
    }

    return (
        <></>
    )
}

export {
    SlideObject
}