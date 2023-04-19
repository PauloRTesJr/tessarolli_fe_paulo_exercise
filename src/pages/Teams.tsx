import React, {ChangeEvent, useEffect, useMemo, useState} from 'react';
import {ListItem, Teams as TeamsList} from 'types';
import {getTeams as fetchTeams} from '../api';
import Header from '../components/Header';
import List from '../components/List';
import {Container} from '../components/GlobalComponents';
import Filter from '../components/Filter';

// TODO: Change every possible var to const
var mapTeamsToList = (teams: TeamsList[]) => {
    return teams.map(team => {
        var columns = [
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
    });
};

const filterTeams = (teams: TeamsList[], filter: string) => {
    const compareTeamNameWithFilter = (teamName: string) =>
        teamName.toUpperCase().includes(filter.toUpperCase());
    return filter ? teams.filter(team => compareTeamNameWithFilter(team.name)) : teams;
};

const Teams = () => {
    // TODO: Remove any from useState
    const [teams, setTeams] = useState<any>([]);
    const [isLoading, setIsLoading] = useState<any>(true);
    const [filter, setFilter] = useState<string | null>(null);

    const filteredTeams = useMemo(() => filterTeams(teams, filter), [teams, filter]);
    const mappedTeamsToList = useMemo(() => mapTeamsToList(filteredTeams), [filteredTeams]);

    const handleOnFilterChange = (event: ChangeEvent<HTMLInputElement>) =>
        setFilter(event.target.value);

    useEffect(() => {
        const getTeams = async () => {
            const response = await fetchTeams();

            setTeams(response);
            setIsLoading(false);
        };
        getTeams();
    }, []);

    return (
        <Container>
            <Header title="Teams" showBackButton={false} />
            <Filter label="Search Project" onChange={event => handleOnFilterChange(event)} />
            <List items={mappedTeamsToList} isLoading={isLoading} />
        </Container>
    );
};

export default Teams;
