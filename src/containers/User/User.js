import React, { Component } from 'react';
import { UserList } from '../../components/Lists/UserList';
import { AddNew } from '../../components/AddNew/AddNew';
import { DeleteButtons } from '../../components/Lists/DeleteButtons'
import { DeleteList } from '../../components/Lists/DeleteList'
import { Row, Col, Alert } from 'reactstrap';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'User', //title for add form 
            placeholder: "User's name", //placeholder for add form
            activeUser: 'Default',
            users: { 'Default': { 'feed': { 'music': [] } } },
            input: '',
            alertOn: false,
            error: '', //error message for alert, either invalid entry or existing user
            deleteMode: { show: false, display: 'Delete User' } //delte individual users
        };
        this.onDismiss = this.onDismiss.bind(this);
    }

    componentDidMount() {
        this.hydrateStateWithLocalStorage();
        // add event listener to save state to localStorage
        // when user leaves/refreshes the page
        window.addEventListener(
            "beforeunload",
            this.saveStateToLocalStorage.bind(this)
        );
    }

    componentWillUnmount() {
        window.removeEventListener(
            "beforeunload",
            this.saveStateToLocalStorage.bind(this)
        );

        // saves if component has a chance to unmount
        this.saveStateToLocalStorage();
    }

    hydrateStateWithLocalStorage() {
        // for all items in state
        for (let key in this.state) {
            // if the key exists in localStorage
            if (localStorage.hasOwnProperty(key)) {
                // get the key's value from localStorage
                let value = localStorage.getItem(key);
                // parse the localStorage string and setState
                try {
                    value = JSON.parse(value);
                    this.setState({ [key]: value });
                } catch (e) {
                    // handle empty string
                    this.setState({ [key]: value });
                }
            }
        }
    }

    saveStateToLocalStorage() {
        // for every item in React state
        for (let key in this.state) {
            if (key === 'users' || key === 'activeUser') { //only remember users and active user
                // save to localStorage
                localStorage.setItem(key, JSON.stringify(this.state[key]));
            }
        }
    }

    onDismiss() {
        this.setState({ alertOn: false });//close alert
    }

    handleListClick = (index) => { //active user selection
        const userArr = Object.keys(this.state.users);
        this.setState({ activeUser: userArr[index] });
        // localStorage.setItem('activeUser', userArr[index]);
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
            const userArr = Object.keys(this.state.users);
            for (let i = 0; i < userArr.length; i++) {

                if (name === userArr[i]) { //check if user exist
                    this.setState({ alertOn: true, input: '', error: 'Name Already Exists, Try A Different Name.' });
                    return;
                }
                else { //add new user
                    const newUser = { [name]: { 'feed': null } }
                    const newUsers = Object.assign(this.state.users, newUser)
                    this.setState({ users: newUsers, input: '', alertOn: false });
                    // localStorage.setItem('users', JSON.stringify(newUsers));
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
            this.setState({ users: { 'Default': { 'feed': { 'music': [] } } }, alertOn: false, activeUser: 'Default' });
        }
    }

    deleteUser = (index) => { //delete user on X click
        const userArr = Object.keys(this.state.users);
        const newUsers = this.state.users
        const userToDelete = userArr[index + 1]
        delete newUsers[userToDelete]
        if (userToDelete === this.state.activeUser) { //if the user deleted is the active user, then set active user to default
            this.setState({ users: newUsers, activeUser: 'Default' })
            // localStorage.setItem('users', JSON.stringify(newUsers));
        } else {
            this.setState({ users: newUsers })
            //localStorage.setItem('users', JSON.stringify(newUsers));
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

        const { placeholder, title, activeUser, users, input, error, alertOn, deleteMode } = this.state;
        const data = { activeUser, users }
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

export default User 