import React from 'react';
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';


const AddNew = (props) => {
    const placeholder = props.placeholder
    const title = props.title
    const input = props.input
    return <>
        <h4>Create a new {title} </h4>
        <InputGroup>
            <Input type='text' value={input} placeholder={placeholder} onKeyPress={e => { if (e.key === 'Enter') { props.onKeyPress(input) } }} onChange={e => props.onChange(e)} />
            <InputGroupAddon addonType="append">
                <Button onClick={e => props.onClick(input)}> Add </Button>
            </InputGroupAddon>
        </InputGroup>
    </>
}


export { AddNew }