import styled from 'styled-components';

export const HeaderContainer = styled.div`
    height: 100px;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    background: var(--secondary-color);
    color: white;
    gap: 1rem;
`;

export const Title = styled.h1``;

export const BackButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    padding: 1rem;
    background: var(--primary-color);
    border-radius: 15px;
    border: 0;
    color: white;
    cursor: pointer;
    &:hover {
        transform: scale(1.1);
    }
`;
