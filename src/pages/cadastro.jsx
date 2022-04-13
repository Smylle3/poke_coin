import {
    Button,
    Center,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Image,
    Input,
    Stack,
    useToast
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import backGroundImage from 'assets/backGroundImage2.jpg'
import pokemonLogo from 'assets/logoImages/pokemonLogo.png'
import bitcoinLogo from 'assets/logoImages/bitcoinLogo.png'
import { useAuth } from 'context/authContext'
import MyToast from 'components/myToast'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { createUser } = useAuth()
    const toast = useToast()
    const navigate = useNavigate()

    const handleSignUp = async (event) => {
        if (password === passwordConfirm) {
            setLoading(true)
            event.preventDefault()
            setError('')
            try {
                await createUser(email, password)
                navigate('/')
            } catch (err) {
                setError(err.message)
                console.log(error)
            } finally {
                setLoading(false)
            }
        } else {
            MyToast(toast, "As senhas devem ser iguais!", "error")
        }
    }

    return (
        <Flex
            bg="defaultColor.500"
            w="full"
            h="100vh"
            bgImage={backGroundImage}
            bgPosition="center"
            bgRepeat="no-repeat"
            bgSize="cover"
        >
            <Center
                w="25%"
                minW="300px"
                h="100vh"
                flexDirection="column"
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    margin={10}
                >
                    <Image h={75} alt="Pokemon" src={pokemonLogo} />
                    <Image h={65} alt="Bitcoin" src={bitcoinLogo} />
                </Stack>
                <Heading color="defaultColor.400" fontFamily="body">
                    CADASTRO
                </Heading>
                <FormControl
                    color="defaultColor.400"
                    bg="defaultColor.500"
                    w="100%"
                    padding={5}
                    borderRadius={10}
                    isRequired
                    margin="20px 0px 0px 0px"
                    border="2px solid White"
                >
                    <FormLabel htmlFor="email">Email:</FormLabel>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Digite seu Email"
                        margin="0px 0px 20px 0px"
                        bg="defaultColor.400"
                        color="defaultColor.500"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <FormLabel htmlFor="senha">
                        Crie uma senha:
                    </FormLabel>
                    <Input
                        id="senha"
                        type="password"
                        placeholder="Digite sua senha"
                        margin="0px 0px 20px 0px"
                        bg="defaultColor.400"
                        color="defaultColor.500"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <FormLabel htmlFor="senha">
                        Confirme a sua senha:
                    </FormLabel>
                    <Input
                        id="confirmaçãoSenha"
                        type="password"
                        placeholder="Digite sua senha novamente"
                        bg="defaultColor.400"
                        color="defaultColor.500"
                        onChange={(e) =>
                            setPasswordConfirm(e.target.value)
                        }
                        value={passwordConfirm}
                    />
                    <Button
                        isLoading={loading}
                        loadingText="Aguarde"
                        w="100%"
                        margin="20px 0px"
                        colorScheme="yellow"
                        onClick={handleSignUp}
                    >
                        CADASTRAR
                    </Button>
                    <Link to={'/login '}>
                        <Button
                            w="100%"
                            variant="outline"
                            colorScheme="whiteAlpha"
                        >
                            CLIQUE AQUI PARA LOGAR
                        </Button>
                    </Link>
                </FormControl>
            </Center>
        </Flex>
    )
}