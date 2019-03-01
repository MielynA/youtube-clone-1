import React from 'react';


const UserList = (props) => {
    const data = props.data;
    console.log(data)
    const activeUser = data.activeUser;
    const users = Object.keys(data.users);
    console.log(users)

    return <>
        <h4>User List</h4>
        {users.map((user, index) => {
            let selected = ' '
            let buttonClass = `list-group-item list-group-item-action d-flex justify-content-between align-items-center`
            if (user === activeUser) {
                selected = 'selected'
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