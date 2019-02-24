import React from 'react';
import { UserList } from '../../components/Lists/UserList';
import { AddNew } from '../../components/AddNew/AddNew';
import { Row, Col } from 'reactstrap';

const User = (props) => {
    const title = 'User'
    const placeholder = "User's name"
    return <>
        <div className="container-fluid">
            <Row form>
                <Col>
                    <AddNew title={title} placeholder={placeholder} />
                </Col>
                <Col>
                    <UserList />
                </Col>
            </Row>
        </div>
    </>
}

export { User }