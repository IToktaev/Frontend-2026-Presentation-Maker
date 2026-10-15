import type { MouseEventHandler } from "react";

type ButtonProps = {
    children?: React.ReactNode;
    className?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

function Button({children, className, onClick}: ButtonProps) {
    return(
        <button className={className} onClick={onClick}>
            {children}
        </button>
    )
}

export {
    Button
}