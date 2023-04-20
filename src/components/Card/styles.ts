import styled from 'styled-components';

export const Container = styled.div<{hasNavigation: boolean}>`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 1rem 0;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    background: white;
    width: 15vw;
    min-width: 120px;
    cursor: ${props => (props.hasNavigation ? 'pointer' : 'default')};
    &:hover {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }
`;

export const Circle = styled.div`
    display: flex;
    justify-content: center;
    align-self: center;
    align-items: center;
    width: 64px;
    height: 64px;
    margin-bottom: 16px;
    background-color: var(--primary-color);
    border-radius: 50%;
    font-size: 24px;
    font-weight: bold;
    color: white;
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
`;

export const ColumnKey = styled.p`
    font-size: 1rem;
`;

export const ColumnValue = styled.p`
    font-size: 1.2rem;
    font-weight: bold;
`;
