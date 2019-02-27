import React, { Component } from 'react';
import { UserList } from '../../components/Lists/UserList';
import { AddNew } from '../../components/AddNew/AddNew';
import { DeleteButtons } from '../../components/Lists/DeleteButtons'
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
            error: '' //error message for alert, either invalid entry or existing user
        };
        this.onDismiss = this.onDismiss.bind(this);
    }

    onDismiss() {
        this.setState({ alertOn: false });//close alert
    }

    handleListClick = (index) => {
        const userArr = Object.keys(this.state.users);
        this.setState({ activeUser: userArr[index] });
    }

    handleAddClick = (input) => {

        const trimedInput = input.trim() //remove unnecessary spaces
        if (trimedInput === '') {
            this.setState({ alertOn: true, input: '', error: 'Invalid Input, Please Enter Valid Name.' });
        }
        else {
            const upperCase = trimedInput[0].toUpperCase();
            const lowerCase = trimedInput.slice(1);
            const name = upperCase.concat('', lowerCase);
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
                }
            }
        }
    }

    handleOnchange = (event) => {
        this.setState({ input: event.target.value });
    }

    handleDeleteAll = () => {
        this.setState({ users: { 'Default': { 'feed': { 'music': [] } } } });
    }

    render() {

        const { placeholder, title, activeUser, users, input, error, alertOn } = this.state;
        const data = { activeUser, users }
        return <>
            <Alert color="info" isOpen={alertOn} toggle={this.onDismiss}>
                {error}
            </Alert>
            <div className="container-fluid">
                <Row form>
                    <Col>
                        <AddNew title={title} placeholder={placeholder} input={input} onKeyPress={this.handleAddClick} onClick={this.handleAddClick} onChange={this.handleOnchange} />
                        <DeleteButtons onClick={this.handleDeleteAll} />
                    </Col>
                    <Col>
                        <UserList data={data} onClick={this.handleListClick} />
                    </Col>
                </Row>
            </div>
        </>
    }
}

export default User 