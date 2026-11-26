import { describe, expect, it } from "vitest";
import { generateId, generateIds } from "../model/functions/idGeneration.js";
import {
    addObjectToPresentation,
    createCircle,
    createImage,
    createRectangle,
    createText,
    createTriangle,
    removeObjects,
    updateColor,
    updateFontFamily,
    updateFontSize,
    updateFontStyle,
    updateFontWeight,
    updatePosition,
    updateSize,
    updateText,
    updateTextDecoration
} from "../model/functions/objects.js";
import type { Slide } from "../model/types/slide.js";
import type {
    FigureObject,
    ImageObject,
    TextObject
} from "../model/types/objects.js";
import { createPresentation } from "../model/functions/presentation.js";

function createTestTextObject(id: string): TextObject {
    return {
        size: { width: 100, height: 100 },
        position: { x: 0, y: 0 },
        fontFamily: "Arial",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "normal",
        textDecoration: "none",
        text: "abc",
        type: "text",
        color: "#ff0000",
        id
    };
}

function createTestImageObject(id: string): ImageObject {
    return {
        size: { width: 100, height: 100 },
        position: { x: 0, y: 0 },
        type: "image",
        id,
        src: "url"
    };
}

function createTestSlide(objects: Slide["slideObjects"] = []): Slide {
    return {
        id: generateId(),
        background: { type: "transparent" },
        slideObjects: objects
    };
}

describe("addObjectToPresentation", () => {
    it("should add different objects to presentation", () => {
        const [circleId, rectangleId, triangleId, textId, imageId] = generateIds(5);
        const presentationId = generateId();
        const slideId = generateId();

        const presentation = createPresentation("My Presentation", presentationId, slideId);

        const text = createText({
            size: { width: 100, height: 100 },
            position: { x: 0, y: 0 },
            fontFamily: "Arial",
            fontSize: 16,
            fontStyle: "normal",
            fontWeight: "normal",
            textDecoration: "none",
            text: "abcd",
            color: "red"
        }, textId);

        const image = createImage({
            size: { width: 100, height: 100 },
            position: { x: 0, y: 0 },
            src: "url"
        }, imageId);

        const circle = createCircle({
            size: { width: 100, height: 100 },
            position: { x: 0, y: 0 },
            color: "#ff0000"
        }, circleId);

        const rectangle = createRectangle({
            size: { width: 100, height: 100 },
            position: { x: 0, y: 0 },
            color: "#ff0000"
        }, rectangleId);

        const triangle = createTriangle({
            size: { width: 100, height: 100 },
            position: { x: 0, y: 0 },
            color: "#ff0000",
            point1: { x: 100, y: 100 },
            point2: { x: 100, y: 100 },
            point3: { x: 100, y: 100 }
        }, triangleId);

        let updatedPresentation = presentation;

        for (const object of [text, image, circle, rectangle, triangle]) {
            updatedPresentation = addObjectToPresentation(updatedPresentation, {
                slideId,
                object
            });
        }

        const objects = updatedPresentation.slides[0].slideObjects;

        expect(objects).toHaveLength(5);
        expect(objects.map(object => object.type)).toEqual([
            "text",
            "image",
            "figure",
            "figure",
            "figure"
        ]);

        expect((objects[2] as FigureObject).figureType).toBe("circle");
        expect((objects[3] as FigureObject).figureType).toBe("rectangle");
        expect((objects[4] as FigureObject).figureType).toBe("triangle");
        expect(presentation.slides[0].slideObjects).toHaveLength(0);
    });
});

describe("removeObjects", () => {
    it("should remove all selected objects", () => {
        const ids = generateIds(3);
        const slide = createTestSlide(ids.map(id => createTestTextObject(id)));

        const updatedSlide = removeObjects(slide, ids);

        expect(updatedSlide.slideObjects).toHaveLength(0);
        expect(slide.slideObjects).toHaveLength(3);
    });

    it("should remove only selected objects", () => {
        const [firstId, secondId, thirdId] = generateIds(3);
        const slide = createTestSlide([
            createTestTextObject(firstId),
            createTestTextObject(secondId),
            createTestTextObject(thirdId)
        ]);

        const updatedSlide = removeObjects(slide, [firstId, thirdId]);

        expect(updatedSlide.slideObjects).toHaveLength(1);
        expect(updatedSlide.slideObjects[0].id).toBe(secondId);
        expect(slide.slideObjects).toHaveLength(3);
    });
});

describe("updatePosition", () => {
    it("should update object position", () => {
        const object = createTestTextObject(generateId());

        const updatedObject = updatePosition(object, { x: 100, y: 100 });

        expect(updatedObject.position).toEqual({ x: 100, y: 100 });
        expect(object.position).toEqual({ x: 0, y: 0 });
    });
});

describe("updateSize", () => {
    it("should update object size", () => {
        const object = createTestTextObject(generateId());

        const updatedObject = updateSize(object, { width: 200, height: 300 });

        expect(updatedObject.size).toEqual({ width: 200, height: 300 });
        expect(object.size).toEqual({ width: 100, height: 100 });
    });
});

describe("updateColor", () => {
    it("should update text object color", () => {
        const object = createTestTextObject(generateId());

        const updatedObject = updateColor(object, "#000000");

        expect((updatedObject as TextObject).color).toBe("#000000");
        expect(object.color).toBe("#ff0000");
    });

    it("should update figure object color", () => {
        const object = createCircle({
            size: { width: 100, height: 100 },
            position: { x: 0, y: 0 },
            color: "#ff0000"
        }, generateId());

        const updatedObject = updateColor(object, "#000000");

        expect((updatedObject as FigureObject).color).toBe("#000000");
        expect(object.color).toBe("#ff0000");
    });

    it("should not update image color", () => {
        const object = createTestImageObject(generateId());

        const updatedObject = updateColor(object, "#000000");

        expect(updatedObject).toBe(object);
    });
});

describe("updateText", () => {
    it("should update text content", () => {
        const object = createTestTextObject(generateId());

        const updatedObject = updateText(object, "new text");

        expect((updatedObject as TextObject).text).toBe("new text");
        expect(object.text).toBe("abc");
    });

    it("should not update image object", () => {
        const object = createTestImageObject(generateId());

        const updatedObject = updateText(object, "new text");

        expect(updatedObject).toBe(object);
    });
});

describe("updateTextProperties", () => {
    it("should update font size", () => {
        const object = createTestTextObject(generateId());

        const updatedObject = updateFontSize(object, 24);

        expect((updatedObject as TextObject).fontSize).toBe(24);
        expect(object.fontSize).toBe(16);
    });

    it("should update font family", () => {
        const object = createTestTextObject(generateId());

        const updatedObject = updateFontFamily(object, "Times New Roman");

        expect((updatedObject as TextObject).fontFamily).toBe("Times New Roman");
        expect(object.fontFamily).toBe("Arial");
    });

    it("should update font style", () => {
        const object = createTestTextObject(generateId());

        const updatedObject = updateFontStyle(object, "italic");

        expect((updatedObject as TextObject).fontStyle).toBe("italic");
        expect(object.fontStyle).toBe("normal");
    });

    it("should update font weight", () => {
        const object = createTestTextObject(generateId());

        const updatedObject = updateFontWeight(object, "bold");

        expect((updatedObject as TextObject).fontWeight).toBe("bold");
        expect(object.fontWeight).toBe("normal");
    });

    it("should update text decoration", () => {
        const object = createTestTextObject(generateId());

        const updatedObject = updateTextDecoration(object, "underline");

        expect((updatedObject as TextObject).textDecoration).toBe("underline");
        expect(object.textDecoration).toBe("none");
    });

    it("should not update image text properties", () => {
        const object = createTestImageObject(generateId());

        expect(updateFontSize(object, 24)).toBe(object);
        expect(updateFontFamily(object, "Times New Roman")).toBe(object);
        expect(updateFontStyle(object, "italic")).toBe(object);
        expect(updateFontWeight(object, "bold")).toBe(object);
        expect(updateTextDecoration(object, "underline")).toBe(object);
    });
});