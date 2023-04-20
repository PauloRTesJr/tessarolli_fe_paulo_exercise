import styled from 'styled-components';

export const FilterContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
`;

export const Input = styled.input`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    border: none;
    border-radius: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.2s ease-in-out;
    font-size: 16px;
    line-height: 1.5;
    width: 50vw;

    &:focus {
        outline: none;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    }
`;

export const Label = styled.label`
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
`;
