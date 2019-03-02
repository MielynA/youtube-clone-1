import React from 'react';
import { Row, Col } from 'reactstrap';


const FeedsList = (props) => {
    const data = props.data;
    const activeUser = props.data.activeUser
    let feeds = data.users[activeUser].feed
    const title = props.title

    const displayOnly = props.displayOnly
    if (!displayOnly) {
        const deleteX = 'X'
        return <>

            <Row form>
                <Col>
                    <h4>{activeUser}'s {title} List</h4>
                    <ul className="list-group">
                        {feeds.map((feed, index) => {
                            return <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                                {feed}
                                <button className="badge badge-secondary badge-pill" onClick={e => { props.onClick(index) }}>{deleteX}</button>
                            </li>
                        })}
                    </ul>
                </Col>
            </Row>
        </>
    } else {
        const deleteX = ''
        return <>
            <Row form>
                <Col>
                    <h4>{activeUser}'s {title} List</h4>
                    <ul className="list-group">
                        {feeds.map((feed, index) => {
                            return <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                                {feed}
                                <button className="badge badge-secondary badge-pill" onClick={e => { props.onClick(index) }}>{deleteX}</button>
                            </li>
                        })}
                    </ul>
                </Col>
            </Row>
        </>
    }
}

export { FeedsList }