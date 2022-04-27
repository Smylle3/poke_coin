import { Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import React from 'react'
import { RiEyeCloseFill, RiEyeFill } from 'react-icons/ri'

const PasswordInput = (props) => {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    return (
        <InputGroup>
            <Input
                isInvalid = {props.isInvalid}
                errorBorderColor={props.errorBorderColor}
                isDisabled={props.isDisabled}
                type={show ? 'text' : 'password'}
                id={props.id}
                placeholder={props.placeholder}
                margin="0px 0px 20px 0px"
                color={props.color}
                value={props.value}
                onChange={props.onChange}
                borderColor={props.borderColor}
            />
            <InputRightElement
                onClick={handleClick}
                children={
                    show ? (
                        <RiEyeFill size={20} color={props.color}/>
                    ) : (
                        <RiEyeCloseFill size={20} color={props.color} />
                    )
                }
            />
        </InputGroup>
    )
}

export default PasswordInput
