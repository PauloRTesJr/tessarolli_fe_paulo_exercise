import React from 'react';
import {NavigateOptions} from 'react-router-dom';
import {ListItem, Teams, UserData} from 'types';
import Card from '../Card';
import {Container} from './styles';

interface Props {
    items?: ListItem[];
    hasNavigation?: boolean;
    onClick?: (url: string, navigationProps: NavigateOptions) => void;
}

const List = ({items, hasNavigation = true, onClick}: Props) => {
    const handleCardClick = (url: string, navigationProps: UserData | Teams) => {
        if (hasNavigation && onClick) {
            onClick(url, {state: navigationProps});
        }
    };

    return (
        <Container>
            {items.map(({url, id, columns, navigationProps}, index) => {
                return (
                    <Card
                        key={`${id}-${index}`}
                        id={id}
                        columns={columns}
                        onClick={() => handleCardClick(url, navigationProps)}
                        hasNavigation
                    />
                );
            })}
        </Container>
    );
};

export default List;
