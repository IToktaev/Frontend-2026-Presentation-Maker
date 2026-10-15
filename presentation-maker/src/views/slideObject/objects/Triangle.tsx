import type { TriangleObject } from "../../../model/types/objects";

function Triangle(object: TriangleObject, scale: number) {
    return (
        <svg
            width="100%"
            height="100%"
            style={{
                position: 'absolute'
            }}
        >
            <polygon
                points={`
                    ${object.point1.x * scale},${object.point1.y * scale}
                    ${object.point2.x * scale},${object.point2.y * scale}
                    ${object.point3.x * scale},${object.point3.y * scale}
                `}
                fill={object.color}
            />
        </svg>
    )
}

export {
    Triangle
}