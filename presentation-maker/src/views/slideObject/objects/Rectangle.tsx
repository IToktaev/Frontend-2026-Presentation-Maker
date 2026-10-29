import type { RectangleObject } from "../../../model/types/objects";

function Rectangle(object: RectangleObject, scale: number) {
    return (
        <svg
            width={object.size.width * scale}
            height={object.size.height * scale}
            style={{
                position: 'absolute',
                left: object.position.x * scale,
                top: object.position.y * scale,
            }}
        >
            <rect
                x={0}
                y={0}
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