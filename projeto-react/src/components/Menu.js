import React, { useState} from "react";
import { Button, Container, Row, Col, Form, FormGroup, FormLabel, FormControl, Card, CardGroup } from 'react-bootstrap';
import CardHeader from "react-bootstrap/esm/CardHeader";

function Menu() {

    const [ data, setData] = useState({
        image: '',
        nome: '',
        email: '',
        senha: '',
    });

    const valorInput = e => setData ({
        ...data, [e.target.name]: e.target.value  
    });

    const inputFile = e => setData ({
        ...data, [e.target.name]: e.target.files[0] 
    });

    const newUser = e => {
        e.preventDefault();
        console.log(data);
    }

    return(
        <Container fluid>
            <Row> 
                <CardGroup>
                    <Card>
                        <CardHeader>Cadastro</CardHeader>
                        <Form onSubmit={newUser}>

                            <FormGroup as={Row} className="mb-3">
                                <FormLabel column sm="2">
                                Nome
                                </FormLabel>
                                <Col sm="10">
                                <FormControl type="text" name="nome" placeholder="digite seu nome" onChange={valorInput} />
                                </Col>
                            </FormGroup>

                            <FormGroup as={Row} className="mb-3">
                                <FormLabel column sm="2">
                                E-mail
                                </FormLabel>
                                <Col sm="10">
                                <FormControl type="email" name="email" placeholder="digite seu email" onChange={valorInput} />
                                </Col>
                            </FormGroup>

                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Avatar</Form.Label>
                                <Form.Control type="file" name="imagem" onChange={inputFile} />
                            </Form.Group>

                            <FormGroup as={Row} className="mb-3">
                                <FormLabel column sm="2">
                                Password
                                </FormLabel>
                                <Col sm="10">
                                <FormControl type="password" name="senha" placeholder="digite sua senha" onChange={valorInput} />
                                </Col>
                            </FormGroup>

                            <Button type="submit" variant="primary">Cadastrar</Button>
                        </Form>  
                    </Card>
                </CardGroup>
            </Row>
        </Container>
    );
}

export default Menu;