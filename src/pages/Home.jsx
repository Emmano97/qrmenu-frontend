import React from 'react'
import { Button, Jumbotron, Container, Row, Col, Image } from 'react-bootstrap'
import MainLayout from '../layouts/MainLayout'


const Home = () => {
    return (
        <MainLayout>
            <Jumbotron className="bg-light">
                <Container>
                    <Row>
                        <Col md={6} className="my-auto">
                            <h1><b>QR Code Menu</b></h1>
                            <h5 className="mt-4 mb-4">
                                A smart way  to share your digital menu in a QR code with the world.
                            </h5>
                            <br />
                            <Button href="/places" variant="primary" size="lg">Create Menu</Button>
                        </Col>
                        <Col md={6}>
                            <Image src="https://cdn.dribbble.com/users/997070/screenshots/4692707/foodapp-login.gif" rounded fluid />
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
        </MainLayout>
    )
}

export default Home