import { ReactElement } from "react";

interface IListItem {
    title: string,
    icon: ReactElement,
    // isOpen: boolean
}

const ListItem = (props: IListItem) => {
    return (
        <div className="flex justify-between items-center p-2 hover:bg-gray-200/80 cursor-pointer rounded-md my-2">
            <div>{props.icon}</div>
            <div className={`text-base transition-all duration-300 ease-in-out`}>{props.title}</div>
        </div>
    );
};

export default ListItem