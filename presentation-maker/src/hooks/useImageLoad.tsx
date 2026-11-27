import { useState, useCallback, useEffect, useRef } from "react"

function useImageLoad(): {
    dataUrl: string | null
    loadImage: (file: File | null) => void
} {
    const [dataUrl, setDataUrl] = useState<string | null>(null)
    const readerRef = useRef<FileReader | null>(null)

    const loadImage = useCallback((file: File | null) => {
        if (readerRef.current?.readyState === FileReader.LOADING) {
            readerRef.current.abort()
        }

        if (!file) {
            setDataUrl(null)
            return
        }

        const reader = new FileReader()
        readerRef.current = reader

        reader.onload = () => {
            if (typeof reader.result === "string") {
                setDataUrl(reader.result)
            }
        }

        reader.onerror = () => {
            console.error("Ошибка открытия файла")
            setDataUrl(null)
        }

        reader.readAsDataURL(file)
    }, [])

    useEffect(() => {
        return () => {
            readerRef.current?.abort()
        }
    }, [])

    return { dataUrl, loadImage }
}

export { useImageLoad }