import {Navbar, Nav, Container} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
import React, {useContext} from 'react'
import AuthContext from '../contexts/AuthContext'


const MainLayout = ({children}) => {

    const auth = useContext(AuthContext)

    const history = useHistory();

    const onSignIn = () => {
        history.replace("/login");
    }

    const onSignUp = () => {
        history.replace("/register");
    }

    const onSignOut = () => {
        auth.signOut()
        history.replace("/login");
    }



    const goToPlaces = () => {
        history.push("/places")
    }

    return (
        <>
            <Navbar bg='light' variant='light' className="mb-4">
                <div className="container">
                    <Navbar.Brand href="/">QR Menu</Navbar.Brand>

                    <Nav className="flex-grow-1 justify-content-start">
                        <Nav.Link onClick={goToPlaces}> Places </Nav.Link>
                    </Nav>

                    <Nav className="flex-grow-1 justify-content-end">
                        {
                            auth.token?
                            ( <Nav.Link onClick={onSignOut}> Logout </Nav.Link> ):
                            (
                                [
                                    <Nav.Link key={1} onClick={onSignIn}> Login </Nav.Link>,
                                    <Nav.Link key={2} onClick={onSignUp}> Register </Nav.Link>
                                ]
                            )
                        }

                    </Nav>
                </div>
            </Navbar>
            <Container>
                {children}
            </Container>
        </>
    )
}

export default MainLayout