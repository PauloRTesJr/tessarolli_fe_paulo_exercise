export interface Teams {
    id: string;
    name: string;
}

export interface TeamOverview {
    id: string;
    teamLeadId: string;
    teamMemberIds: string[];
}
