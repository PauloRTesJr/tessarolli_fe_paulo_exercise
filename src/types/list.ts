import {Teams} from './team';
import {UserData} from './user';

export interface ListItemColumn {
    key: string;
    value: string;
}

export interface ListItem {
    id: string;
    url?: string;
    columns: Array<ListItemColumn>;
    navigationProps?: UserData | Teams;
}
