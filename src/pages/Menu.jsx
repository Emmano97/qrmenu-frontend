import { Container, Row, Col, Button } from "react-bootstrap";
import { IoCheckmarkOutline, IoArrowBack } from 'react-icons/io5';
import OrderButton from "../components/OrderButton";
import ShoppingCart from "../components/ShoppingCart";
import { useParams, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { fetchPlace } from "../apis";

import MenuList from '../components/MenuList';
import { useMemo } from "react";

const Menu = () => {
    const [shoppingCart, setShoppingCart] = useState({});
    const [showShoppingCart, setShowShoppingCart] = useState(false);

    const [place, setPlace] = useState({});
    const params = useParams();
    const history = useHistory();

    const totalQuantity = useMemo(() => Object.keys(shoppingCart)
        .map((i) => shoppingCart[i].quantity)
        .reduce((a, b) => a + b, 0),
        [shoppingCart]
    );

    const onBack = () => history.push(`/places/${params.id}`);

    const onFetchPlace = async () => {
        const json = await fetchPlace(params.id);
        if(json){
            setPlace(json);
        }
    }

    const onAddItemToShoppingCart = (item) => {
        setShoppingCart({
            ...shoppingCart,
            [item.id]: {
                ...item,
                quantity: (shoppingCart[item.id]?.quantity || 0) + 1,
            }
        });
    }

    const onPaymentDone = (item) => {
        setShoppingCart({});
        setShowShoppingCart(false);
    }

    const onRemoveItemToShoppingCart = (item) => {
        if(totalQuantity === 0){
            setShowShoppingCart(false);
        }
        setShoppingCart({
            ...shoppingCart,
            [item.id]: {
                ...item,
                quantity: (shoppingCart[item.id]?.quantity || 0) - 1,
            }
        });
    }

    useEffect(() => {
        onFetchPlace();
    }, []);

    return (
        <Container className="mt-5 mb-5">
            <Row className="justify-content-center">
                <Col lg={8}>
                    {showShoppingCart? (

                        <ShoppingCart items={Object.keys(shoppingCart)
                            .map((key) => shoppingCart[key])
                            .filter((item) => item.quantity > 0)} 
                            onAdd={onAddItemToShoppingCart}
                            onRemove={onRemoveItemToShoppingCart}
                            onPaymentDone={onPaymentDone}
                            color={place.color}
                            />

                    ) : (
                        <MenuList 
                            place={place} 
                            shoppingCart={shoppingCart} 
                            onOrder={onAddItemToShoppingCart}
                            onBack={onBack}
                            color={place.color}
                            font={place.font}
                        />
                    )}
 

                </Col>
            </Row>
            {totalQuantity? (
                <OrderButton 
                    variant="outline-success" 
                    style={{ backgroundColor: place.color }}
                    onClick={() => setShowShoppingCart(!showShoppingCart)}
                >
                    {showShoppingCart ? <IoCheckmarkOutline size={25} /> : totalQuantity}

                </OrderButton>      
            ) : null}
        </Container>
    )
}

export  default Menu;