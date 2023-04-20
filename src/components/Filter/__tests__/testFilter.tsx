import React, {ChangeEvent} from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import Filter from '..';

describe('Filter', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('should render with correct label', () => {
        render(<Filter label="Filter" onChange={() => {}} />);

        expect(screen.getByText('Filter')).toBeInTheDocument();
    });

    it('fires the onChange event when the input value changes', () => {
        const mockOnChange = jest.fn();
        render(<Filter label="Label" onChange={mockOnChange} />);
        const filterInput = screen.getByLabelText('Label');

        const event = {target: {value: 'Test Value'}} as ChangeEvent<HTMLInputElement>;

        fireEvent.change(filterInput, event);
        expect(mockOnChange).toHaveBeenCalledTimes(1);
    });
});
