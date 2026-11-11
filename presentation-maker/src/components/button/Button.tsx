import type { MouseEventHandler } from "react";

type ButtonProps = {
    children?: React.ReactNode
    className?: string
    style?: React.CSSProperties
    onClick?: MouseEventHandler<HTMLButtonElement>
}

function Button({children, className, onClick, style}: ButtonProps) {
    return(
        <button className={className} onClick={onClick} style={style}>
            {children}
        </button>
    )
}

export {
    Button
}