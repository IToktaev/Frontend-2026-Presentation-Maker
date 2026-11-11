import { useEffect, useState} from "react";

function useImageLoad(file: File | null): string | null {
    const [dataUrl, setDataUrl] = useState<string | null>(null)

    useEffect(() => {
        if (!file) {
            setDataUrl(null)
            return
        }

        const reader = new FileReader()

        reader.onload = () => {
            setDataUrl(reader.result as string)
        }

        reader.onerror = () => {
            console.error("Ошибка открытия файла")
            setDataUrl(null)
        }

        reader.readAsDataURL(file)

        return () => {
            reader.onload = null
            reader.onerror = null

            reader.abort()
        }

    }, [file])

    return dataUrl
}

export {
    useImageLoad
}