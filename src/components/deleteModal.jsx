import React, { useState } from 'react'
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
    useToast,
    Input
} from '@chakra-ui/react'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { RiDeleteBin2Line } from 'react-icons/ri'
import PasswordInput from './passwordInput'
import deleteUser from 'functions/deleteUser'
import { useAuth } from 'context/authContext'
import MyToast from './myToast'

const DeleteModal = (props) => {
    const { deleteAccount, logIn, user, providerUser } = useAuth()
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const toast = useToast()

    const handleDelete = async () => {
        if (providerUser === 'password') {
            try {
                await logIn(user.email, password)
                const deleteState = await deleteUser(deleteAccount)
                if (deleteState === 'success')
                    MyToast(toast, 'Conta deletada com sucesso!', 'success')
                else if (deleteState === 'error')
                    MyToast(toast, 'Erro ao deletar sua conta!', 'error')
            } catch (error) {
                MyToast(toast, 'Senha incorreta, tente novamente!', 'error')
            }
        } else {
            if (email === user.email) {
                const deleteState = await deleteUser(deleteAccount)
                if (deleteState === 'success')
                    MyToast(toast, 'Conta deletada com sucesso!', 'success')
                else if (deleteState === 'error')
                    MyToast(toast, 'Erro ao deletar sua conta!', 'error')
            } else {
                MyToast(toast, 'Email incorreto, tente novamente!', 'error')
            }
        }
    }

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
            <ModalContent border="3px solid red" bg="red.100" color="red.900">
                <ModalHeader>Tem certeza que deseja DELETAR sua conta?</ModalHeader>
                <ModalBody>
                    {providerUser === 'password' ? (
                        <FormControl>
                            <FormLabel htmlFor="pass">
                                Para deletar, digite sua senha:
                            </FormLabel>
                            <PasswordInput
                                isInvalid
                                errorBorderColor="red.900"
                                id="pass"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                        </FormControl>
                    ) : (
                        <FormControl>
                            <FormLabel htmlFor="email">
                                Para deletar, digite seu email:
                            </FormLabel>
                            <Input
                                isInvalid
                                errorBorderColor="red.900"
                                id="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </FormControl>
                    )}
                </ModalBody>
                <ModalFooter flexDirection="column">
                    <Button
                        colorScheme="red"
                        leftIcon={<RiDeleteBin2Line />}
                        w="100%"
                        marginBottom={2}
                        onClick={() => handleDelete()}
                    >
                        Deletar conta
                    </Button>
                    <Button
                        leftIcon={<IoIosCloseCircleOutline />}
                        colorScheme="green"
                        onClick={props.onClose}
                        w="100%"
                    >
                        Cancelar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
export default DeleteModal
