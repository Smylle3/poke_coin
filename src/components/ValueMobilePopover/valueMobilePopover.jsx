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
import ValueMobileForm from './valueMobileForm'
import { BsMenuButtonWideFill } from 'react-icons/bs'
import { useAuth } from 'context/authContext'

function ValueMobilePopover() {
    const { onOpen, onClose, isOpen } = useDisclosure()
    const { userInitialValue, valuePokemonsUser } = useAuth()

    return (
        <>
            <Popover
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                placement="bottom"
                closeOnBlur={true}
            >
                <PopoverTrigger>
                    <IconButton
                        icon={<BsMenuButtonWideFill />}
                        colorScheme="blackAlpha"
                        size="lg"
                        isRound
                        border="2px solid white"
                    />
                </PopoverTrigger>
                <PopoverContent p={5} bg="defaultColor.500" color="white"zIndex={788}>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <Box color="yellow.300">
                        Valor em Pokémons: $ {valuePokemonsUser}
                    </Box>
                    <Box color="green.500">
                        Valor depositado: $ {(userInitialValue * 1).toFixed(2)}
                    </Box>
                    <ValueMobileForm onCancel={onClose} />
                </PopoverContent>
            </Popover>
        </>
    )
}

export default ValueMobilePopover
