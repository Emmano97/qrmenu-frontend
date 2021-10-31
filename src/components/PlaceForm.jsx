import React, { useState, useContext } from "react";
import {Form, Button, Spinner} from 'react-bootstrap';
import ImageDropzone from "./ImageDropzone";
import { addPlace } from "../apis";
import AuthContext from "../contexts/AuthContext";

const PlaceForm = ({ onDone }) => {

    const [name, setName] = useState('');

    const [image, setImage] = useState('');

    const auth = useContext(AuthContext);

    const onFormSubmit = async (event) => {
        event.preventDefault();

        const json = await addPlace({name, image}, auth.token);

        if (json){
            setName('');
            setImage('');
            onDone();
        }
    }

    return (
        <> 
            <h4 className="text-center"> Place </h4>
            <Form onSubmit={(event) => onFormSubmit(event)}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter name" 
                        value={name} 
                        onChange={(event) => setName(event.target.value)} 
                    />
                </Form.Group>

                <Form.Group className="mt-4">
                    <Form.Label>Image</Form.Label>
                    <ImageDropzone value={image} onChange={setImage} />
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
                        ) : ("Add")
                    }
                </Button>
            </Form>
        </>
    )
}

export default PlaceForm;