import React, {ChangeEvent, useEffect, useMemo, useState} from 'react';
import {useLocation, useParams} from 'react-router-dom';
import {ListItem, UserData} from 'types';
import {getTeamOverview, getUserData} from '../api';
import Card from '../components/Card';
import {Container} from '../components/GlobalComponents';
import Header from '../components/Header';
import List from '../components/List';
import Filter from '../components/Filter';

var mapTeamMembersToList = (users: UserData[]) => {
    // TODO: Rename variable
    return users.map(u => {
        var columns = [
            {
                key: 'Name',
                value: `${u.firstName} ${u.lastName}`,
            },
            {
                key: 'Display Name',
                value: u.displayName,
            },
            {
                key: 'Location',
                value: u.location,
            },
        ];
        return {
            id: u.id,
            url: `/user/${u.id}`,
            columns,
            navigationProps: u,
        };
    }) as ListItem[];
};

var mapTLead = tlead => {
    var columns = [
        {
            key: 'Team Lead',
            value: '',
        },
        {
            key: 'Name',
            value: `${tlead.firstName} ${tlead.lastName}`,
        },
        {
            key: 'Display Name',
            value: tlead.displayName,
        },
        {
            key: 'Location',
            value: tlead.location,
        },
    ];
    return <Card columns={columns} url={`/user/${tlead.id}`} navigationProps={tlead} />;
};

const filterTeamMembers = (teamMembers: UserData[], filter: string) => {
    const compareTeamMemberNameWithFilter = (teamMemberName: string) =>
        teamMemberName.toUpperCase().includes(filter.toUpperCase());
    return filter
        ? teamMembers.filter(teamMember => compareTeamMemberNameWithFilter(teamMember.displayName))
        : teamMembers ?? [];
};

interface PageState {
    teamLead?: UserData;
    teamMembers?: UserData[];
}

const TeamOverview = () => {
    const location = useLocation();
    const {teamId} = useParams();
    const [pageData, setPageData] = useState<PageState>({});
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [filter, setFilter] = useState<string | null>(null);

    const filteredTeamMembers = useMemo(
        () => filterTeamMembers(pageData.teamMembers, filter),
        [pageData, filter]
    );

    const mappedTeamMembersToList = useMemo(
        () => mapTeamMembersToList(filteredTeamMembers ?? []),
        [filteredTeamMembers]
    );

    const handleOnFilterChange = (event: ChangeEvent<HTMLInputElement>) =>
        setFilter(event.target.value);

    useEffect(() => {
        var getTeamUsers = async () => {
            const {teamLeadId, teamMemberIds = []} = await getTeamOverview(teamId);
            const teamLead = await getUserData(teamLeadId);

            const teamMembers = [];
            for (var teamMemberId of teamMemberIds) {
                const data = await getUserData(teamMemberId);
                teamMembers.push(data);
            }
            setPageData({
                teamLead,
                teamMembers,
            });
            setIsLoading(false);
        };
        getTeamUsers();
    }, [teamId]);

    return (
        <Container>
            <Header title={`Team ${location.state.name}`} />
            <Filter label="Search Team Member" onChange={handleOnFilterChange} />
            {!isLoading && mapTLead(pageData.teamLead)}
            <List items={mappedTeamMembersToList} isLoading={isLoading} />
        </Container>
    );
};

export default TeamOverview;
