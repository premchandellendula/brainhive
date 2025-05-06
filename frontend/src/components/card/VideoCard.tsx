interface IVideoProps {
    link: string
}

function extractYouTubeID(url: string) {
    const match = url.match(/v=([^&]+)/);
    return match ? match[1] : null;
}


function VideoCard(props: IVideoProps){
    const id = extractYouTubeID(props.link)
    // console.log(id)
    return (
        <iframe className="w-full" src={`https://www.youtube.com/embed/${id}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
    )
}

export default VideoCard