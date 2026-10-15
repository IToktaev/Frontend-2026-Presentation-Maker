import type { CircleObject } from "../../../model/types/objects";

function Circle(object: CircleObject, scale: number) {
    return (
        <svg
            width="100%"
            height="100%"
            style={{
                position: 'absolute',    
            }}
        >
            <circle
                cx={(object.position.x + object.size.width / 2) * scale}
                cy={(object.position.y + object.size.height / 2) * scale}
                r={Math.min(object.size.width, object.size.height) * scale / 2}
                fill={object.color}
            />
        </svg>
    )
}

export {
    Circle
}