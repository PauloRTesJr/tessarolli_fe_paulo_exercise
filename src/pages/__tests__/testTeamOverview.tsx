import React, {ChangeEvent} from 'react';
import {act, fireEvent, render, screen, waitFor} from '@testing-library/react';
import TeamOverview from '../TeamOverview';
import {getTeamOverview, getUserData} from '../../api';

const mockUseNavigate = jest.fn();

const teamOverview = {
    id: 1,
    teamLeadId: '2',
    teamMemberIds: ['3', '4', '5'],
};
const userData1 = {
    id: 1,
    firstName: 'userData1',
    lastName: 'userData1',
    displayName: 'userData1',
    location: '',
    avatar: '',
};
const userData2 = {
    id: 2,
    firstName: 'userData2',
    lastName: 'userData2',
    displayName: 'userData2',
    location: '',
    avatar: '',
};
const userData3 = {
    id: 3,
    firstName: 'userData3',
    lastName: 'userData3',
    displayName: 'userData3',
    location: '',
    avatar: '',
};
const userData4 = {
    id: 4,
    firstName: 'userData4',
    lastName: 'userData4',
    displayName: 'userData4',
    location: '',
    avatar: '',
};

jest.mock('react-router-dom', () => ({
    useLocation: () => ({
        state: {
            teamName: 'Some Team',
        },
    }),
    useNavigate: () => mockUseNavigate,
    useParams: () => ({
        teamId: '1',
    }),
}));

jest.mock('api', () => ({
    getTeamOverview: jest.fn(),
    getUserData: jest.fn(),
}));

describe('TeamOverview', () => {
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
        (getTeamOverview as jest.Mock).mockResolvedValue(teamOverview);
        (getUserData as jest.Mock)
            .mockResolvedValueOnce(userData1)
            .mockResolvedValueOnce(userData2)
            .mockResolvedValueOnce(userData3)
            .mockResolvedValueOnce(userData4);
    });

    it('should render team overview users', async () => {
        render(<TeamOverview />);

        await waitFor(() => {
            expect(screen.queryAllByText('Display Name')).toHaveLength(4);
        });
    });

    it('should not break if api fails', async () => {
        render(<TeamOverview />);

        await act(async () => {
            (getTeamOverview as jest.Mock).mockRejectedValue({});
            (getUserData as jest.Mock).mockRejectedValue({});
        });

        await waitFor(() => {
            expect(screen.queryByText('Team1')).not.toBeInTheDocument();
        });
    });

    it('should filter items when filter input is changed', async () => {
        render(<TeamOverview />);

        await waitFor(() => {
            expect(screen.getByText('userData4')).toBeInTheDocument();
        });
        expect(screen.getByText('userData2')).toBeInTheDocument();

        const filterInput = screen.getByLabelText('Search Team Member');
        fireEvent.change(filterInput, {target: {value: '2'}} as ChangeEvent<HTMLInputElement>);

        expect(screen.getByText('userData2')).toBeInTheDocument();
        expect(screen.queryByText('userData4')).not.toBeInTheDocument();
    });

    it('should navigate when list emit an event from clicking a card', async () => {
        render(<TeamOverview />);

        await waitFor(() => {
            expect(screen.getByText('userData4')).toBeInTheDocument();
        });

        const card = screen.getByText('userData4');
        fireEvent.click(card);

        expect(mockUseNavigate).toHaveBeenCalledTimes(1);
        expect(mockUseNavigate).toHaveBeenCalledWith('/user/4', {state: userData4});
    });
});
