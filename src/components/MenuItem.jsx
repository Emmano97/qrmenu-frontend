import { Col, Button } from 'react-bootstrap';
import React from 'react';
import {Container as StyledContainer}  from './Container';
import {BiEdit} from 'react-icons/bi';
import {AiOutlineDelete} from 'react-icons/ai';


const MenuItem = ({ item, onEdit, onRemove }) => (
    <StyledContainer active={item.is_available}>
        <Col xs={5} style={{ backgroundImage: `url(${item.image})` }} />
        <Col xs={7} className="d-flex flex-column justify-content-between w-200">
            <div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h4 className="mb-2"> 
                        <b>{item.name}</b>
                    </h4>
                    <div>
                        { onEdit? (
                            <Button variant="link" onClick={onEdit}>
                                <BiEdit size={20} />
                            </Button>
                        ) : null }

                        { onRemove? (
                            <Button variant="link" onClick={onRemove}>
                                <AiOutlineDelete size={20} color="red" />
                            </Button>
                        ) : null }
                    </div>
                </div>
                <p className="mb-4">{item.description}</p>
            </div>
            <div className="d-flex justify-content-between align-items-end">
                <div>
                    <h5 className='mb-0 text-standard'>
                        <b>${item.price}</b>
                    </h5>
                </div>
                {!item.is_available ? (<small className="text-secondary">Not Available</small>) : null}
            </div>
        </Col>

    </StyledContainer>
);

export default MenuItem;