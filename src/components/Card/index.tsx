import React, {MouseEventHandler} from 'react';
import {Container} from './styles';

interface Props {
    id?: string;
    columns: Array<{
        key: string;
        value: string;
    }>;
    hasNavigation?: boolean;
    onClick?: MouseEventHandler<HTMLDivElement>;
}

const Card = ({id, columns, hasNavigation = false, onClick}: Props): JSX.Element => {
    const handleOnClick: MouseEventHandler<HTMLDivElement> = event => {
        event.preventDefault();
        if (hasNavigation && onClick) {
            onClick(event);
        }
    };

    return (
        <Container
            hasNavigation={hasNavigation}
            data-testid={`cardContainer-${id}`}
            onClick={handleOnClick}
        >
            {columns.map(({key: columnKey, value}) => (
                <p key={columnKey}>
                    <strong>{columnKey}</strong>&nbsp;{value}
                </p>
            ))}
        </Container>
    );
};

export default Card;
