import React, { useEffect, useState, useContext } from 'react'
import MainLayout from '../layouts/MainLayout'
import {Button, Col, Form, Row, Card, Spinner} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';


const Register = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();
    const auth = useContext(AuthContext);

    useEffect(() => {
        if(auth.token){
            history.replace('/login');
        }
    })

    const onFormSubmit = (event) => {
        event.preventDefault();
        auth.register(username, password, () => history.replace('/login'));
    }

    return (
        <MainLayout> 
            <Row className="justify-content-center ">
                <Col lg={6} md={8}>
                    <Card>
                        <Card.Body>
                            <h3 className="text-center">
                                <b>REGISTER</b>
                            </h3>
                            <Form onSubmit={(event) => onFormSubmit(event)}>
                                <Form.Group>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter Username" 
                                        value={username} 
                                        onChange={(event) => setUsername(event.target.value)} 
                                    />
                                </Form.Group>

                                <Form.Group className="mt-4">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control 
                                        type="password"
                                        value={password} 
                                        onChange={(event) => setPassword(event.target.value)} 
                                    />
                                </Form.Group>

                                <Button type="submit" className="mt-4 btn-std mx-auto d-block" disabled={auth.loading}>
                                    {
                                        auth.loading ? (
                                            <Spinner 
                                                variant="primary"
                                                as='span'
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true" 
                                            />
                                        ) : ("REGISTER")
                                    }
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>

                </Col>

            </Row>
        </MainLayout>
    )
}

export default Register