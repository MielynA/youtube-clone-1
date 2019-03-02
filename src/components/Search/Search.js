import React from 'react'
import {withRouter, Link} from 'react-router-dom';
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
                <div className='row' style={{height:'80px',backgroundColor:'#111116'}}>
                    <img className='col-2'style={{height:'70px',marginLeft:'15px',padding:'10px 15px 10px 15px',borderRadius:'5px'}} src='https://static1.squarespace.com/static/5b50ebb7e749401857e16f2f/t/5b6df1af03ce6411658ce1db/1550865626801/?format=1500w' alt='PictureGoesHere'/> 
                    <div className='col-2'></div>
                    <div className='col-3' style={{}}>
                        <div style={{height:'30px',marginLeft:'65px',marginTop:'40px',}}>
                            <form onSubmit={this.handleSearch}>
                                <input style={{border:'none',color:'#757575',backgroundColor:'#111116',marginTop:''}} onChange={this.setQuery} type='text' name='query' placeholder='Search Youtube'/>
                                <input style={{width:'20px',height:'18px',marginLeft:'10px'}} type='image' alt='' src={SearchGlass} name='submit' onClick={this.handleSearch}/>
                            </form>
                        </div>
                    </div>
                    <div className='col-1'></div>
                    <div style={{}} className='col-3'> 
                        <div style={{marginTop:'40px'}}>
                            <a style={{color:'#757575'}}href='/'>Home</a>
                            <Link style={{marginLeft:'10px',color:'#757575'}} to='/Editor:/user'>Users</Link>
                            <Link style={{marginLeft:'10px',color:'#757575'}} to='/Editor:/feededitor'>Feed Editor</Link>
                        </div>
                    </div>
                    
                </div>
                
            </>
        )
    }
    
}

export default withRouter(Search);