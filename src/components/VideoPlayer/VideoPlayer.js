import React from 'react';
import {withRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './videoPlayer.css';
import axios from 'axios';
import moment from 'moment';
const API_KEY = 'AIzaSyC2nI7i0QvsKwLt21JaVW3I-JyKOQDrsx8';


class VideoDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoId: props.match.params.video_id,
      videoData: {},
      videoStat: {},
      videoComment: {},

    }
  }
  getSpecificVideo = () =>{
    axios({
      method: 'get',
      url: 'https://www.googleapis.com/youtube/v3/videos',
      params: {
        part: 'id,snippet,statistics',
        key: API_KEY,
        id: this.state.videoId,
      }
    })
    .then((data) => {
      console.log(data);
      this.setState({
        videoData: data.data.items[0].snippet, videoStat: data.data.items[0].statistics
      },()=>{})
    })
    .catch(err => {
      console.log(err);
    });
  }
   
  getCommentVideo = () =>{
    axios({
      method: 'get',
      url: 'https://www.googleapis.com/youtube/v3/commentThreads',
      params: {
        part: 'snippet,replies',
        key: API_KEY,
        videoId: this.state.videoId
      }
    })
    .then((data) => {
      console.log('forvideoComment', data);
      this.setState({
        videoComment: data.data.items[0].snippet.topLevelComment.snippet
      },()=>{})
    })
    .catch(err => {
      console.log(err);
    });
  }


  // getCommentVideo = () =>{
  //   axios({
  //     method: 'get',
  //     url: 'https://www.googleapis.com/youtube/v3/commentThreads',
  //     params: {
  //       part: 'snippet,replies',
  //       videoId: 'Ks-_Mh1QhMc'
  //     }
  //   })
  //   .then((data) => {
  //     console.log(data);
  //     this.setState({
  //       videoComment: data.data.items[0].snippet
  //     },()=>{})
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
  // }
    componentDidMount() {
      this.getSpecificVideo()
      this.getCommentVideo()
    }
 
    render() {
    //   if(!this.videoData || !this.videoStat){
    //         return<div class="spinner-border" role="status">
    //    <span class="sr-only">Loading...</span>
    //  </div>
    //   }
      const link = `https://www.youtube.com/embed/RJxau7J6Iio?autoplay=1&fs=1&origin=http://localhost:3000`;
    
    return ( 
     <React.Fragment >
      <div className = 'row'> 
      {/* <div className = ' col col-2'> */}
      <div className = 'videoFrame '>
      <iframe title = 'yt-video' allowFullScreen type = 'text/html' width = '640' height = '360' src = {link} frameBorder = '0'> </iframe> 
      </div>
      {/* <div className = 'col col-2'></div> */}
      </div>
      <div className = 'col'><h3>{this.state.videoData.title}</h3></div>
      <div className = 'col col-2' >{this.state.videoData.channelTitle}</div> 
      <div className= 'col col-2 ul'>{moment(this.state.videoData.publishedAt).fromNow()}</div><hr></hr>
      <div className = 'col' > Description: {this.state.videoData.description} </div>
      <div className = 'col'>
      <h6>Comments:</h6>
      <img  className = 'col profile-image' src={this.state.videoComment.authorProfileImageUrl} alt=''></img>
      <div className = 'col' > Name: {this.state.videoComment.authorDisplayName} </div>
      <div className = 'col' > Comment: {this.state.videoComment.textOriginal} </div>
      {/* <div className = 'col view' > Views: {this.state.videoStat.viewCount}</div> */}
      
      </div>
      </React.Fragment>
    );
  }




}
export default withRouter(VideoDetails);