import React from 'react';


const DeleteList = (props) => {
    const data = props.data;
    const users = (Object.keys(data.users)).splice(1)

    return <>
        <h4>User List</h4>
        <ul className="list-group">
            <li className="list-group-item disabled" aria-disabled="true">Default</li>
            {users.map((user, index) => {
                return <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                        {user}
                        <button className="badge badge-secondary badge-pill" onClick={e => { props.onClick(index) }}>X</button>
                    </li>                
            })}
        </ul>
    </>

}

export { DeleteList }