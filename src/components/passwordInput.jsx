import { Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import React from 'react'
import { RiEyeCloseFill, RiEyeFill } from "react-icons/ri";

const PasswordInput = (props) => {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    return (
        <InputGroup>
            <Input
                type={show ? 'text' : 'password'}
                id={props.id}
                placeholder={props.placeholder}
                margin="0px 0px 20px 0px"
                color="defaultColor.400"
                value={props.password}
                onChange={props.onChange}
            />
            <InputRightElement
                onClick={handleClick}
                children={
                    show ? (
                        <RiEyeFill size={20} color="white" />
                    ) : (
                        <RiEyeCloseFill size={20} color="white" />
                    )
                }
            />
        </InputGroup>
    )
}

export default PasswordInput
