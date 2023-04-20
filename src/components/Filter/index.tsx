import React, {ChangeEventHandler} from 'react';
import {FilterContainer, Label, Input} from './styles';

interface Props {
    label: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
}

const Filter = ({label, onChange}: Props) => {
    const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
        if (onChange) {
            onChange(event);
        }
    };

    return (
        <FilterContainer onChange={handleChange}>
            <Label htmlFor="filter">{label}</Label>
            <Input id="filter" />
        </FilterContainer>
    );
};

export default Filter;
