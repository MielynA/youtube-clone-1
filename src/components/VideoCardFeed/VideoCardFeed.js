import React from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment'

const VideoCardFeed = (props) => {
    console.log(props.videoInfo.snippet.title)
    return (
        <div style={{}} className='col-3'>
            <div>
                <img src={props.videoInfo.snippet.thumbnails.default.url} alt=''/>
            </div>
            <div>
                <Link to={`/video/${props.videoInfo.id.videoId}`}>{props.videoInfo.snippet.title}</Link>
                <p>{props.videoInfo.snippet.channelTitle}</p>
                <p>{moment(props.videoInfo.snippet.publishedAt).fromNow()}</p>
            </div>
        </div>
    )
}

export default VideoCardFeed