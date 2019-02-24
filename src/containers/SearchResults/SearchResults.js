import React from 'react'
import {withRouter} from 'react-router-dom'
import VideoCardSearch from '../../components/VideoCardSearch/VideoCardSearch'
import axios from 'axios'

class SearchResults extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            videoData:[],
            loadVideo:false
        }
    }

    requestSearch = (query) => {
        axios.get('https://www.googleapis.com/youtube/v3/search?'+
        'part=snippet'+
        '&maxResults=25'+
        `&q=${query}`+
        '&key=AIzaSyA4ubJgvyUX269rBhXMyQTL_MR0wWPfRbg').then(
            (res)=>{
                console.log(res.data)
                this.setState({
                    videoData:res.data.items,
                    loadVideo:true
                })  
            }
        )
    }
    componentDidMount = () => {
        this.requestSearch(this.props.match.params.query)
    }

    componentWillReceiveProps(props) {
        this.requestSearch(props.match.params.query)
    }

    renderList = () => {
        return ( 
            this.state.videoData.map((e,i)=>{
                return <VideoCardSearch key={i} video={e}/>
            })
        )
    }
    render () {
        return (
            <>  
                {this.state.loadVideo?this.renderList():<p>Waiting to load</p>}
            </>
        )
    }
}

export default withRouter(SearchResults)