import type { ImageObject } from "../../../model/types/objects";

type ImageProps = {
    object: ImageObject
    scale: number
}

function Image({ object, scale }: ImageProps) {
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
            draggable={false}
            alt=""
        />
    );
}

export { Image };