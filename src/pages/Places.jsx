import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {Row, Col, Modal} from 'react-bootstrap';
import MainLayout from '../layouts/MainLayout';
import { fetchPlaces} from '../apis'
import AuthContext from '../contexts/AuthContext';
import Place from '../components/StyledPlace';
import PlaceForm from '../components/PlaceForm';
import AddPlaceButton from '../components/AddPlaceButton';


const Places = () => {

    const history = useHistory();

    const [places, setPlaces] = useState([]);

    const [show, setShow] = useState(false);
    
    const auth = useContext(AuthContext);

    const onHide = () => setShow(false);

    const onShow = () => setShow(true);

    const onDone = () => {
        onFetchPlaces();
        onHide();
    }

    const onFetchPlaces = async () => {
        const json = await fetchPlaces(auth.token);
        if(json){
            setPlaces(json);
        }
    };

    useEffect(() => {
        onFetchPlaces();
    })

    return (
        <MainLayout> 
            <h3>My Places</h3>
            <Modal show={show} onHide={onHide} centered>
                <Modal.Body>
                    <PlaceForm onDone={onDone} />
                </Modal.Body>
            </Modal>
            <Row>
                {places.map((place) => (
                    <Col onClick={() => history.push(`/places/${place.id}`)} key={place.id} lg={4}>
                        <Place>
                            <div style={{backgroundImage: `url(${place.image})`}}></div>
                            <p>{place.name}</p>
                        </Place>
                    </Col>
                ))}

                <Col lg={4}>
                    <AddPlaceButton onClick={onShow}>Add new Place</AddPlaceButton>
                </Col>

            </Row>
            
        </MainLayout>
    )
}

export default Places;