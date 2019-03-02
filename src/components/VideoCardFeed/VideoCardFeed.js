import React from 'react';


const VideoCardFeed = props => {

    return (
        <>
            <div className="col col-md-6 col-lg-3 ">
                <div className="card-deck">
                    <div className="card border-light">
                        <img className="card-img-top" src={props.src} alt="Card cap" />
                        <div className="card-body">
                            <h5 className="card-title">{props.videoTitle}</h5>
                            <p className="card-text">{props.description}</p>
                            <p className="card-text">
                                <small className="text-muted">
                                    {props.channelTitle}
                                    <br />Last updated 3 mins ago
                                            </small>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )

}

export default VideoCardFeed