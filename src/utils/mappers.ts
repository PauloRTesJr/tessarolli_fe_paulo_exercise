import {ListItem, UserData, Teams as TeamsList} from 'types';

export const mapUserToListItem = (userData: UserData): ListItem => {
    if (!userData) {
        return {} as ListItem;
    }
    const columns = [
        {
            key: 'Name',
            value: `${userData.firstName} ${userData.lastName}`,
        },
        {
            key: 'Display Name',
            value: userData.displayName,
        },
        {
            key: 'Location',
            value: userData.location,
        },
    ];
    return {
        id: userData.id,
        url: `/user/${userData.id}`,
        columns,
        navigationProps: userData,
    };
};

export const mapTeamsToListItem = (teams: TeamsList[]) => {
    return (
        teams?.map(team => {
            const columns = [
                {
                    key: 'Name',
                    value: team.name,
                },
            ];
            return {
                id: team.id,
                url: `/team/${team.id}`,
                columns,
                navigationProps: team,
            } as ListItem;
        }) ?? []
    );
};
