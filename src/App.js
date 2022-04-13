import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import theme from 'themes/defaultThemes'

import AppRoutes from 'routes/routes'

function App() {
    return (
        <ChakraProvider theme={theme}>
            <AppRoutes />
        </ChakraProvider>
    )
}

export default App
