import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
    Link
} from '@chakra-ui/react'
import { ImGithub, ImLinkedin2 } from 'react-icons/im'
import { IoIosCloseCircleOutline } from 'react-icons/io'

const AboutUs = (props) => {
    return (
        <Modal
            isOpen={props.isOpen}
            onClose={props.onClose}
            size="xl"
            scrollBehavior="outside"
        >
            <ModalOverlay
                bg="blackAlpha.500"
                backdropFilter="blur(10px) hue-rotate(0deg)"
            />
            <ModalContent>
                <ModalHeader>Sobre Desenvolvedor</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text textAlign="justify">
                        Olá, bem vindo ao PokeCoin, sou João Pedro,
                        tenho 22 anos e estudo engenharia de computação,
                        você pode ver meus perfils, no LinkedIn e no
                        GitHub pela Header do site.
                    </Text>
                </ModalBody>
                <ModalHeader>Contextualizando o PokeCoin</ModalHeader>
                <ModalBody>
                    <Text textAlign="justify">
                        Este é o PokeCoin, um projetinho pessoal que
                        estou desenvolvendo para adquirir mais
                        conhecimentos na área de desenvolvimento Web, em
                        especial React. Esse é oficialmente meu primeiro
                        projeto.
                        <br />
                        <br />
                        Estou desenvolvendo desde o dia 01 de abril de
                        2021, a ideia veio atraves de teste técnico em
                        um processo seletivo para estágio do qual eu
                        participei, a principio se tratava de um
                        aplicação extremamente simples e básica mas a
                        medida que eu trabalhava nela criei um carinho
                        muito grande pela mesma gerando assim interesse
                        em desenvolver novas features e implementar
                        atualizações.
                        <br />
                        <br />
                        Todos os códigos de desenvolvimentos estão
                        disponiveis no respositório do projeto no GitHub
                        e podem ser acessados livrimente.
                    </Text>
                </ModalBody>
                <ModalHeader>Sobre o desenvolvimento</ModalHeader>
                <ModalBody>
                    <Text textAlign="justify">
                        Como já foi mencionado, estou desenvolvendo está
                        aplicação desde 01 de abril de 2022, meu
                        objetivo com ela é aprender mais dessa área de
                        trabalho do qual sou apaixonado e estudo desde
                        2021.
                        <br />
                        <br />A PokeCoin foi desenvolvida utilizando o
                        framework para JavaScript, ReactJs na
                        estilização utilizei o ChakraUi, uma biblioteca
                        de componentes, consumi as seguintes APIs de
                        dados, para pokemons a pokeAPI e para a cotação
                        utilizei a API da coinbase, para o
                        desenvolvimento do banco de dados e a
                        estruturação do backend utilizei o Firebase da
                        Google.
                    </Text>
                </ModalBody>
                <ModalHeader>Sobre as funcionalidades</ModalHeader>
                <ModalBody>
                    <Text textAlign="justify">
                        Este App é para os apaixonados pelo universo
                        Pokemon, aqui você simula atravez de pokemons,
                        como o valor da moeda digital BitCoin valorizou
                        ou não em relação ao dolar americano, você pode
                        comprar/adicionar o pokemon a sua carteira e
                        assim, bom base na sua "Base de Experiencia" ele
                        recebe um valor em BitCoin que é convertido em
                        Dollar e apresentado ao usuário.
                        <br />
                        <br />
                        Também é possivel vender o pokemon que o usuário
                        possui e tudo fica registrado no histórico de
                        compras de cada usuário. Quanto a autenticação,
                        é possivel fazer login via email e senha,
                        Google, Github e Twitter, todas as informações
                        estão seguras e de acordo com a politica de
                        privacidade de cada provedor.
                    </Text>
                </ModalBody>
                <ModalFooter justifyContent="space-between">
                    <Link
                        href="https://www.linkedin.com/in/jo%C3%A3o-pedro-smylle/"
                        isExternal
                    >
                        <Button
                            leftIcon={<ImLinkedin2 />}
                            colorScheme="linkedin"
                        >
                            Perfil LinkedIn
                        </Button>
                    </Link>
                    <Link
                        href="https://github.com/Smylle3/poke_coin"
                        isExternal
                    >
                        <Button
                            leftIcon={<ImGithub />}
                            colorScheme="blackAlpha"
                        >
                            Rep Git
                        </Button>
                    </Link>
                    <Button
                        leftIcon={<IoIosCloseCircleOutline />}
                        colorScheme="red"
                        mr={3}
                        onClick={props.onClose}
                    >
                        Fechar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
export default AboutUs
