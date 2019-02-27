import React from 'react';
import { Button } from 'reactstrap';
import './DeleteButtons.css'


const DeleteButtons = (props) => {
    const buttonMess = props.deleteMode.display;
    return <>
        <div className='buttons'>
            <Button color="secondary" size="sm" onClick={e => (props.onClick())}>Clear All Users</Button>{' '}
            <Button color="secondary" size="sm" onClick={e => (props.click())}>{buttonMess}</Button>
        </div>
    </>
}


export { DeleteButtons }