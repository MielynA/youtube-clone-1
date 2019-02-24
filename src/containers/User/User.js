import React, { Component } from 'react';
import { UserList } from '../../components/Lists/UserList';
import { AddNew } from '../../components/AddNew/AddNew';
import { Row, Col } from 'reactstrap';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'User', //title for add form 
            placeholder: "User's name", //placeholder for add form
            activeUser: 'Taq',
            users: { 'Mo': { 'feed': { 'sports': [] } }, 'Taq': { 'feed': { 'cats': [] } }, 'Liz': { 'feed': { 'bunnies': [] } } }
        }
    }

    handleListClick = (index) => {
        const userArr = Object.keys(this.state.users);
        this.setState({ activeUser: userArr[index] });

    }

    render() {

        const { placeholder, title, activeUser, users } = this.state;
        const data = { activeUser, users }
        return <>
            <div className="container-fluid">
                <Row form>
                    <Col>
                        <AddNew title={title} placeholder={placeholder} />
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