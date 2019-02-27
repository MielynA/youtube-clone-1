import React from 'react';
import { Button } from 'reactstrap';


const DeleteButtons = (props) => {
   
    return <>
        <Button color="secondary" size="sm">Delete User</Button>{' '}
        <Button color="secondary" size="sm" onClick={e => (props.onClick())}>Clear all</Button>
    </>
}


export { DeleteButtons }