import React from 'react'
import {withRouter} from 'react-router-dom';
import SearchGlass from '../../assets/Search.png'

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            query:''
        }
    }
     
    handleSearch = (e) => {
        e.preventDefault();
        this.props.history.push(`/results/${this.state.query}`);
    }

    setQuery = (e) => {
        this.setState({
            query:e.target.value
        })
    }

    render () {
        return (
            <>
                <div className='row' style={{backgroundColor:'#111116'}}>
                    <img className='col-2'style={{height:'60px',marginLeft:'15px',padding:'10px 15px 10px 15px',borderRadius:'5px'}} src='https://static1.squarespace.com/static/5b50ebb7e749401857e16f2f/t/5b6df1af03ce6411658ce1db/1550865626801/?format=1500w' alt='PictureGoesHere'/> 
                    <div className='col-4' style={{}}>
                        <div style={{marginLeft:'65px',marginTop:'15px'}}>
                            <form onSubmit={this.handleSearch}>
                                <input style={{border:'none',color:'#757575',backgroundColor:'#111116',marginTop:'-5px'}} onChange={this.setQuery} type='text' name='query' placeholder='Search Youtube'/>
                                <input style={{width:'20px',height:'18px',marginLeft:'10px'}} type='image' alt='' src={SearchGlass} name='submit' onClick={this.handleSearch}/>
                            </form>
                        </div>
                    </div>
                    <div style={{}} className='col-5'> 
                        <div style={{marginLeft:'110px',marginTop:'15px',}}>
                            <a style={{color:'#757575'}}href='google.com'>Home</a>
                            <a style={{marginLeft:'10px',color:'#757575'}} href='github.com'>Users</a>
                            <a style={{marginLeft:'10px',color:'#757575'}} href='twitter.com'>Feed Editor</a>
                        </div>
                    </div>
                    
                </div>
                
            </>
        )
    }
    
}

export default withRouter(Search);