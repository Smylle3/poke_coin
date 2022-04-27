import React, { useState } from 'react'
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    IconButton,
    Input,
    Text,
    useDisclosure,
    useToast
} from '@chakra-ui/react'
import { FcCheckmark } from 'react-icons/fc'
import { MdOutlineClear } from 'react-icons/md'
import { BiEditAlt } from 'react-icons/bi'
import Header from 'components/header'
import PasswordInput from 'components/passwordInput'
import { useAuth } from 'context/authContext'
import MyToast from 'components/myToast'
import DeleteModal from 'components/deleteModal'
import PersonalAvatar from 'components/personalAvatar'

const Profile = () => {
    const { user, providerUser, emailVerification, changePassword, logIn } = useAuth()
    const [userName, setUserName] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [editProfile, setEditProfile] = useState(null)
    const [loading, setLoading] = useState(false)
    const { updateUser } = useAuth()
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const KeyDown = (event, isUpdate) => {
        if ((event === 'Enter' || event === 'NumpadEnter') && isUpdate === 'password') {
            changePass()
        } else if (event === 'Enter' || event === 'NumpadEnter') {
            updateProfile(isUpdate)
        } else if (event === 'Escape' && user.displayName) {
            setEditProfile(null)
        }
    }

    const updateProfile = async (isUpdate) => {
        setUserName('')
        try {
            if (isUpdate === 'username' && userName.length !== 0) {
                await updateUser(userName)
                MyToast(toast, 'Perfil atualizado com sucesso!', 'success')
                setEditProfile(null)
                return
            }
            MyToast(toast, 'Preencha os campos corretamente!', 'error')
            setEditProfile(null)
        } catch (error) {
            console.log(error)
            MyToast(toast, 'Algo deu errado, tente novamente!', 'error')
        }
    }

    const sendEmailVerify = async () => {
        try {
            await emailVerification()
            MyToast(toast, 'Enviamos o email de verificação!', 'success')
        } catch (error) {
            MyToast(toast, 'Algo deu errado, tente novamente!', 'error')
        }
    }

    const changePass = async () => {
        setLoading(true)
        if (password.length > 5 && password === passwordConfirm) {
            try {
                await logIn(user.email, oldPassword).then(async () => {
                    try {
                        await changePassword(password)
                        MyToast(toast, 'Senha alterada com sucesso', 'success')
                    } catch (error) {
                        MyToast(toast, 'Algo deu errado, tente novamente!', 'error')
                    }
                })
            } catch (error) {
                MyToast(toast, 'A sua senha atual está incorreta!', 'error')
            } finally {
                setLoading(false)
            }
        } else if (password.length < 6) {
            MyToast(toast, 'A nova senha deve ter pelo menos 6 caracteres!', 'error')
        } else if (password !== passwordConfirm) {
            MyToast(toast, 'A nova senha deve ser igual a sua confirmação!', 'error')
        }
        setOldPassword('')
        setPassword('')
        setPasswordConfirm('')
        setLoading(false)
    }

    return (
        <Flex w="100%" justify="center">
            <Header />
            <Flex
                align="center"
                direction="column"
                w={{ md: '70%', base: '100%' }}
                padding="40px"
                marginTop={10}
            >
                <Flex
                    padding="15px 10px"
                    w="100%"
                    align="center"
                    direction="column"
                    boxShadow="5px 5px 20px 3px gray"
                    border="1px solid white"
                    borderRadius={10}
                    bg="defaultColor.500"
                >
                    <PersonalAvatar />
                    {user.displayName === null || editProfile ? (
                        <Flex
                            w="100%"
                            align="center"
                            direction="column"
                            margin="0px 0px 20px 0px"
                            onKeyDown={(e) => KeyDown(e.code, 'username')}
                        >
                            <Input
                                w={{ base: '75%', md: '45%' }}
                                color="defaultColor.400"
                                variant="flushed"
                                placeholder="Defina aqui seu nome de usuário."
                                textAlign="center"
                                colorScheme="blackAlpha"
                                marginRight="5px"
                                onChange={(e) => setUserName(e.target.value)}
                                value={userName}
                            />
                            <Flex marginTop={2}>
                                <IconButton
                                    isRound
                                    variant="link"
                                    colorScheme="green"
                                    aria-label="Send"
                                    icon={<FcCheckmark />}
                                    marginRight="5px"
                                    onClick={() => updateProfile('username')}
                                />
                                <IconButton
                                    isRound
                                    variant="link"
                                    colorScheme="pink"
                                    arial-label="Erease"
                                    icon={<MdOutlineClear />}
                                    onClick={(e) => KeyDown('Escape')}
                                />
                            </Flex>
                        </Flex>
                    ) : (
                        <Flex w="100%" justify="center" margin="0px 0px 20px 0px">
                            <Heading color="defaultColor.400">{user.displayName}</Heading>
                            <IconButton
                                marginLeft="5px"
                                isRound
                                variant="ghost"
                                arial-label="Edit"
                                colorScheme="blackAlpha"
                                icon={<BiEditAlt color="white" />}
                                onClick={() => setEditProfile(true)}
                            />
                        </Flex>
                    )}

                    {user.emailVerified ? (
                        <Text color="green.400">{user.email}</Text>
                    ) : (
                        <Flex align="center" direction="column">
                            <Text color="red.400">{user.email}</Text>
                            <Text color="red.400">(Seu email não foi verificado!)</Text>
                            <Button
                                onClick={() => sendEmailVerify()}
                                colorScheme="green"
                                size="xs"
                            >
                                Clique aqui para verificar!
                            </Button>
                        </Flex>
                    )}
                </Flex>
                <Box
                    margin="30px 0px"
                    padding="15px 10px"
                    w="100%"
                    color="red.500"
                    border="1px solid "
                    borderRadius={10}
                    bg="red.100"
                    boxShadow="5px 5px 20px 3px pink"
                >
                    <Heading>Danger Zone</Heading>
                    {providerUser === 'password' ? (
                        <FormControl
                            onKeyDown={(e) => {
                                KeyDown(e.code, 'password')
                            }}
                            marginTop="15px"
                        >
                            <FormLabel htmlFor="senhaAntiga">
                                Digite a senha atual
                            </FormLabel>
                            <PasswordInput
                                borderColor="red"
                                isDisabled={loading}
                                id="senhaAntiga"
                                placeholder="Digite sua senha atual"
                                onChange={(e) => {
                                    setOldPassword(e.target.value)
                                }}
                                value={oldPassword}
                            />
                            <FormLabel htmlFor="senha">Crie uma nova senha:</FormLabel>
                            <PasswordInput
                                borderColor="red"
                                isDisabled={loading}
                                id="senha"
                                placeholder="Digite a nova senha"
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }}
                                value={password}
                            />
                            <FormLabel htmlFor="confirmaçãoSenha">
                                Confirme a nova senha:
                            </FormLabel>
                            <PasswordInput
                                borderColor="red"
                                isDisabled={loading}
                                id="confirmaçãoSenha"
                                placeholder="Digite a nova senha novamente"
                                onChange={(e) => {
                                    setPasswordConfirm(e.target.value)
                                }}
                                value={passwordConfirm}
                            />
                            <Button
                                isLoading={loading}
                                w="100%"
                                margin="10px 0px"
                                colorScheme="yellow"
                                onClick={() => changePass()}
                            >
                                MUDAR SENHA
                            </Button>
                        </FormControl>
                    ) : null}
                    <Button
                        w="100%"
                        margin="10px 0px"
                        colorScheme="red"
                        isLoading={loading}
                        onClick={onOpen}
                    >
                        DELETAR MINHA CONTA
                    </Button>
                </Box>
            </Flex>
            <DeleteModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        </Flex>
    )
}

export default Profile
