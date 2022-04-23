import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import React from 'react'

function ValueInput(props) {
  return (
    <FormControl>
      <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
      <Input type="number" id={props.id} {...props} />
    </FormControl>
  )
}

export default ValueInput