import { ReactElement } from "react";

interface IButton {
    variant: "primary" | "secondary";
    size: "sm" | "md" | "lg" | "xl";
    text: string;
    startIcon?: ReactElement;
    width: "auto" | "full"
    onClick?: () => void;
}

const variantStyles = {
    "primary": "bg-blue-600 text-blue-100 hover:bg-blue-600/90",
    "secondary": "bg-blue-300 text-blue-500 hover:bg-blue-300/90"
}

const sizeVariants = {
    "sm": "px-3.5 py-1",
    "md": "px-3.5 py-1.5",
    "lg": "md:px-4.5 px-3.5 md:py-2 py-1.5",
    "xl": "px-5 py-2",
}

const widthVariants = {
    "auto": "w-auto",
    "full": "w-full mt-4 m-auto"
}

const Button = (props: IButton) => {
    return (
        <button 
        onClick={props.onClick}
        className={`flex justify-center items-center gap-2 ${widthVariants[props.width]} ${sizeVariants[props.size]} ${variantStyles[props.variant]} text-base rounded-lg cursor-pointer`}>
            {props.startIcon && <span className="text-[1.1rem]">{props.startIcon}</span>}
            <span>{props.text}</span>
        </button>
    )
}

export default Button