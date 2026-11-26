import type { TriangleObject } from "../../../model/types/objects"

type TriangleProps = {
    object: TriangleObject
    scale: number
}

function Triangle({ object, scale }: TriangleProps) {
    const xs = [object.point1.x, object.point2.x, object.point3.x]
    const ys = [object.point1.y, object.point2.y, object.point3.y]
    const minX = Math.min(...xs)
    const minY = Math.min(...ys)
    const width = Math.max(...xs) - minX
    const height = Math.max(...ys) - minY

    const toPercent = (x: number, y: number) =>
        `${((x - minX) / width) * 100}% ${((y - minY) / height) * 100}%`

    return (
        <div
            style={{
                position: "absolute",
                left: minX * scale,
                top: minY * scale,
                width: width * scale,
                height: height * scale,
                backgroundColor: object.color,
                clipPath: `polygon(
                    ${toPercent(object.point1.x, object.point1.y)}, 
                    ${toPercent(object.point2.x, object.point2.y)}, 
                    ${toPercent(object.point3.x, object.point3.y)}
                )`,
            }}
        />
    )
}

export { Triangle }