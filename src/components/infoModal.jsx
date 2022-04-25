import {
    Button,
    CircularProgress,
    CircularProgressLabel,
    Flex,
    Grid,
    Heading,
    Image,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text
} from '@chakra-ui/react'
import React from 'react'

function InfoModal({
    isOpenInfo,
    setIsOpenInfo,
    onClose,
    infoPokemon,
    setInfoPokemon,
    infoTimePokemon 
}) {
    if (!infoPokemon) {
        return null
    } else {
        const bgColor = infoPokemon.types[0].type.name

        return (
            <Modal isOpen={isOpenInfo} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent margin={10} bg="defaultColor.500">
                    <ModalHeader
                        color={`bgPokedex.${bgColor}`}
                        display="flex"
                        justifyContent="center"
                    >
                        <Heading>{infoPokemon.name.toUpperCase()}</Heading>
                    </ModalHeader>
                    <ModalBody>
                        <Flex align="center" direction="column" justify="center">
                            <Flex
                                borderRadius={10}
                                bg={`bgPokedex.${bgColor}`}
                                w="100%"
                                margin="0px 0px 25px 0px"
                                padding={25}
                                justify="center"
                            >
                                <Image
                                    name={infoPokemon.name}
                                    src={
                                        infoPokemon.sprites.other.dream_world
                                            .front_default
                                    }
                                />
                            </Flex>
                            <Flex padding="2px 7px" justify="space-around" w="100%">
                                {infoPokemon.types.map((types) => (
                                    <Text
                                        key={types.slot}
                                        textAlign="center"
                                        w="100px"
                                        borderRadius={25}
                                        bg={`bgPokedex.${types.type.name}`}
                                        color="defaultColor.500"
                                        boxShadow="2px 2px 5px 0px black"
                                    >
                                        {types.type.name.toUpperCase()}
                                    </Text>
                                ))}
                            </Flex>
                            <Flex
                                w="100%"
                                margin={1}
                                fontSize="22px"
                                color={`bgPokedex.${bgColor}`}
                                borderBottom="1px solid"
                                padding={1}
                                align="center"
                                direction="column"
                                justify="space-around"
                            >
                                <Text>Habilidades</Text>
                                <Flex justify="space-around" w="100%" marginTop={2}>
                                    {infoPokemon.abilities.map((abilities) => (
                                        <Text key={abilities.slot}>
                                            {abilities.ability.name.toUpperCase()}
                                        </Text>
                                    ))}
                                </Flex>
                            </Flex>
                            <Flex
                                w="100%"
                                justify="space-around"
                                margin={1}
                                fontSize="22px"
                                color={`bgPokedex.${bgColor}`}
                                borderBottom="1px solid"
                                padding={1}
                            >
                                <Flex direction="column" align="center">
                                    <Text>{infoPokemon.height}</Text>
                                    <Text>Altura</Text>
                                </Flex>
                                <Flex direction="column" align="center">
                                    <Text>{infoPokemon.weight}</Text>
                                    <Text>Massa</Text>
                                </Flex>
                            </Flex>
                            <Flex
                                w="100%"
                                direction="column"
                                align="center"
                                marginBottom={5}
                                fontSize="22px"
                                color={`bgPokedex.${bgColor}`}
                                borderBottom="1px solid"
                                padding={1}
                            >
                                <Text>{infoPokemon.base_experience}</Text>
                                <Text>Experiência</Text>{' '}
                            </Flex>
                            <Grid templateColumns="repeat(3, 1fr)" gap={5}>
                                {infoPokemon.stats.map((stats) => (
                                    <Flex
                                        direction="column"
                                        align="center"
                                        color={`trackColor.${stats.stat.name}`}
                                        key={stats.stat.name.length}
                                    >
                                        <CircularProgress
                                            value={stats.base_stat}
                                            size="70px"
                                            color={`trackColor.${stats.stat.name}`}
                                            trackColor="transparent"
                                        >
                                            <CircularProgressLabel>
                                                {stats.base_stat}
                                            </CircularProgressLabel>
                                        </CircularProgress>
                                        <Text textAlign="center">{stats.stat.name}</Text>
                                    </Flex>
                                ))}
                            </Grid>
                            <Flex
                                color={`bgPokedex.${bgColor}`}
                                borderTop="1px solid"
                                w="100%"
                                direction="column"
                                align="center"
                                marginTop={5}
                            >
                                <Heading>Informações técnicas</Heading>
                                <Flex w="100%" justify="space-between">
                                    <Text>Data da compra</Text>
                                    <Text>{infoTimePokemon.date}</Text>
                                </Flex>
                                <Flex w="100%" justify="space-between">
                                    <Text>Hora da compra</Text>
                                    <Text>{infoTimePokemon.hour}</Text>
                                </Flex>
                                <Flex w="100%" justify="space-between">
                                    <Text>Valor da compra</Text>
                                    <Text>$ {infoTimePokemon.buy}</Text>
                                </Flex>
                            </Flex>
                        </Flex>
                    </ModalBody>

                    <ModalFooter display="flex" justifyContent="space-between">
                        <Button
                            onClick={() => {
                                setIsOpenInfo(false)
                                setInfoPokemon(null)
                            }}
                            colorScheme="green"
                            w="100%"
                        >
                            FECHAR
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        )
    }
}

export default InfoModal
