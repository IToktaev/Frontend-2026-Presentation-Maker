import { useCallback } from "react"
import type { Presentation } from "../model/types/presentation"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"

function usePdfExport() {
    const exportToPdf = useCallback(async (presentation: Presentation) => {
        const pdf = new jsPDF({
            orientation: "landscape",
            unit: "px",
            format: [1700, 880]
        })
        const slides = document.querySelectorAll<HTMLElement>(".slide-export")

        if (!slides) {
            return
        }


        for (let i = 0; i < presentation.slides.length; i++) {
            const slide = slides[i]

            const canvas = await html2canvas(slide, {scale: 3})
            const image = canvas.toDataURL("image/png")

            if (i > 0) {
                pdf.addPage()
            }

            const pageWidth = pdf.internal.pageSize.getWidth()

            const imgWidth = pageWidth;
            const imgHeight = (canvas.height / canvas.width) * pageWidth 

            const scale = Math.min(imgWidth / canvas.width, imgHeight / canvas.height)

            pdf.addImage(image, "PNG", 0, 0, canvas.width * scale, canvas.height * scale)
        }
        pdf.save(`${presentation.title}.pdf`)
    }, [] )

    return {
        exportToPdf
    }
}

export {
    usePdfExport
}