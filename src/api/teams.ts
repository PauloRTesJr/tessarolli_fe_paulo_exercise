import {TeamOverview, Teams} from 'types';
import {fetchData} from 'utils/httpRequest';

export const getTeams = (): Promise<Teams[]> => {
    return fetchData('teams');
};

export const getTeamOverview = (teamId: string): Promise<TeamOverview> => {
    return fetchData(`teams/${teamId}`);
};
