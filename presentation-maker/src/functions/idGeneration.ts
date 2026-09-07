import { SlideObject } from "../types/objects.js";

function generateId(): string {
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 8);
    return `${timestamp}-${randomPart}`;
}

function generateNewObjectIds(objects: SlideObject[] = []): string[] {
    const objectIds: string[] = []

    objects.forEach(() => {
        objectIds.push(generateId())
    })

    return objectIds
}

export {
    generateId,
    generateNewObjectIds
}