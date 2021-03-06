import { Grid, GridItem, Image } from '@chakra-ui/react'
import React from 'react'

export default function MyTable(props) {
    return (
        <Grid
            templateColumns="repeat(4, 1fr)"
            gap={0}
            w={props.Width}
            margin="2px 0px"
            onClick={props.onClick}
        >
            <GridItem
                display="flex"
                alignItems="center"
                justifyContent="center"
                h="10"
                w="full"
                border="1px solid #222224"
                borderRight="0 none"
                borderTopLeftRadius="5"
                borderBottomLeftRadius="5"
                color={props.Color}
                bg={props.BGColor}
            >
                {props.Avatar === null ? (
                    <>Avatar</>
                ) : (
                    <Image name={props.Name} src={props.Avatar} boxSize={50} />
                )}
            </GridItem>
            <GridItem
                display="flex"
                alignItems="center"
                justifyContent="center"
                h="10"
                w="full"
                border="1px solid #222224"
                borderRight="0 none"
                borderLeft="0 none"
                color={props.Color}
                bg={props.BGColor}
            >
                {props.Nome === null ? <>Nome</> : props.Nome}
            </GridItem>
            <GridItem
                display="flex"
                alignItems="center"
                justifyContent="center"
                h="10"
                w="full"
                border="1px solid #222224"
                borderRight="0 none"
                borderLeft="0 none"
                color={props.Color}
                bg={props.BGColor}
            >
                {props.Action === null ? <>Compra/Venda</> : props.Action}
            </GridItem>
            <GridItem
                display="flex"
                alignItems="center"
                justifyContent="center"
                h="10"
                w="full"
                border="1px solid #222224"
                borderLeft="0 none"
                borderTopRightRadius="5"
                borderBottomRightRadius="5"
                color={props.Color}
                bg={props.BGColor}
            >
                {props.Valor === null ? <>Valor</> : props.Valor}
            </GridItem>
        </Grid>
    )
}
