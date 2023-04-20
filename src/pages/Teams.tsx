import React, {ChangeEvent, useEffect, useMemo, useState} from 'react';
import {Teams as TeamsList} from 'types';
import {getTeams as fetchTeams} from 'api';
import Header from 'components/Header';
import List from 'components/List';
import {Container} from 'components/GlobalComponents';
import Filter from 'components/Filter';
import {mapTeamsToListItem} from 'utils/mappers';
import {Spinner} from 'components/Spinner';
import {NavigateOptions, useNavigate} from 'react-router-dom';

const filterTeams = (teams: TeamsList[], filter: string) => {
    const compareTeamNameWithFilter = (teamName: string) =>
        teamName.toUpperCase().includes(filter.toUpperCase());
    return filter ? teams.filter(team => compareTeamNameWithFilter(team.name)) : teams;
};

const Teams = () => {
    const navigate = useNavigate();
    const [teams, setTeams] = useState<TeamsList[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [filter, setFilter] = useState<string>('');

    const filteredTeams = useMemo(() => filterTeams(teams, filter), [teams, filter]);
    const mappedTeamsToList = useMemo(() => mapTeamsToListItem(filteredTeams), [filteredTeams]);

    const handleCardClick = (url: string, navigationProps: NavigateOptions) => {
        navigate(url, navigationProps);
    };

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
            {isLoading && <Spinner />}
            {!isLoading && (
                <List onClick={handleCardClick} hasNavigation items={mappedTeamsToList} />
            )}
        </Container>
    );
};

export default Teams;
