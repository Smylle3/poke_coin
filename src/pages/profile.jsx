import React, { useState } from 'react'
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    IconButton,
    Image,
    Input,
    Text,
    Textarea
} from '@chakra-ui/react'
import Header from 'components/header'
import PasswordInput from 'components/passwordInput'
import { useAuth } from 'context/authContext'
import { FcCheckmark } from 'react-icons/fc'
import { MdOutlineClear, MdCameraAlt } from 'react-icons/md'
import { BiEditAlt } from 'react-icons/bi'

const Profile = () => {
    const { user } = useAuth()
    const [userName, setUserName] = useState('')
    const [editProfile, setEditProfile] = useState(null)

    return (
        <Flex w="100%" h="100%" direction="column">
            <Header />
            <Flex h="6vh" />
            <Flex
                w="100%"
                h="93%"
                bg="defaultColor.400"
                display={{ md: 'flex' }}
                justifyContent="center"
            >
                <Box
                    w={{ base: 'full', md: '70%' }}
                    align="center"
                    flexDirection="column"
                    h="100%"
                    bg="defaultColor.500"
                    padding={10}
                >
                    <Image
                        borderRadius="full"
                        boxSize="200px"
                        src={user.photoURL}
                        alt={user.displayName}
                        margin="0px 0px 30px 0px"
                    />
                    <Button
                        leftIcon={<MdCameraAlt />}
                        colorScheme="whiteAlpha"
                        variant="outline"
                        marginBottom="20px"
                    >
                        Mudar imagem de perfil
                    </Button>
                    {user.displayName === null || editProfile ? (
                        <Flex
                            w="100%"
                            justify="center"
                            margin="0px 0px 20px 0px"
                        >
                            <Input
                                w={{ base: '75%', md: '50%' }}
                                color="defaultColor.400"
                                variant="flushed"
                                placeholder="Defina aqui seu nome de usuário."
                                textAlign="center"
                                colorScheme="blackAlpha"
                                marginRight="5px"
                                onChange={(e) => {
                                    setUserName(e.target.value)
                                }}
                                value={userName}
                            />
                            <IconButton
                                isRound
                                variant="outline"
                                colorScheme="teal"
                                aria-label="Send"
                                icon={<FcCheckmark />}
                                marginRight="5px"
                            />
                            <IconButton
                                isRound
                                variant="outline"
                                colorScheme="pink"
                                arial-label="Erease"
                                icon={<MdOutlineClear />}
                            />
                        </Flex>
                    ) : (
                        <Flex
                            w="100%"
                            justify="center"
                            margin="0px 0px 20px 0px"
                        >
                            <Heading color="defaultColor.400">
                                {user.displayName}
                            </Heading>
                            <IconButton
                                variant="ghost"
                                arial-label="Edit"
                                colorScheme="whiteAlpha"
                                icon={<BiEditAlt />}
                                onClick={() => setEditProfile(true)}
                            />
                        </Flex>
                    )}

                    {user.emailVerified ? (
                        <Text color="defaultColor.400">
                            {user.email}
                        </Text>
                    ) : (
                        <Text color="red.400">
                            {user.email} (Seu email não foi verificado!)
                        </Text>
                    )}

                    <Textarea
                        marginTop="30px"
                        placeholder="Descreva-se"
                        resize="vertical"
                        isDisabled
                    />

                    <Box
                        margin="30px 0px"
                        padding="15px 10px"
                        w="100%"
                        color="red.500"
                        border="1px solid "
                        borderRadius={10}
                    >
                        <Heading>Danger Zone</Heading>
                        <FormControl
                            onKeyDown={(e) => {}}
                            marginTop="15px"
                        >
                            <FormLabel htmlFor="senhaAntiga">
                                Digite a senha atual
                            </FormLabel>
                            <PasswordInput
                                id="senhaAntiga"
                                placeholder="Digite sua senha atual"
                                onChange={(e) => {}}
                            />
                            <FormLabel htmlFor="senha">
                                Crie uma nova senha:
                            </FormLabel>
                            <PasswordInput
                                id="senha"
                                placeholder="Digite a nova senha"
                                onChange={(e) => {}}
                            />
                            <FormLabel htmlFor="confirmaçãoSenha">
                                Confirme a nova senha:
                            </FormLabel>
                            <PasswordInput
                                id="confirmaçãoSenha"
                                placeholder="Digite a nova senha novamente"
                                onChange={(e) => {}}
                            />
                            <Button
                                w="100%"
                                margin="10px 0px"
                                colorScheme="yellow"
                            >
                                MUDAR SENHA
                            </Button>
                        </FormControl>
                        <Button
                            w="100%"
                            margin="10px 0px"
                            colorScheme="red"
                        >
                            DELETAR MINHA CONTA
                        </Button>
                    </Box>
                </Box>
            </Flex>
        </Flex>
    )
}

export default Profile
