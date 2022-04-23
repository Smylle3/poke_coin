import { Button, ButtonGroup, Stack, useToast } from '@chakra-ui/react'
import MyToast from 'components/myToast'
import { useAuth } from 'context/authContext'
import React from 'react'
import MyInput from './myInput'

function MyForm({ onCancel }) {
    const toast = useToast()
    const { setUserInitialValue, userInitialValue, updateData } = useAuth()

    const validateInicialValue = () => {
        if(userInitialValue === 0 || userInitialValue < 0){
            MyToast(toast, 'Valor inválido', 'error')
            return
        }
        updateData()
        onCancel()
    }

    return (
        <Stack spacing={5}>
            <MyInput
                label="Definir valor da sua carteira:"
                id="first-name"
                placeholder="$ X,XX"
                onChange = {(e) => setUserInitialValue(e.target.value)}
            />
            <ButtonGroup d="flex" justifyContent="flex-end">
                <Button colorScheme="red" onClick={onCancel}>
                    Cancel
                </Button>
                <Button onClick={validateInicialValue} colorScheme="green">
                    Save
                </Button>
            </ButtonGroup>
        </Stack>
    )
}

export default MyForm
