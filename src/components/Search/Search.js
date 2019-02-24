import React from 'react'
import {withRouter} from 'react-router-dom';

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
                <form onSubmit={this.handleSearch}>
                    <input onChange={this.setQuery} type='text' name='query' placeholder='Search Youtube'/>
                    <input type='submit' name='submit' value='Submit' onClick={this.handleSearch}/>
                </form>
            </>
        )
    }
    
}

export default withRouter(Search);