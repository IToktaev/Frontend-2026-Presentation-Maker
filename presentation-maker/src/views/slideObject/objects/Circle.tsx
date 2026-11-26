import type { CircleObject } from "../../../model/types/objects"

type CircleProps = {
    object: CircleObject
    scale: number
}

function Circle({ object, scale }: CircleProps) {
    return (
        <div
            style={{
                position: "absolute",
                left: object.position.x * scale,
                top: object.position.y * scale,
                width: object.size.width * scale,
                height: object.size.height * scale,
                borderRadius: "50%",
                backgroundColor: object.color,
            }}
        />
    )
}

export { Circle }