import styled from "styled-components";

const Place = styled.div`
    margin-bottom: 20px;
    cursor: pointer;
    transition: all 0.2s;
    :hover {
        transform: scale(1.05);
    }
    > div {
        background-size: cover;
        height: 200px;
        border-radius: 5px;

    }
    > p {
        margin-top: 5px;
        font_size: 20px;
        font-weight: bold;
    }
`;

export default Place;