import React from 'react';
import styled from 'styled-components';
import MenuItem from './MenuItem';
import { Button } from "react-bootstrap";

import { IoArrowBack } from 'react-icons/io5';



const Place = styled.div`
    text-align: center;
    img{
        border-radius: 5px;
        margin-bottom: 20px;
    }
`;

const Container = styled.div`
    b, p{
        ${({ font }) => font && `font-family: ${font}`}
    }
`;

const MenuList = ({ place, shoppingCart, onOrder, onBack, font="", color="" }) => {
    return (
        <Container font={font}>
        <Place>
            <img src={place.image} width={100} height={100} alt="" />
            <h3> 
                {onBack? (
                    <Button variant="link" size='lg' onClick={() => onBack()}> 
                        <IoArrowBack size={45} color='red'/> 
                    </Button>
                ):null}
                 <b> { place.name } </b> 
            </h3>
        </Place>

        {place?.categories?.filter(
                    (category) => category.menu_items.filter((i) => i.is_available).length
                ).map((category) => (
                    <div className="mt-5" key={category.id}>
                        <h4 className="mb-4">
                            <b>{category.name}</b>
                        </h4>
                        {
                            category.menu_items
                                .filter((item) => item.is_available)
                                .map((item) => (
                                    <MenuItem 
                                        key={item.id} 
                                        item={{
                                            ...item,
                                            quantity: shoppingCart[item.id]?.quantity
                                        }}
                                        onOrder={onOrder}
                                        font={font}
                                        color={color}
                                    />
                                ))
                        }
                    </div>
                ))
        }
        </Container>
    )
}

export default MenuList;
