import type { ImageObject } from "../../../model/types/objects";

function Image(object: ImageObject, scale: number) {
    return (
        <img
            style={{
                position: 'absolute',
                left: object.position.x * scale,
                top: object.position.y * scale,
                width: object.size.width * scale,
                height: object.size.height * scale,
            }}
            src={object.src}
        />
    )
}

export {
    Image
}