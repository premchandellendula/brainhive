interface ILinkProps {
    link: string,
    title: string
}

function LinkCard(props: ILinkProps){
    return (
        <a
            href={props.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block max-w-[300px] max-h-[250px] overflow-hidden border rounded-lg p-3 bg-gray-50 hover:bg-gray-100 transition"
        >
            <div className="font-semibold text-blue-700 truncate">
                {props.title}
            </div>
        </a>
    )
}

export default LinkCard