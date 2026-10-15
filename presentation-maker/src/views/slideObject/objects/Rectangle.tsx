import type { RectangleObject } from "../../../model/types/objects";

function Rectangle(object: RectangleObject, scale: number) {
    return (
        <svg
            width="100%"
            height="100%"
            style={{
                position: 'absolute'
            }}
        >
            <rect
                x={object.position.x * scale}
                y={object.position.y * scale}
                width={object.size.width * scale}
                height={object.size.height * scale}
                fill={object.color}
            />
        </svg>
    )
}

export {
    Rectangle
}