import type { TextObject } from "../../../model/types/objects";

function Text(object: TextObject, scale: number) {
    return (
        <div
            style={{
                position: 'absolute',
                left: object.position.x * scale,
                top: object.position.y * scale,
                width: object.size.width * scale,
                height: object.size.height * scale,
                fontWeight: object.fontWeight,
                fontStyle: object.fontStyle,
                textDecoration: object.textDecoration,
                fontSize: object.fontSize * scale,
                fontFamily: object.fontFamily,
                color: object.color
            }}
        >
            {object.text}
        </div>
    )
}

export {
    Text
}