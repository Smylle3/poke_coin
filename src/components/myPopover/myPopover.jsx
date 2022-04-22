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
import React, { useState } from 'react'
import MyForm from './myForm'
import { RiMenuFoldLine } from 'react-icons/ri'

function MyPopover() {
    const { onOpen, onClose, isOpen } = useDisclosure()
    const [valueProvisory, setValueProvisory] = useState('0,00')

    return (
        <>
            <Box d="inline-block" mr={3}>
                $ {valueProvisory}
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
                    <MyForm onCancel={onClose} setValue={setValueProvisory} />
                </PopoverContent>
            </Popover>
        </>
    )
}

export default MyPopover
