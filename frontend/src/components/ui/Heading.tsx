interface IHeading {
    label: string
}

const Heading = (props: IHeading) => {
    return (
        <div className='font-semibold pb-4 text-2xl text-center'>
            {props.label}
        </div>
    )
}

export default Heading