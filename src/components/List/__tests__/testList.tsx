import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {ListItem} from 'types';
import List from '..';

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: () => jest.fn(),
}));

describe('List', () => {
    it('should render single card when single item', () => {
        const items = [
            {
                id: '1',
                columns: [
                    {
                        key: 'columnKey1',
                        value: 'columnValue1',
                    },
                ],
            },
        ];
        render(<List items={items} />);

        expect(screen.getByTestId('cardContainer-1')).toBeInTheDocument();
    });

    it('should render multiple card when multiple items', () => {
        const items = [
            {
                id: '1',
                columns: [
                    {
                        key: 'columnKey1',
                        value: 'columnValue1',
                    },
                ],
            },
            {
                id: '2',
                columns: [
                    {
                        key: 'columnKey2',
                        value: 'columnValue2',
                    },
                ],
            },
        ];
        render(<List items={items} />);

        expect(screen.getByTestId('cardContainer-1')).toBeInTheDocument();
        expect(screen.getByTestId('cardContainer-2')).toBeInTheDocument();
    });

    it('should emit click event when card is clicked and navigation is enabled', () => {
        const mockOnClick = jest.fn();

        const items = [
            {
                id: '1',
                url: 'url',
                navigationProps: {},
                columns: [
                    {
                        key: 'columnKey1',
                        value: 'columnValue1',
                    },
                ],
            } as ListItem,
        ];
        render(<List items={items} hasNavigation onClick={mockOnClick} />);

        fireEvent.click(screen.getByText('columnKey1'));

        expect(mockOnClick).toHaveBeenCalledTimes(1);
        expect(mockOnClick).toHaveBeenCalledWith('url', {state: {}});
    });

    it('should not emit click event when card is clicked and navigation is disabled', () => {
        const mockOnClick = jest.fn();
        const items = [
            {
                id: '1',
                url: 'url',
                navigationProps: {},
                columns: [
                    {
                        key: 'columnKey1',
                        value: 'columnValue1',
                    },
                ],
            } as ListItem,
        ];
        render(<List items={items} hasNavigation={false} onClick={mockOnClick} />);

        fireEvent.click(screen.getByText('columnKey1'));

        expect(mockOnClick).not.toHaveBeenCalled();
    });
});
