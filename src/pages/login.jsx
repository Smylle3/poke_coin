import {
    Button,
    ButtonGroup,
    Center,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    IconButton,
    Image,
    Input,
    Stack,
    useToast
} from '@chakra-ui/react'
import { ImGoogle3, ImGithub, ImTwitter } from 'react-icons/im'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import backGroundImage from 'assets/backGroundImage.jpg'
import pokemonLogo from 'assets/logoImages/pokemonLogo.png'
import bitcoinLogo from 'assets/logoImages/bitcoinLogo.png'
import { useAuth } from 'context/authContext'
import {
    handleLogin,
    logInGitHub,
    logInGoogle,
    logInTwitter
} from 'functions/loginFunctions'
import PasswordInput from 'components/passwordInput'
import MyToast from 'components/myToast'

export default function Login() {
    const {
        logIn,
        loginWithGoogle,
        loginWithGitHub,
        loginWithTwitter
    } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [inputValidation, setInputValidation] = useState(true)
    const navigate = useNavigate()
    const toast = useToast()

    const keySubmit = (event) => {
        if (event.code === 'Enter' || event.code === 'NumpadEnter') {
            loginFunction('emailLogin')
        }
    }

    const loginFunction = (isProvider) => {
        setLoading(true)
        setPassword('')
        setEmail('')
        switch (isProvider) {
            case 'emailLogin':
                if (email.length === 0 || password.length === 0) {
                    setInputValidation(true)
                    MyToast(toast, 'Preencha todos os campos!', 'error')
                    setLoading(false)
                    return
                }
                handleLogin(
                    setLoading,
                    setError,
                    navigate,
                    logIn,
                    email,
                    password,
                    toast
                )
                break
            case 'googleLogin':
                logInGoogle(
                    setLoading,
                    setError,
                    navigate,
                    loginWithGoogle
                )
                break
            case 'githubLogin':
                logInGitHub(
                    setLoading,
                    setError,
                    navigate,
                    loginWithGitHub
                )
                break
            case 'twitterLogin':
                logInTwitter(
                    setLoading,
                    setError,
                    navigate,
                    loginWithTwitter
                )
                break
            default:
                console.log(error)
                break
        }
    }

    return (
        <Flex
            bg="defaultColor.500"
            w="full"
            h="100vh"
            justify="end"
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
                    LOGIN
                </Heading>
                <FormControl
                    color="defaultColor.400"
                    bg="defaultColor.500"
                    w="100%"
                    padding={5}
                    borderRadius={10}
                    margin="20px 0px 0px 0px"
                    border="2px solid White"
                    onKeyDown={(e) => {
                        keySubmit(e)
                    }}
                >
                    <FormLabel htmlFor="email">Email:</FormLabel>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Digite seu email"
                        margin="0px 0px 20px 0px"
                        bg="transparent"
                        color="defaultColor.400"
                        onChange={(e) => {
                            setInputValidation(false)
                            setEmail(e.target.value)
                        }}
                        value={email}
                    />
                    <FormLabel htmlFor="senha">Senha:</FormLabel>
                    <PasswordInput
                        id="senha"
                        placeholder="Digite sua senha"
                        onChange={(e) => {
                            setInputValidation(false)
                            setPassword(e.target.value)
                        }}
                        value={password}
                    />
                    <Button
                        isLoading={loading}
                        w="100%"
                        margin="20px 0px 0px 0px"
                        colorScheme="green"
                        onClick={() => loginFunction('emailLogin')}
                        isDisabled={inputValidation}
                    >
                        LOGIN
                    </Button>
                    <ButtonGroup w="100%" justifyContent="space-around">
                        <IconButton
                            isRound
                            isLoading={loading}
                            margin="10px 0px 20px 0px"
                            colorScheme="whiteAlpha"
                            onClick={() => loginFunction('googleLogin')}
                            icon={<ImGoogle3 size={25} />}
                            aria-label="Google Login"
                        />
                        <IconButton
                            isRound
                            isLoading={loading}
                            margin="10px 0px 20px 0px"
                            colorScheme="blackAlpha"
                            onClick={() => loginFunction('githubLogin')}
                            icon={<ImGithub size={25} />}
                            aria-label="GitHub Login"
                        />
                        <IconButton
                            isRound
                            isLoading={loading}
                            margin="10px 0px 20px 0px"
                            colorScheme="blue"
                            onClick={() =>
                                loginFunction('twitterLogin')
                            }
                            icon={<ImTwitter size={25} />}
                            aria-label="Twitter Login"
                        />
                    </ButtonGroup>
                    <Link to={'/cadastro'}>
                        <Button
                            isLoading={loading}
                            w="100%"
                            variant="outline"
                            colorScheme="whiteAlpha"
                        >
                            CADASTRAR
                        </Button>
                    </Link>
                    <Button
                        isLoading={loading}
                        w="100%"
                        margin="10px 0px"
                        variant="outline"
                        colorScheme="whiteAlpha"
                    >
                        <Link to={'/cadastro'}>ESQUECI A SENHA</Link>
                    </Button>
                </FormControl>
            </Center>
        </Flex>
    )
}
