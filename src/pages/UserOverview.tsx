import React, {useMemo} from 'react';
import {useLocation} from 'react-router-dom';
import Card from 'components/Card';
import {Container} from 'components/GlobalComponents';
import Header from 'components/Header';
import {mapUserToListItem} from 'utils/mappers';

const UserOverview = () => {
    const location = useLocation();
    const user = useMemo(() => mapUserToListItem(location.state), [location.state]);
    return (
        <Container>
            <Header title={`User ${location.state.firstName} ${location.state.lastName}`} />
            <Card hasNavigation={false} columns={user.columns} />
        </Container>
    );
};

export default UserOverview;
