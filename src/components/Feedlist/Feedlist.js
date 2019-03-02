import React from 'react'

const Feedlist = (props) => {
    let feedItems = props.feedItems;
    let feedList = feedItems.map((category, i) => {
        return <li className="list-group-item" key={i}>{category}</li>
    });

    return (
        <>
            <h2>Feed List</h2>
            <div>
                <ul className="list-group">
                    {feedList}
                </ul>
            </div>
        </>
    )
}


export default Feedlist;