import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
    FormControl,
    FormLabel,
    Input
} from '@chakra-ui/react'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { RiDeleteBin2Line } from 'react-icons/ri'
import PasswordInput from './passwordInput'

const DeleteModal = (props) => {
    return (
        <Modal
            isOpen={props.isOpen}
            onClose={props.onClose}
            size="xl"
            scrollBehavior="outside"
        >
            <ModalOverlay
                bg="blackAlpha.500"
                backdropFilter="blur(10px) hue-rotate(0deg)"
            />
            <ModalContent border="3px solid red" bg="red.200" color="red.900">
                <ModalHeader>Tem certeza que deseja DELETAR sua conta?</ModalHeader>
                <ModalBody>
                    <FormControl mt={4}>
                        <FormLabel>Digite sua senha:</FormLabel>
                        <PasswordInput
                            isInvalid
                            errorBorderColor="red.900"
                        />
                    </FormControl>
                </ModalBody>
                <ModalFooter flexDirection="column">
                    <Button
                        colorScheme="red"
                        leftIcon={<RiDeleteBin2Line />}
                        w="90%"
                        margin={2}
                    >
                        Deletar conta
                    </Button>
                    <Button
                        leftIcon={<IoIosCloseCircleOutline />}
                        colorScheme="green"
                        onClick={props.onClose}
                        w="90%"
                    >
                        Cancelar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
export default DeleteModal
