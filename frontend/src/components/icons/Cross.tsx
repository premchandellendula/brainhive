interface ICross {
    onClick: () => void
}

const Cross = (props: ICross) => {
    return (
        <svg onClick={props.onClick} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 hover:bg-blue-300/70 rounded-md cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
    )
}

export default Cross