import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import { UserList } from '../../components/Lists/UserList';
import { AddNew } from '../../components/AddNew/AddNew';
import { DeleteButtons } from '../../components/Lists/DeleteButtons';
import { DeleteList } from '../../components/Lists/DeleteList';
import Storage from '../../Services/storage'
import { Row, Col, Alert } from 'reactstrap';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'User', //title for add form 
            placeholder: "User's name", //placeholder for add form
            data: { activeUser: 'Default', users: { 'Default': { 'feed': { 'music': [] } } } }, //app data
            input: '',
            alertOn: false,
            error: '', //error message for alert, either invalid entry or existing user
            deleteMode: { show: false, display: 'Delete User' } //delte individual users
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

    handleListClick = (index) => { //active user selection
        const userArr = Object.keys(this.state.data.users);
        this.setState({ data: { activeUser: userArr[index], users: this.state.data.users } });
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
            const userArr = Object.keys(this.state.data.users);
            for (let i = 0; i < userArr.length; i++) {

                if (name === userArr[i]) { //check if user exist
                    this.setState({ alertOn: true, input: '', error: 'Name Already Exists, Try A Different Name.' });
                    return;
                }
                else { //add new user
                    const newUser = { [name]: { 'feed': null } }
                    const newUsers = Object.assign(this.state.data.users, newUser)
                    this.setState({ data: { activeUser: this.state.data.activeUser, users: newUsers }, input: '', alertOn: false });
                }
            }
        }
    }

    handleOnchange = (event) => { //input form content
        this.setState({ input: event.target.value });
    }

    handleDeleteAll = () => {
        if (this.state.alertOn === false) { //alert before deleting all
            this.setState({ alertOn: true, error: 'You are about to DELETE ALL USERS. To continue click Delete All Users again. To cancel close this alert.' })
        } else { //second click, delete all
            this.setState({ data: { 'activeUser': 'Default', users: { 'Default': { 'feed': { 'music': [] } } } }, alertOn: false });
        }
    }

    deleteUser = (index) => { //delete user on X click
        const userArr = Object.keys(this.state.data.users);
        const newUsers = this.state.data.users
        const userToDelete = userArr[index + 1]
        delete newUsers[userToDelete]
        if (userToDelete === this.state.data.activeUser) { //if the user deleted is the active user, then set active user to default
            this.setState({ data: { users: newUsers, activeUser: 'Default' } })

        } else {
            this.setState({ data: { activeUser: this.state.data.activeUser, users: newUsers } })

        }
    }

    deleteUserButton = () => {//delete individual user mode/view
        if (this.state.deleteMode.show === false) {
            this.setState({ deleteMode: { show: true, display: 'Done' } })
        } else {
            this.setState({ deleteMode: { show: false, display: 'Delete User' } })
        }

    }

    render() {

        const { placeholder, title, data, input, error, alertOn, deleteMode } = this.state;
        return <>
            <Alert color="info" isOpen={alertOn} toggle={this.onDismiss}>
                {error}
            </Alert>
            <div className="container-fluid">
                <Row form>
                    <Col>
                        <AddNew title={title} placeholder={placeholder} input={input} onKeyPress={this.handleAddClick} onClick={this.handleAddClick} onChange={this.handleOnchange} />
                        <DeleteButtons deleteMode={deleteMode} onClick={this.handleDeleteAll} click={this.deleteUserButton} />
                    </Col>
                    <Col>
                        {deleteMode.show === false ? <UserList data={data} onClick={this.handleListClick} /> :
                            <DeleteList data={data} onClick={this.deleteUser} />}
                    </Col>
                </Row>
            </div>
        </>
    }
}

export default withRouter(User)
