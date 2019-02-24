import React from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './videoPlayer.css';
// import axios from 'axios';
// const YOUR_API_KEY = 'AIzaSyC2nI7i0QvsKwLt21JaVW3I-JyKOQDrsx8'
//import moment from 'moment';



const VideoPlayer = ({ id }) => {
    //     if(!id){
    //    return<div class="spinner-border" role="status">
    //    <span class="sr-only">Loading...</span>
    //  </div>
    //  }                      
    // ^ (above) we going to need this in case they don't pass the id, 
    // ^ the spinner will show up


    //const videoId = video.id.videoId
    const link = `https://www.youtube.com/embed/Ks-_Mh1QhMc?autoplay=1&fs=1&origin=http://localhost:3000`;
    // in the meantime instead passing the id after embed/ 
    // put example id 

    
  
    return (
      <React.Fragment>
      <iframe allowFullScreen title='yt-video' type="text/html" width="640" height="360" 
    src={link} frameBorder="0"></iframe>
      <div className='videoDetails'>
      <p>title</p>
      <p># of views</p>
      <hr></hr>
      <p>description</p>
      <p>comments from each video</p>
      </div>
     </React.Fragment>
    );
  }
  




export default VideoPlayer ; 

