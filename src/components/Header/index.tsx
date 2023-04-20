import React from 'react';
import {useNavigate} from 'react-router-dom';
import {HeaderContainer, BackButton, Title} from './styles';

interface Props {
    title: string;
    showBackButton?: boolean;
}

const Header = ({title, showBackButton = true}: Props) => {
    const navigate = useNavigate();

    const handleOnBackClick = () => {
        navigate(-1);
    };

    return (
        <HeaderContainer>
            {showBackButton && <BackButton onClick={handleOnBackClick}>Back</BackButton>}
            <Title>{title}</Title>
        </HeaderContainer>
    );
};

export default Header;
