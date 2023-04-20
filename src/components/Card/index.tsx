import React, {MouseEventHandler} from 'react';
import {Circle, Column, ColumnKey, ColumnValue, Container} from './styles';

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
    const initials = columns[0]?.value
        .split(' ')
        .map(word => word.charAt(0))
        .slice(0, 2)
        .join('')
        .toUpperCase();

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
            <Circle>{initials}</Circle>
            {columns?.map(({key: columnKey, value}) => (
                <Column key={columnKey}>
                    <ColumnKey>{columnKey}</ColumnKey>
                    <ColumnValue>{value}</ColumnValue>
                </Column>
            ))}
        </Container>
    );
};

export default Card;
