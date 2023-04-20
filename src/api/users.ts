import {UserData} from '../types';
import {fetchData} from '../utils/httpRequest';

export const getUserData = (userId: string): Promise<UserData> => {
    return fetchData(`users/${userId}`);
};
