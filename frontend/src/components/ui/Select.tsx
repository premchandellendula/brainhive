import { ChangeEvent } from "react"

interface ISelect {
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

const Select = (props: ISelect) => {
    return (
        <div className="mt-3">
            <label  className="text-sm font-semibold">Type</label>
            <select 
            onChange={props.onChange}
            defaultValue=""
            className="w-full p-2 border border-blue-300 rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400/80 mt-2">
                <option value="" disabled hidden>Select a Type</option>
                <option value="Tweet">Tweet</option>
                <option value="Document">Document</option>
                <option value="Link">Link</option>
                <option value="Video">Video</option>
            </select>
        </div>
    )
}

export default Select