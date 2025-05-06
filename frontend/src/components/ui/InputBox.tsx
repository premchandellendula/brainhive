import { ChangeEvent } from "react"

interface IInputBox {
    label: string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const InputBox = (props: IInputBox) => {
    return (
        <div className="flex flex-col gap-1.5 mt-3">
            <label className="text-sm font-semibold">{props.label}</label>
            <input onChange={props.onChange} type="text" placeholder={props.placeholder} className="p-2 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-400/80 outline-none" />
        </div>
    )
}

export default InputBox