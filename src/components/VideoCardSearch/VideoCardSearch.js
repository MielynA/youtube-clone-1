import React from 'react'
import moment from 'moment'


const VideoCardSearch = (props) => {
        return (
            <>
                <div>
                    <img src={props.video.snippet.thumbnails.medium.url} alt = ''/>
                    <div>
                        <h3>{props.video.snippet.title}</h3>
                        <p>{props.video.snippet.channelTitle} {moment(props.video.snippet.publishedAt).fromNow()}</p>
                    </div>
                </div>
            </>
    )
}
export default VideoCardSearch