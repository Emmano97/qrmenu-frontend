import styled from "styled-components";
import { Button } from "react-bootstrap";

const OrderButton = styled(Button)`
    position: fixed;
    bottom: 20px;
    right: 20px;
    border-radius: 50%;
    box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.2);
    width: 60px;
    height: 60px;
`;


export default OrderButton