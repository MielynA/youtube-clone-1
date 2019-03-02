import React from 'react';


const FeedsList = (props) => {
    const data = props.data;
    const activeUser = props.data.activeUser
    let feeds = data.users[activeUser].feed
    const title = props.title

    return <>
        <h4>{activeUser}'s {title} List</h4>
        <ul className="list-group">

            {feeds.map((feed, index) => {
                return <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                    {feed}
                    <button className="badge badge-secondary badge-pill" onClick={e => { props.onClick(index) }}>X</button>
                </li>
            })}
        </ul>
    </>

}

export { FeedsList }