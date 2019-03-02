import React from 'react';


const UserList = (props) => {
    const data = props.data;
    const activeUser = data.activeUser;
    const users = Object.keys(data.users);
    const title = props.title

    return <>
        <h4>{title} List</h4>
        {users.map((user, index) => {
            let selected = ' '
            let buttonClass = `list-group-item list-group-item-action d-flex justify-content-between align-items-center`
            if (user === activeUser) {
                selected = 'Selected'
                buttonClass = `list-group-item list-group-item-action active d-flex justify-content-between align-items-center`
            }

            return <div className="list-group" key={index} onClick={e => (props.onClick(index))}>
                <button type="button" className={buttonClass}>
                    {user}
                    <small>{selected}</small>
                </button>
            </div>
        })}
    </>

}

export { UserList }