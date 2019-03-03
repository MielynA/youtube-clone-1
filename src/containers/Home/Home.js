import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { FeedsList } from '../../components/Feedlist/Feedlist';
import Storage from '../../Services/storage'
import { Container } from 'reactstrap';
import HomeFeedVideos from '../HomeFeedVideos/HomeFeedVideos'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Feeds', //title for add form 
            data: { activeUser: 'Default', users: { 'Default': { 'feed': ['Music'] } } }, //app data
            displayOnly: true,
            loading: false,
            error: null
        };
    }

    componentDidMount() {
        Storage.getData()
            .then(localdata => {
                if (localdata !== null) {
                    this.setState({ data: localdata });
                } else {
                    // handle empty string
                    this.setState({ data: this.state.data });
                }
            },
                (error) => {
                    this.setState({
                        loading: true,
                        error
                    });
                }
            )
        window.addEventListener(
            "beforeunload",
            this.saveStateToData.bind(this)
        );

    }

    componentWillUnmount() {
        window.removeEventListener(
            "beforeunload",
            this.saveStateToData.bind(this)
        );
        //saves if component has a chance to unmount
        this.saveStateToData(this.state)

    }

    saveStateToData = () => {
        // save to localStorage
        Storage.saveData('data', (this.state.data))
            .then(result => {
                console.log('data', result)
            })
    }


    render() {
        const { error, loading, data, displayOnly } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } if (loading) {
            return <div>Loading...</div>;
        } if (!loading) {
            return <>
            <Container style={{marginTop: '30px'}}>
                <Container fluid>
                    <div className="jumbotron jumbotron-fluid-fluid">
                        <div className="container">
                            <h1 className="display-6">{data.activeUser}'s Personal Feed</h1>
                        </div> {/* END OF CONTAINER */}
                    </div> {/* END OF JUMBOTRON CONTAINER */}
                </Container>
                <div className='row'>
                    <div style={{marginLeft:'30px'}} className='col-3'>
                        <FeedsList data={data} displayOnly={displayOnly} />
                    </div>
                    <div className='col-8'>
                    <HomeFeedVideos/>
                    </div>
                </div>
                </Container>
            </>
        }
    }
}

export default withRouter(Home);
