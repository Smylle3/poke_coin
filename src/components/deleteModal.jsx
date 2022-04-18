import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Link
} from '@chakra-ui/react'
import { ImGithub, ImLinkedin2 } from 'react-icons/im'
import { IoIosCloseCircleOutline } from 'react-icons/io'

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
            <ModalContent>
                <ModalHeader>Sobre Desenvolvedor</ModalHeader>
                <ModalCloseButton />
                <ModalBody></ModalBody>
                <ModalFooter justifyContent="space-between">
                    <Link
                        href="https://www.linkedin.com/in/jo%C3%A3o-pedro-smylle/"
                        isExternal
                    >
                        <Button leftIcon={<ImLinkedin2 />} colorScheme="linkedin">
                            Perfil LinkedIn
                        </Button>
                    </Link>
                    <Link href="https://github.com/Smylle3/poke_coin" isExternal>
                        <Button leftIcon={<ImGithub />} colorScheme="blackAlpha">
                            Rep Git
                        </Button>
                    </Link>
                    <Button
                        leftIcon={<IoIosCloseCircleOutline />}
                        colorScheme="red"
                        mr={3}
                        onClick={props.onClose}
                    >
                        Fechar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
export default DeleteModal
