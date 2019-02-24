import React from 'react'
import moment from 'moment'
import {Link} from 'react-router-dom'


const VideoCardSearch = (props) => {
        return (
            <>
                <div>
                    <img src={props.video.snippet.thumbnails.medium.url} alt = ''/>
                    <div>
                        <Link to={`/video/${props.video.id.videoId}`}>{props.video.snippet.title}</Link>
                        <p>{props.video.snippet.channelTitle} {moment(props.video.snippet.publishedAt).fromNow()}</p>
                    </div>
                </div>
            </>
    )
}
export default VideoCardSearch