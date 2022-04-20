import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
    useToast
} from '@chakra-ui/react'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { RiDeleteBin2Line } from 'react-icons/ri'
import { ImExit } from 'react-icons/im'
import { useAuth } from 'context/authContext'
import MyToast from './myToast'
import deleteUser from 'functions/deleteUser'

const DeleteModal = (props) => {
    const { logOut, deleteAccount } = useAuth()
    const [loading, setLoading] = useState(false)
    const toast = useToast()

    const handleDelete = async (value) => {
        setLoading(true)
        if (value === 0) {
            try {
                await logOut()
                MyToast(
                    toast,
                    'Agora faça login na sua conta novamente para deletar sua conta!',
                    'success'
                )
            } catch (error) {
                MyToast(toast, 'Algo deu errado ao deslogar!', 'error')
            }
        } else if (value === 1) {
            try {
                await deleteUser(deleteAccount)
                MyToast(toast, 'Conta deletada com sucesso!', 'success')
            } catch (error) {
                console.log(error)
                MyToast(toast, 'Algo deu errado ao deletar sua conta!', 'error')
            }
        }
        setLoading(false)
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
                    Caso não seja possivel deletar sua conta, refaça o login e tente
                    novamente!
                    {/*{providerUser === 'password' ? (
                        <FormControl>
                            <FormLabel htmlFor="pass">
                                Para deletar, digite sua senha:
                            </FormLabel>
                            <PasswordInput
                                isDisabled={loading}
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
                                isDisabled={loading}
                                isInvalid
                                errorBorderColor="red.900"
                                id="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </FormControl>
                    )}*/}
                </ModalBody>
                <ModalFooter flexDirection="column">
                    <Button
                        isLoading={loading}
                        colorScheme="yellow"
                        leftIcon={<ImExit />}
                        w="100%"
                        marginBottom={2}
                        onClick={() => handleDelete(0)}
                    >
                        Refaça login
                    </Button>
                    <Button
                        isLoading={loading}
                        colorScheme="red"
                        leftIcon={<RiDeleteBin2Line />}
                        w="100%"
                        marginBottom={2}
                        onClick={() => handleDelete(1)}
                    >
                        Clique para deletar sua conta
                    </Button>
                    <Button
                        isLoading={loading}
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
