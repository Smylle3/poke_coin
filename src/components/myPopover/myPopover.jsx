import {
    Box,
    IconButton,
    Popover,
    PopoverArrow,
    PopoverCloseButton,
    PopoverContent,
    PopoverTrigger,
    useDisclosure
} from '@chakra-ui/react'
import React from 'react'
import MyForm from './myForm'
import { RiMenuFoldLine } from 'react-icons/ri'
import { useAuth } from 'context/authContext'

function MyPopover() {
    const { onOpen, onClose, isOpen } = useDisclosure()
    const { userInitialValue } = useAuth()


    return (
        <>
            <Box d="inline-block" mr={3}>
                $ {(userInitialValue * 1).toFixed(2)}
            </Box>
            <Popover
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                placement="bottom"
                closeOnBlur={true}
            >
                <PopoverTrigger>
                    <IconButton
                        size="sm"
                        icon={<RiMenuFoldLine size={25} />}
                        variant="solid"
                        colorScheme="green"
                        color="white"
                    />
                </PopoverTrigger>
                <PopoverContent p={5} bg="defaultColor.500">
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <MyForm onCancel={onClose} />
                </PopoverContent>
            </Popover>
        </>
    )
}

export default MyPopover
