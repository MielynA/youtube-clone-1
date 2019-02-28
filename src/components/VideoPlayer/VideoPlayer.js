import React from 'react';
import {withRouter} from 'react-router-dom';
import {Button, CardBody, Card} from 'reactstrap'
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
        videoComment: [],
        collapse: false,
        commentsIsLoading: true,
        expandDesc: false
      }
    }
    getSpecificVideo = () => {
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
            videoData: data.data.items[0].snippet,
            videoStat: data.data.items[0].statistics
          }, () => {})
        })
        .catch(err => {
          console.log(err);
        });
    }

    getCommentVideo = () => {
      axios({
          method: 'get',
          url: 'https://www.googleapis.com/youtube/v3/commentThreads',
          params: {
            part: 'snippet,replies',
            key: API_KEY,
            videoId: this.state.videoId,

          }
        })
        .then((data) => {
          console.log('forvideoComment', data.data.items);
          this.setState({
            videoComment: data.data.items,
            commentsIsLoading: false
          }, () => {})
        })
        .catch(err => {
          console.log(err);
        });
    }

    componentDidMount() {
      this.getSpecificVideo()
      this.getCommentVideo()
    }

    toggle = () => {
      this.setState({
        expandDesc: !this.state.expandDesc
      });
    }

    getLessDescription = ()=>{
      console.log(this.state.videoData.description)
      return <CardBody style={{ alignContent: 'auto' }}>
      {this.state.videoData.description ? this.state.videoData.description.slice(0,301) + "..." : 'loading..'}
    </CardBody>
      
    }
    getMoreDescription = () => {
      return <CardBody style={{ alignContent: 'auto' }}>
      {this.state.videoData.description }
    </CardBody>
      
    }
    render() {
      const link = `https://www.youtube.com/embed/RJxau7J6Iio?autoplay=1&fs=1&origin=http://localhost:3000`;
      const loading = <h1>Loading Comments...</h1>;
      const showComments = this.state.videoComment.map((item, i)=>{
        return <><div><img className='col profile-image' src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt=''></img>
        <div className='col'> {item.snippet.topLevelComment.snippet.authorDisplayName} </div>
        <div className='col'> {item.snippet.topLevelComment.snippet.textDisplay}</div></div></>
      })
    //   if(!this.videoData || !this.videoStat){
    //         return<div class="spinner-border" role="status">
    //    <span class="sr-only">Loading...</span>
    //  </div>
    //   }
    return (
        <React.Fragment >
          <div className='row'>
            <div className='videoFrame col '>
              <iframe title='yt-video' allowFullScreen type='text/html' width='640' height='360' src={link} frameBorder='0'>
              </iframe>
            </div>

            <div className='col col-12'><h3>{this.state.videoData.title}</h3></div>
            <div className='col col-2' >{this.state.videoData.channelTitle}</div>
            <div className='col col-2 ul'>{moment(this.state.videoData.publishedAt).fromNow()}</div>
            <div className='col view' > Views: {this.state.videoStat.viewCount}</div></div><div></div>
            <div className ='row'>
            <Card>
              <CardBody style={{ alignContent: 'auto' }}>
                {this.state.expandDesc ? this.getMoreDescription() : this.getLessDescription()}
                <Button className='col col-4' color='secondary' onClick={this.toggle} style={{ msAlignSelf: 'center', marginBottom: '1rem' , marginLeft: '25%'}}>Show more..</Button>
              </CardBody>
            </Card>
            </div>

          <div className='col'>
            <h6>Comments:</h6>
            <div className='col'>
              {this.state.commentsIsLoading ? loading : showComments} </div>
            </div>
        </React.Fragment>
      );
    }




}
export default withRouter(VideoDetails);