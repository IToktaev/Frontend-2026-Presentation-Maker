import type { RectangleObject } from "../../../model/types/objects"

type RectangleProps = {
    object: RectangleObject
    scale: number
}

function Rectangle({ object, scale }: RectangleProps) {
    return (
        <div
            style={{
                position: "absolute",
                left: object.position.x * scale,
                top: object.position.y * scale,
                width: object.size.width * scale,
                height: object.size.height * scale,
                backgroundColor: object.color,
            }}
        />
    )
}

export { Rectangle }