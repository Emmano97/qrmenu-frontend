import React, { useMemo } from 'react';
import { Card, Col, Button } from 'react-bootstrap';
import OperationButton from './OperationButton';
import PaymentForm from './PaymentForm'

const ShoppingCart = ({ items, onAdd, onRemove, onPaymentDone }) => {

    const totalPrice = useMemo(
        () => items.map(item => item.quantity * item.price)
                    .reduce((a, b) => a + b, 0), 
    [items]);

    return (
        <>
            <h3 className='text-center mb-4'>
                <b>Your Order</b>
            </h3>
            <Card >
                <Card.Body>
                    {items.map(item => (
                        <div key={item.id} className="d-flex mb-4 align-items-center">
                            
                                <Col xs={6}>
                                    <img src={item.image} alt={item.name} width='auto' height={80} />
                                </Col>
                                <Col xs={2} className="text-center">
                                    <h5 className="mb-0">
                                        <b>{item.name}</b>
                                    </h5>
                                </Col>
                                <Col xs={2}>
                                    <span>${item.price}</span>
                                </Col>
                                <Col xs={2} >
                                    <div className='d-flex justify-content-end'>

                                        <OperationButton 
                                            variant='secondary'
                                            sixe='sm'
                                            onClick={() => onRemove(item)}
                                        > 
                                        -
                                        </OperationButton>

                                        <div className="d-flex align-items-center">
                                            <span>{item.quantity}</span>
                                        </div>

                                        <OperationButton 
                                            variant='secondary'
                                            sixe='sm'
                                            onClick={() => onAdd(item)}
                                        > 
                                        +
                                        </OperationButton>

                                    </div>
 
                                </Col>
                        
                        </div>
                    ))}

                    <hr />
                    <div className="d-flex mr-4 justify-content-between align-items-center">
                        <h5><b>Total</b></h5>
                        <Button disabled variant="outline-secondary"  size='lg'>
                            <h5 className='text-primary'><b>${totalPrice}</b></h5>
                        </Button>
                    </div>
                </Card.Body>
            </Card>

            <Card className='mt-4'> 
                <Card.Body>
                    <PaymentForm 
                        amount={totalPrice} 
                        items={items} 
                        onDone={onPaymentDone}
                    />
                </Card.Body>
            </Card>


        </>
    )

};

export default ShoppingCart;