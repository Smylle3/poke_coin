import React, { useState } from 'react'
import {
    Button,
    Center,
    FormControl,
    FormLabel,
    Heading,
    Image,
    Input,
    Stack
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import pokemonLogo from 'assets/logoImages/pokemonLogo.png'
import bitcoinLogo from 'assets/logoImages/bitcoinLogo.png'

function RequestPass() {
    const [email, setEmail] = useState('')

    const passRecovery = () => {
        console.log(email)
        setEmail('')
    }

    return (
        <Center
            bg="defaultColor.500"
            w="full"
            h="100vh"
            justify="end"
            bgPosition="center"
            bgRepeat="no-repeat"
            bgSize="cover"
        >
            <Center w="25%" minW="300px" h="100vh" flexDirection="column">
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
                    RECUPERAR SENHA
                </Heading>
                <FormControl
                    color="defaultColor.400"
                    bg="defaultColor.500"
                    w="100%"
                    padding={5}
                    borderRadius={10}
                    margin="20px 0px 0px 0px"
                    border="2px solid White"
                >
                    <FormLabel htmlFor="email">Email:</FormLabel>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Digite seu email"
                        margin="0px 0px 20px 0px"
                        bg="transparent"
                        color="defaultColor.400"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <Button
                        w="100%"
                        margin="20px 0px 0px 0px"
                        colorScheme="green"
                        onClick={() => passRecovery()}
                    >
                        ENVIAR EMAIL DE RECUPERAÇÃO
                    </Button>
                    <Link to={'/login'}>
                        <Button
                            w="100%"
                            variant="outline"
                            colorScheme="whiteAlpha"
                            margin="20px 0px 0px 0px"
                        >
                            LEMBROU A SENHA? FAÇA LOGIN
                        </Button>
                    </Link>
                </FormControl>
            </Center>
        </Center>
    )
}

export default RequestPass
