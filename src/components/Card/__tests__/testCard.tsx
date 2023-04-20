import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import Card from '..';

describe('Card', () => {
    it('should render card with single column', () => {
        const columns = [{key: 'columnKey', value: 'columnValue'}];
        render(<Card columns={columns} />);

        expect(screen.getByText('columnKey')).toBeInTheDocument();
        expect(screen.getByText('columnValue')).toBeInTheDocument();
    });

    it('should render card with multiple columns', () => {
        const columns = [
            {key: 'columnKey1', value: 'columnValue1'},
            {key: 'columnKey2', value: 'columnValue2'},
            {key: 'columnKey3', value: 'columnValue3'},
            {key: 'columnKey4', value: ''},
        ];
        render(<Card columns={columns} />);

        expect(screen.getByText('columnKey1')).toBeInTheDocument();
        expect(screen.getByText('columnValue1')).toBeInTheDocument();
        expect(screen.getByText('columnKey2')).toBeInTheDocument();
        expect(screen.getByText('columnValue2')).toBeInTheDocument();
        expect(screen.getByText('columnKey3')).toBeInTheDocument();
        expect(screen.getByText('columnValue3')).toBeInTheDocument();
        expect(screen.getByText('columnKey4')).toBeInTheDocument();
    });

    it('should emit click event when card is clicked and navigation is enabled', () => {
        const mockOnClick = jest.fn();

        render(
            <Card
                columns={[{key: 'columnKey', value: 'columnValue'}]}
                hasNavigation
                onClick={mockOnClick}
            />
        );

        fireEvent.click(screen.getByText('columnKey'));

        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('should not emit click event when card is clicked and navigation is disabled', () => {
        const mockOnClick = jest.fn();
        render(
            <Card
                columns={[{key: 'columnKey', value: 'columnValue'}]}
                hasNavigation={false}
                onClick={mockOnClick}
            />
        );

        fireEvent.click(screen.getByText('columnKey'));

        expect(mockOnClick).not.toHaveBeenCalled();
    });
});
