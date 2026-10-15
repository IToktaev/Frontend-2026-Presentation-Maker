function generateId(): string {
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 8);
    return `${timestamp}-${randomPart}`;
}

function generateIds(length: number): string[] {
    return Array.from({ length }, () => generateId());
}

export {
    generateId,
    generateIds
}