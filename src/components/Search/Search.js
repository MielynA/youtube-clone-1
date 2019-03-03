import React from 'react'
import { withRouter, Link } from 'react-router-dom';
import SearchGlass from '../../assets/Search.png'
import { Container } from 'reactstrap'

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            query: ''
        }
    }

    handleSearch = (e) => {
        e.preventDefault();
        this.props.history.push(`/results/${this.state.query}`);

    }

    setQuery = (e) => {
        this.setState({
            query: e.target.value
        })
    }

    render() {
        return (
            <>
                <Container fluid >
                    <div className='navbar' style={{ backgroundColor: '#111116' }}>
                        <div className='col-6 col-sm-4'>
                            <Link to='/'>
                                <img className='navbar-brand' style={{ height: '70px', marginLeft: '15px', padding: '10px 15px 10px 15px', borderRadius: '5px' }} src='https://static1.squarespace.com/static/5b50ebb7e749401857e16f2f/t/5b6df1af03ce6411658ce1db/1550865626801/?format=1500w' alt='PictureGoesHere' />
                            </Link>
                        </div>
                        <form className='form-inline'>
                            <div className='col-6 col-sm-4'></div>
                            <div onSubmit={this.handleSearch}>
                                <input style={{ border: 'none', color: '#757575', backgroundColor: '#111116', marginTop: '' }} onChange={this.setQuery} type='text' name='query' placeholder='Search Youtube' />
                                <input style={{ width: '20px', height: '18px', marginLeft: '10px' }} type='image' alt='' src={SearchGlass} name='submit' onClick={this.handleSearch} />
                            </div>
                        </form>
                        <form className='form-inline'>
                            <div className='col-6 col-sm-4'></div>
                            <div >
                                <Link style={{ color: '#757575' }} to='/'>Home</Link>
                                <Link style={{ marginLeft: '10px', color: '#757575' }} to='/Editor:/user'>Users</Link>
                                <Link style={{ marginLeft: '10px', color: '#757575' }} to='/Editor:/feededitor'>Feed Editor</Link>
                            </div>
                        </form>
                    </div>
                </Container>
            </>
        )
    }

}

export default withRouter(Search);