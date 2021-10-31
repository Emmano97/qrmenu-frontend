import React, { useEffect, useState, useContext } from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import { AiOutlineDelete, AiOutlineQrcode } from 'react-icons/ai';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import { UseParams, UseHistory } from 'react-router-dom';

import { fetchPlace, removeCategory, removePlace, removeMenuItem } from '../apis';
import AuthContext from '../contexts/AuthContext';
import MainLayout from '../layouts/MainLayout';
import { useHistory, useParams } from 'react-router';
import MenuItemForm from '../components/MenuItemForm';
import Panel from '../components/Panel';
import MenuItem from '../components/MenuItem';
import { toast } from 'react-toastify';
import QRCodeModal from '../components/QRCodeModal';

const Place = () => {
    const [place, setPlace] = useState({});
    const [qrcode, setQRCode] = useState(false)
    const [menuItemFormShow, setMenuItemFormShow] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState(null);

    const showModal = () => setMenuItemFormShow(true);
    const hideModal = () => setMenuItemFormShow(false);

    const showQRCodeModal = () => setQRCode(true);
    const hideQRCodeModal = () => setQRCode(false);


    const auth = useContext(AuthContext);

    const params = useParams();
    const history = useHistory();

    const onBack = () => history.push("/places");

    const onFetchPlace = async () => {
        const json = await fetchPlace(params.id, auth.token);
        if(json){
            setPlace(json);
        }
    }

    const onRemovePlace = async () => {
        const confirmed = window.confirm("Are you sure ?");
        if (confirmed){
            removePlace(params.id, auth.token).then(()=> {
                onBack();
                toast(`Place ${place.name} was removed`, {type: 'success'});
            }).catch(err => {
                toast(`Place ${place.name} can't be remove`, {type: 'error'});
            });
        }
    }

    const onRemoveCategory = (id) => {
        const confirmed = window.confirm("Are you sure ?");
        if (confirmed){
            removeCategory(id, auth.token).then(()=> {
                onFetchPlace();
                toast(`The Category was removed`, {type: 'success'});
            }).catch(err => {
                toast(`The Category can't be remove`, {type: 'error'});
            });
        }
    }

    const onRemoveMenuItem = (id) => {
        const confirmed = window.confirm("Are you sure ?");
        if (confirmed){
            removeMenuItem(id, auth.token).then(()=> {
                onFetchPlace();
                toast(`The Menu Item was removed`, {type: 'success'});
            }).catch(err => {
                toast(`The Menu Item can't be remove`, {type: 'error'});
            });
        }
    }

    useEffect(() => {
        onFetchPlace();
    }, []);

    return (
        <MainLayout>
            <Row>
                <Col lg={12}>
                    <div className="mb-4">
                        <div className="d-flex justify-content-between align-items-center">

                            <Button variant="link" onClick={onBack}>
                                <IoMdArrowBack size={25} color="black" />
                            </Button>

                            <h3 className="mb-0 ml-2 mr-2"> {place.name} </h3>

                            <Button className="float-right" variant='link' onClick={onRemovePlace}>
                                <AiOutlineDelete size={25} color="red" />
                            </Button>

                        </div>
                        <Button variant='link' onClick={showQRCodeModal}>
                            <AiOutlineQrcode size={25}  />
                        </Button>
                    </div>
                </Col>

                <Col md={4}>
                    <Panel>
                        <MenuItemForm place={place} onDone={onFetchPlace} />
                    </Panel>
                </Col>
                <Col md={8}>
                    {place?.categories?.map((category) => (
                        <div key={category.id} className="mb-5">
                            <div className="d-flex align-items-center mb-4">
                                <h4 className="mb-0 mr-2">
                                    <b>{category.name}</b>
                                </h4>
                                <Button variant="link" onClick={() => onRemoveCategory(category.id)}>
                                    <AiOutlineDelete size={25} color="red" />
                                </Button>
                            </div>
      
                            {category.menu_items.map((item) => (
                                <MenuItem 
                                    key={item.id}
                                    item={item}
                                    onEdit={() => {
                                        setSelectedMenuItem(item)
                                        showModal()
                                    }} 
                                    onRemove={() => onRemoveMenuItem(item.id)}
                                />
                            ))}
                        </div>
                    ))}
                </Col>
            </Row>

            <Modal show={menuItemFormShow} onHide={hideModal} centered>
                <Modal.Body>
                    <h4 className="text-center">Menu Item</h4>
                    <MenuItemForm 
                        place={place}
                        onDone={() =>{
                            onFetchPlace()
                            hideModal()
                        }}
                        item={selectedMenuItem} />
                </Modal.Body>
            </Modal>

            <QRCodeModal show={qrcode} onHide={hideQRCodeModal} place={place} centered />

        </MainLayout>
    )
}

export default Place;