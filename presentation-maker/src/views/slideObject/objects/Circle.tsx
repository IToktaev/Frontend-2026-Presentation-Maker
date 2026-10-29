import type { CircleObject } from "../../../model/types/objects";

function Circle(object: CircleObject, scale: number) {
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
            <circle
                cx={object.size.width * scale / 2}
                cy={object.size.height * scale / 2}
                r={Math.min(object.size.width, object.size.height) * scale / 2}
                fill={object.color}
            />
        </svg>
    )
}

export { 
    Circle 
}