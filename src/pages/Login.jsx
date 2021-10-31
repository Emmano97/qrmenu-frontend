import React, { useState, useEffect, useContext } from 'react';
import {Button, Col, Form, Row, Card, Spinner} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AuthContext from '../contexts/AuthContext';


const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();
    const auth = useContext(AuthContext);

    useEffect(() => {
        if(auth.token){
            history.replace('/places');
        }
    })

    const onFormSubmit = (event) => {
        event.preventDefault();
        console.log(auth, auth.signIn)
        auth.signIn(username, password, () => history.replace('/places'));
    }

    return (
        <MainLayout> 
            <Row className="justify-content-center ">
                <Col lg={6} md={8}>
                    <Card>
                        <Card.Body>
                            <h3 className="text-center">
                                <b>LOGIN</b>
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
                                        ) : ("Sign In")
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

export default Login