import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
//import { FeedsList } from '../../components/Feedlist/Feedlist';
import Storage from '../../Services/storage'
import { Row, Col } from 'reactstrap';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Feeds', //title for add form 
            data: { activeUser: 'Default', users: { 'Default': { 'feed': ['Music'] } } }, //app data

        };
       // this.onDismiss = this.onDismiss.bind(this);
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
            }
            );
        // window.addEventListener(
        //     "beforeunload",
        //    // this.saveStateToData.bind(this)
        // );

    }

    componentWillUnmount() {
        // window.removeEventListener(
        //     "beforeunload",
        //     this.saveStateToData.bind(this)
        // );
        // saves if component has a chance to unmount
        this.saveStateToData(this.state)
            // .then(result => {
            //     console.log(result)
            // });
    }

    saveStateToData = () => {
        // save to localStorage
        Storage.saveData('data', (this.state.data))
            .then(result => {
                console.log('data', result)
            })
    }


    render() {

        //const {  title, data } = this.state;
        return <>
            <div className="container-fluid">
                <Row form>
                    <Col>
                    home
                    </Col>
                    <Col>
                    </Col>
                </Row>
            </div>
        </>
    }
}

export default withRouter(Home);
