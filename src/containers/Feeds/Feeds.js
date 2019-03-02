import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { AddNew } from '../../components/AddNew/AddNew';
import { FeedsList } from '../../components/Feedlist/Feedlist';
import Storage from '../../Services/storage'
import { Row, Col, Alert } from 'reactstrap';

class Feeds extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Feeds', //title for add form 
            placeholder: "Feed's name", //placeholder for add form
            data: { activeUser: 'Default', users: { 'Default': { 'feed': ['Music'] } } }, //app data
            input: '',
            alertOn: false,
            error: '', //error message for alert, either invalid entry or existing feed
        };
        this.onDismiss = this.onDismiss.bind(this);
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
        // saves if component has a chance to unmount
        this.saveStateToData(this.state)
            .then(result => {
                console.log(result)
            });
    }

    saveStateToData = () => {
        // save to localStorage
        Storage.saveData('data', (this.state.data))
            .then(result => {
                console.log('data', result)
            })
    }


    onDismiss() {
        this.setState({ alertOn: false });//close alert
    }


    handleAddClick = (input) => {
        const trimedInput = input.trim() //remove unnecessary spaces
        if (trimedInput === '') {
            this.setState({ alertOn: true, input: '', error: 'Invalid Input, Please Enter Valid Name.' });
        }
        else {
            const upperCase = trimedInput[0].toUpperCase();
            const lowerCase = trimedInput.slice(1);
            const name = upperCase.concat('', lowerCase); //name with first letter upper case
            const feedsArr = this.state.data.users[this.state.data.activeUser].feed;
            let flag = false
            for (let i = 0; i < feedsArr.length; i++) {
                if (name === feedsArr[i]) { //check if feed exist
                    flag = true
                }
                else { //add new feed
                    flag = false
                }
            }
            if (flag) {
                this.setState({ alertOn: true, input: '', error: 'Feed Already Exists, Try A Different One.' });

            } else {
                feedsArr.push(name)
                const data = this.state.data;
                data.users[this.state.data.activeUser].feed = feedsArr
                this.setState({ data: data, input: '', alertOn: false });
            }
        }
    }

    handleOnchange = (event) => { //input form content
        this.setState({ input: event.target.value });
    }

    deleteFeed = (index) => { //delete feed on X click
        const feedsArr = this.state.data.users[this.state.data.activeUser].feed;
        const feedToDelete = index
        if (feedsArr.length === 1) { 
            this.setState({ alertOn: true, input: '', error: 'Sorry, You Must Have At Least One Feed' });

        } else {
            feedsArr.splice(feedToDelete, 1)
            const data = this.state.data;
            data.users[this.state.data.activeUser].feed = feedsArr
            this.setState({ data: data, alertOn: false });
        }
    }


    render() {

        const { placeholder, title, data, input, error, alertOn } = this.state;
        return <>
            <Alert color="info" isOpen={alertOn} toggle={this.onDismiss}>
                {error}
            </Alert>
            <div className="container-fluid">
                <Row form>
                    <Col>
                        <AddNew title={title} placeholder={placeholder} input={input} onKeyPress={this.handleAddClick} onClick={this.handleAddClick} onChange={this.handleOnchange} />
                    </Col>
                    <Col>
                        <FeedsList data={data} title={title} onClick={this.deleteFeed} />
                    </Col>
                </Row>
            </div>
        </>
    }
}

export default withRouter(Feeds);
