import { Tweet } from "react-tweet"

interface ITweetProps {
    link: string
}

function TweetCard(props: ITweetProps){
    const id = props.link.split("/status/")[1]
    return (
        <Tweet id={id} />
    )
}

export default TweetCard