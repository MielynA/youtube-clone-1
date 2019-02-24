import React, { Component } from 'react';
import { UserList } from '../../components/Lists/UserList';
import { AddNew } from '../../components/AddNew/AddNew';
import { Row, Col } from 'reactstrap';

class User extends Component{
constructor  (props) {
    super (props);
    this.state = {
        title: 'User', //title for add form 
        placeholder: "User's name", //placeholder for add form
        data: { 'activeUser': 'Taq', 
                'users': { 'Mo': { 'feed': { 'sports': [] } }, 'Taq': { 'feed': { 'cats': [] } }, 'Liz': { 'feed': { 'bunnies': [] } } } }    
    }
}

render() {

    const { placeholder, title, data } = this.state;
    return <>
        <div className="container-fluid">
            <Row form>
                <Col>
                    <AddNew title={title} placeholder={placeholder} />
                </Col>
                <Col>
                    <UserList data={data}/>
                </Col>
            </Row>
        </div>
    </>
}
}

export default  User 