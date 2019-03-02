import React from 'react'
import moment from 'moment'
import {Link} from 'react-router-dom'


const replaceEntities = (string) => {
    let apostrophe = '&#39;'
    let amp = '&amp;'

   return string.replace(apostrophe,'\'').replace(amp,'&')

}
const VideoCardSearch = (props) => {
        return (
            <>  
                <div>
                    <div className='row' style={{padding:'20px'}}>
                        <div style={{width:`325px`}} className='row justify-content-center'>
                            <img src={props.video.snippet.thumbnails.medium.url?props.video.snippet.thumbnails.medium.url:props.video.snippet.thumbnails.default.url} alt = ''/>
                        </div>
                        <div style={{marginLeft:'15px'}} className='col-7'>
                            <Link to={`/video/${props.video.id.videoId}`}>{replaceEntities(props.video.snippet.title)}</Link>
                            <p>{props.video.snippet.channelTitle} ·  {moment(props.video.snippet.publishedAt).fromNow()}</p>
                        </div>
                    </div>
                </div>
            </>
    )
}
export default VideoCardSearch