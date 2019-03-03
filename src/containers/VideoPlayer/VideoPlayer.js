import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, CardBody, Row, Col } from 'reactstrap'
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
      relatedVideo: [],
      commentsIsLoading: true,
      expandDesc: false,

    }
  }
  getSpecificVideo = () => {
    axios({
      method: 'get',
      url: 'https://www.googleapis.com/youtube/v3/videos',
      params: {
        part: 'id,snippet,contentDetails,statistics',
        key: API_KEY,
        id: this.state.videoId,
      }
    })
      .then((data) => {
        console.log(data);
        this.setState({
          videoData: data.data.items[0].snippet,
          videoStat: data.data.items[0].statistics,
        }, () => { })
      })
      .catch(err => {
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
        console.log('forvideoComment', data.data);
        this.setState({
          videoComment: data.data.items,
          videReplies: data.data.items[0].snippet.topLevelComment.snippet,
          commentsIsLoading: false
        }, () => { })
      })
      .catch(err => {
      });
  }

  requestSearch = () => {
    axios({
      method: 'get',
      url: 'https://www.googleapis.com/youtube/v3/search',
      params: {
        part: 'snippet',
        relatedToVideoId: this.state.videoId,
        key: API_KEY,
        type: 'video',
      }
    })
      .then((data) => {
        console.log('forvideoComment', data.data);
        this.setState({
          relatedVideo: data.data.items,
        }, () => { })
      })
      .catch(err => {

      });
  }

  componentDidMount() {
    this.getSpecificVideo()
    this.getCommentVideo()
    this.requestSearch()
    this.notLoaded()
  }

  toggle = () => {
    this.setState({
      expandDesc: !this.state.expandDesc
    });
  }

  getLessDescription = () => {
    return <CardBody style={{ alignContent: 'auto' }}>
      {this.state.videoData.description ? this.state.videoData.description.slice(0, 301) + "..." : 'loading..'}
    </CardBody>
  }

  getMoreDescription = () => {
    return <CardBody>
      {this.state.videoData.description}
    </CardBody>
  }

  notLoaded = () => {
    if (!this.videoId) {
      return <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    }
  }


  render() {

    const link = `https://www.youtube.com/embed/${this.state.videoId}?autoplay=1&fs=1&origin=http://localhost:3000`;
    const loading = <h4>Loading Comments...<div className="spinner-border" role="status"></div></h4>;
    const showComments = this.state.videoComment.map((item, i) => {
      return <><div><img className='col profile-image' src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt=''></img>
        <div className='col'> {item.snippet.topLevelComment.snippet.authorDisplayName} </div>
        <div className='col'> {item.snippet.topLevelComment.snippet.textDisplay}</div></div></>
    })
    const thumbnails = this.state.relatedVideo.map((items, i) => {
      return <>
        {console.log('thumbnails', items)}
        <div className='col'><img alt='' src={items.snippet.thumbnails.default.url} /></div>
      </>
    })

    return (
      <React.Fragment>

        <div className='container-fluid' style={{marginTop: '30px'}}>
          <Row form>
            <Col>
              <div className='videoFrame'>
                <iframe title='yt-video'
                  allowFullScreen type='text/html'
                  width='640' height='360'
                  src={link}
                  frameBorder='0'>
                </iframe>
              </div>
            </Col>
            <Col>
              <div className='container-fluid col-4'>
                <h6>Because you've watched {this.state.videoData.channelTitle}</h6>
                <div>{thumbnails}</div>
                {/* <div>{this.state.videoData.channelTitle}</div>  */}
              </div>
            </Col>
          </Row>

          <div>
            <div className='col-10'><h4>{this.state.videoData.title}</h4>
              <div className='row'>
                <div className='col' >{this.state.videoData.channelTitle}</div>
                <div className='col'>{moment(this.state.videoData.publishedAt).fromNow()}</div>
                <div className='col'> Views: {new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(this.state.videoStat.viewCount)}</div>
                <div className='col'>
                  <img className='icon' src={require('../../assets/like.png')} alt=''></img>
                  {new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(this.state.videoStat.likeCount)}
                </div>
                <div className='col'>
                  <img className='icon' src={require('../../assets/unlike.png')} alt=''></img>
                  {new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(this.state.videoStat.dislikeCount)}
                </div>
              </div> {/* END OF 2ND ROW */}
              <hr></hr>
              <CardBody>
                {this.state.expandDesc ? this.getMoreDescription() : this.getLessDescription()}
                <Button className='col col-4 btnStyle' color='secondary' onClick={this.toggle} >
                  {this.state.expandDesc ? "Show Less.." : "Show More.."}</Button>
              </CardBody>
              <hr></hr>
              <div className='row'>
                <div className='col'>
                  <h6>Comments:</h6>
                  {this.state.commentsIsLoading ? loading : showComments}
                  {/* <div className='col'>Replies:{this.state.videoReplies}</div> */}
                </div>
              </div>
            </div> {/* END OF COL-10 VIDEO TITLE */}
          </div> {/* END OF VIDEO FRAME */}
        </div> {/* END OF CONTAINER */}



      </React.Fragment>
    );
  }




}
export default withRouter(VideoDetails);