import { ReactElement } from "react";
import { useContent } from "../../hooks/useContent";

interface IListItem {
    title: string,
    icon: ReactElement,
    isOpen: boolean
    active: boolean
}

const ListItem = (props: IListItem) => {
    const { fetchContent }  = useContent(props.title)
    return (
        <div onClick={() => fetchContent()} className={`flex justify-between items-center p-2 cursor-pointer rounded-md my-2 active:bg-blue-300 focus:bg-blue-300 duration-200 transition-all ${props.active ? "bg-blue-300" : "hover:bg-gray-200/80"}`}>
            <div>{props.icon}</div>
            <div className={`text-base transition-all duration-300 ease-in-out block ${props.isOpen ? "block": "hidden"}`}>{props.title}</div>
        </div>
    );
};

export default ListItem