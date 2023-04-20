import React, {ChangeEvent} from 'react';
import {fireEvent, render, screen, waitFor, act} from '@testing-library/react';
import Teams from '../Teams';
import {getTeams as fetchTeams} from '../../api';

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    useLocation: () => ({
        state: {
            firstName: 'Test',
            lastName: 'User',
            displayName: 'userName',
            location: 'location',
        },
    }),
    useNavigate: () => mockUseNavigate,
}));

jest.mock('api', () => ({
    getTeams: jest.fn(),
}));

describe('Teams', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should render spinner while loading', async () => {
        const mockTeams = [
            {
                id: '1',
                name: 'Team1',
            },
            {
                id: '2',
                name: 'Team2',
            },
        ];
        (fetchTeams as jest.Mock).mockResolvedValue(mockTeams);
        render(<Teams />);

        expect(screen.getByTestId('spinner')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('Team1')).toBeInTheDocument();
        });
        expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    });

    it('should render teams list', async () => {
        const mockTeams = [
            {
                id: '1',
                name: 'Team1',
            },
            {
                id: '2',
                name: 'Team2',
            },
        ];
        (fetchTeams as jest.Mock).mockResolvedValue(mockTeams);

        render(<Teams />);

        await waitFor(() => {
            expect(screen.getByText('Team1')).toBeInTheDocument();
        });
        expect(screen.getByText('Team2')).toBeInTheDocument();
    });

    it('should not break if api fails', async () => {
        render(<Teams />);

        await act(async () => {
            (fetchTeams as jest.Mock).mockRejectedValue([]);
        });

        await waitFor(() => {
            expect(screen.queryByText('Team1')).not.toBeInTheDocument();
        });
    });

    it('should filter items when filter input is changed', async () => {
        const mockTeams = [
            {
                id: '1',
                name: 'Team1',
            },
            {
                id: '2',
                name: 'Team2',
            },
        ];
        (fetchTeams as jest.Mock).mockResolvedValue(mockTeams);

        render(<Teams />);

        await waitFor(() => {
            expect(screen.getByText('Team1')).toBeInTheDocument();
        });

        const filterInput = screen.getByLabelText('Search Project');
        fireEvent.change(filterInput, {target: {value: '2'}} as ChangeEvent<HTMLInputElement>);

        expect(screen.getByText('Team2')).toBeInTheDocument();
        expect(screen.queryByText('Team1')).not.toBeInTheDocument();
    });

    it('should navigate when list emit an event from clicking a card', async () => {
        const mockTeams = [
            {
                id: '1',
                name: 'Team1',
            },
            {
                id: '2',
                name: 'Team2',
            },
        ];
        (fetchTeams as jest.Mock).mockResolvedValue(mockTeams);

        render(<Teams />);

        await waitFor(() => {
            expect(screen.getByText('Team1')).toBeInTheDocument();
        });

        const teamCard = screen.getByText('Team1');
        fireEvent.click(teamCard);

        expect(mockUseNavigate).toHaveBeenCalledTimes(1);
        expect(mockUseNavigate).toHaveBeenCalledWith('/team/1', {state: {id: '1', name: 'Team1'}});
    });
});
