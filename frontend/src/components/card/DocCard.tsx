interface IDocProps {
    link: string
}

function DocCard(props: IDocProps){
    return (
        <iframe src={props.link} width="100%" height="400" frameBorder="0" allowFullScreen />
    )
}

export default DocCard