import React from 'react'
import axios from 'axios'
import Storage from '../../Services/storage'
import VideoCardFeed from '../../components/VideoCardFeed/VideoCardFeed'

const FeedVideosContainer = (props) => {
    return (
        <div>
        <h3>{props.title}</h3>
        <div className='row'>
            {props.videos.map(video=>{
                return <VideoCardFeed videoInfo={video}/>
            })}
        </div>
        </div>
    )
}

class HomeFeedVideo extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            feed:[],
            feedList:{}
        }
    }

    searchVideos (query) {
        return axios.get('https://www.googleapis.com/youtube/v3/search?'+
        'part=snippet'+
        '&maxResults=12'+
        `&q=${query}`+
        '&key=AIzaSyA4ubJgvyUX269rBhXMyQTL_MR0wWPfRbg')
    }
    componentDidMount () {
        Storage.getData()
        .then(data=>{
            console.log(data)
            console.log(data.users[data.activeUser].feed)
            let localStorageFeed = data.users[data.activeUser].feed
            let initializedState = this.state.feedList

            let searchVideosPromises = localStorageFeed.map(e=>{
                return this.searchVideos(e)
            })
            Promise.all(searchVideosPromises).then(data=>{
                localStorageFeed.map( (e,i) =>{
                    return initializedState[e] = data[i].data.items
                })
                this.setState({
                    feedList:initializedState,
                    feed:Object.keys(initializedState)
                },()=>{
                    console.log(this.state.feedList)
                })
            })
        })
    }

    render () {
        return (
            <div>
                {this.state.feed.map(e=>{
                    return <FeedVideosContainer videos={this.state.feedList[e]} title={e}/>
                })}
            </div>
        )
    }
}


export default HomeFeedVideo