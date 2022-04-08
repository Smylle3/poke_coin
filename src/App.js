import React from 'react'
import Profile from 'pages/profile'
import { ChakraProvider } from '@chakra-ui/react'
import theme from 'themes/defaultThemes'

function App() {

    return (
        <ChakraProvider theme={theme}>
            <Profile />
        </ChakraProvider>
    )
}

export default App
