type InputProps = React.ComponentProps<"input">

function TextInput({className, ...props}: InputProps) {
    return(
        <input 
            className={className}
            {...props}
        />
    )
}

export {
    TextInput
}