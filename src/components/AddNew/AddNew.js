import React from 'react';
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';


const AddNew = (props) => {
const placeholder = props.placeholder
const title = props.title
    return <>
    <h4>Create a new {title} </h4>
        <InputGroup>
            <Input placeholder={placeholder}/>
            <InputGroupAddon addonType="append">
                <Button> Add </Button>
            </InputGroupAddon>
        </InputGroup>
    </>
}


export { AddNew }