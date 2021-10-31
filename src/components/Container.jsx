import styled from 'styled-components';


export const Container = styled.div`
    border-radius: 5px;
    background-color: white;
    margin-bottom: 30px;
    box-shadow: 1px 1px 8px rgba(0, 0, 0, 1);
    display: flex;
    opacity: ${({active}) => (active ? 1 : 0.6)} ;
    > div: first-child {
        width: 40%;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        background-size: cover;
    }
    > div: last-child {
        padding: 15px 20px;
        min-width: 150px;
    }
`;