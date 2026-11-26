import type { RectangleObject } from "../../../model/types/objects";

type RectangleProps = {
    object: RectangleObject
    scale: number
}

function Rectangle({ object, scale }: RectangleProps) {
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
    );
}

export { Rectangle };