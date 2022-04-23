import { ButtonGroup, IconButton, Stack, useToast } from '@chakra-ui/react'
import MyToast from 'components/myToast'
import { useAuth } from 'context/authContext'
import React from 'react'
import { FcCheckmark } from 'react-icons/fc'
import { IoMdClose } from 'react-icons/io'

import ValueMobileInput from './valueMobileInput'

function ValueMobileForm({ onCancel }) {
    const toast = useToast()
    const { setUserInitialValue, userInitialValue, updateData } = useAuth()

    const validateInicialValue = () => {
        if (userInitialValue === 0 || userInitialValue < 0) {
            MyToast(toast, 'Valor inválido', 'error')
            return
        }
        updateData()
        onCancel()
    }

    return (
        <Stack spacing={5}>
            <ValueMobileInput
                label="Definir valor da sua carteira:"
                id="first-name"
                placeholder="$ X,XX"
                onChange={(e) => setUserInitialValue(e.target.value)}
            />
            <ButtonGroup d="flex" justifyContent="space-around">
                <IconButton
                    icon={<IoMdClose size={35} color="red"/>}
                    colorScheme="blackAlpha"
                    size="lg"
                    isRound
                    onClick={onCancel}
                    border="2px solid red"
                />
                <IconButton
                    icon={<FcCheckmark size={30}/>}
                    colorScheme="blackAlpha"
                    size="lg"
                    isRound
                    onClick={validateInicialValue}
                    border="2px solid green"
                />
            </ButtonGroup>
        </Stack>
    )
}

export default ValueMobileForm
