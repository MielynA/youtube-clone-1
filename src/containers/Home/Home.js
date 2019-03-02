import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Feedlist from '../../components/Feedlist/Feedlist';
import VideoCardFeed from '../../components/VideoCardFeed/VideoCardFeed'

const searchTerm = 'mk11'
const API_KEY = 'AIzaSyA1jQV_wEcuT4FiKJDus7Js0B81EZ-tqEE';
const URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchTerm}&key=${API_KEY}`;

class Home extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        activeUser: 'Mo',
        users: {
            user1: {
                username: 'Mo',
                feed: {
                    nameOfFeed: {
                        feedLinks: []
                    }
                }
            },

            user2: {
                username: 'Taq',
                feed: {
                    nameOfFeed: {
                        feedLinks: []
                    }
                }
            },

            user3: {
                username: 'Liz',
                feed: {
                    nameOfFeed: {
                        feedLinks: []
                    }
                }
            }
        },

        feedItems: ['ESPN First Take', 'Drake', 'Coldfusion', 'Vox', 'MK11', 'Motorcyling']
    }

    componentDidMount = () => {
        axios.get(URL)
             .then(res => {
                    let feed = [];
                for (let i = 0; i < res.data.items.length; i++) {
                    let thumbnail = res.data.items[i].snippet.thumbnails.medium.url
                    let videoTitle = res.data.items[i].snippet.title
                    let channelTitle = res.data.items[i].snippet.channelTitle
                    //let activeUser = this.state.activeUser
                    feed.push({thumbnail, videoTitle, channelTitle})
                }
                return feed;
            })
            .then(res => {
                console.log('.then res', res)
                this.setState(prevState => ({
                    ...prevState,
                    ...prevState.activeUser,
                    users: {
                        ...prevState.users,
                        user1: {
                            ...prevState.users.user1,
                            feed: {
                                ...prevState.users.user1.feed,
                                nameOfFeed: {
                                    ...prevState.users.user1.feed.nameOfFeed.name = searchTerm,
                                    feedLinks: {
                                        ...prevState.users.user1.feed.nameOfFeed.feedLinks = res
                                    }
                                }
                            }
                        }
                    }
                }))
            })
            .catch(err => { console.log(err) })
        }
    //     this.setState(prevState => ({
    //         ...prevState,
    //         ...prevState.activeUser,
    //         users: {
    //             ...prevState.users,
    //             user1: {
    //                 ...prevState.users.user1,
    //                 feed: {
    //                     ...prevState.users.user1.feed,
    //                     nameOfFeed: {
    //                         ...prevState.users.user1.feed.nameOfFeed,
    //                         feedLinks: {
    //                             ...prevState.users.user1.feed.nameOfFeed.feedLinks = [{ thumbnail, videoTitle, channelTitle, }]
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     }))
    // })
    // .catch(err => { console.log(err) })

    render() {
        return (
            <>{console.log('feed[0]', this.state.users.user1.feed.nameOfFeed.feedLinks[0])}
                <div className="container">
                    <div className="jumbotron">
                        <h1 className="display-4">{this.state.activeUser}'s Personalized Video Feed</h1>
                    </div>
                    <div className="row">
                        <div className='col col-12 col-md-3'><Feedlist feedItems={this.state.feedItems} /></div>
                        <div className='col col-12 col-md-9 '>
                            <h2>{searchTerm}</h2>
                            <div className="row">
                                <VideoCardFeed

                                     src={this.state.users.user1.feed.nameOfFeed.feedLinks[0].thumbnail}
                                    // videoTitle={this.state.users.user1.feed.nameOfFeed.feedLinks[0].videoTitle}
                                    // channelTitle={this.state.users.user1.feed.nameOfFeed.feedLinks[0].channelTitle}
                                />

                                
                            </div>

                            <p>show more</p>
                            <hr />
                        </div>

                    </div>
                </div>
            </>
        )
    }
}
export default Home;