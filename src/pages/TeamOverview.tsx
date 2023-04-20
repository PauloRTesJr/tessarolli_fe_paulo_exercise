import React, {ChangeEvent, useEffect, useMemo, useState} from 'react';
import {NavigateOptions, useLocation, useNavigate, useParams} from 'react-router-dom';
import {ListItem, UserData} from 'types';
import {getTeamOverview, getUserData} from 'api';
import Card from 'components/Card';
import {Container} from 'components/GlobalComponents';
import Header from 'components/Header';
import List from 'components/List';
import Filter from 'components/Filter';
import {mapUserToListItem} from 'utils/mappers';
import {Spinner} from 'components/Spinner';

const mapTeamMembersToList = (users: UserData[]) => {
    return users.map(user => mapUserToListItem(user)) as ListItem[];
};

const filterTeamMembers = (teamMembers: UserData[], filter: string) => {
    if (!teamMembers) {
        return [];
    }
    const compareTeamMemberNameWithFilter = (teamMemberName: string) =>
        teamMemberName.toUpperCase().includes(filter.toUpperCase());
    return filter
        ? teamMembers?.filter(teamMember => compareTeamMemberNameWithFilter(teamMember.displayName))
        : teamMembers;
};

interface PageState {
    teamLead?: UserData;
    teamMembers?: UserData[];
}

const TeamOverview = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {teamId} = useParams();
    const [pageData, setPageData] = useState<PageState>({});
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [filter, setFilter] = useState<string>('');

    const filteredTeamMembers = useMemo(
        () => filterTeamMembers(pageData?.teamMembers, filter),
        [pageData, filter]
    );

    const mappedTeamMembersToListItem = useMemo(
        () => mapTeamMembersToList(filteredTeamMembers ?? []),
        [filteredTeamMembers]
    );

    const mappedTeamLead = useMemo(() => mapUserToListItem(pageData?.teamLead), [pageData]);

    const handleOnFilterChange = (event: ChangeEvent<HTMLInputElement>) =>
        setFilter(event.target.value);

    const handleCardClick = (url: string, navigationProps: NavigateOptions) => {
        navigate(url, navigationProps);
    };

    const teamLeadCard = () => {
        if (!mappedTeamLead) {
            return null;
        }
        return (
            <Card
                onClick={() =>
                    handleCardClick(mappedTeamLead.url, {state: mappedTeamLead.navigationProps})
                }
                hasNavigation
                columns={mappedTeamLead.columns}
            />
        );
    };

    const teamMembersList = () => {
        if (!mappedTeamMembersToListItem) {
            return null;
        }
        return <List onClick={handleCardClick} hasNavigation items={mappedTeamMembersToListItem} />;
    };

    const renderTeamOverview = () => {
        return (
            <React.Fragment>
                <Filter label="Search Team Member" onChange={handleOnFilterChange} />
                {teamLeadCard()}
                {teamMembersList()}
            </React.Fragment>
        );
    };

    useEffect(() => {
        const getTeamUsers = async () => {
            try {
                const {teamLeadId, teamMemberIds = []} = await getTeamOverview(teamId);
                const teamLead = await getUserData(teamLeadId);

                const teamMembers = await Promise.all(
                    teamMemberIds.map(teamMemberId => getUserData(teamMemberId))
                );

                setPageData({
                    teamLead,
                    teamMembers,
                });
            } catch (error) {
                setPageData(null);
            }
            setIsLoading(false);
        };
        getTeamUsers();
    }, [teamId]);

    return (
        <Container>
            <Header title={`Team ${location.state.name}`} />
            {isLoading && <Spinner />}
            {!isLoading && renderTeamOverview()}
        </Container>
    );
};

export default TeamOverview;
