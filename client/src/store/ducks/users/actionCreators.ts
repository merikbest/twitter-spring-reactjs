import {User} from "../user/contracts/state";
import {SetUsersItemsActionInterface, UsersActionsType} from './contracts/actionTypes';

export const setUsers = (payload: User[]): SetUsersItemsActionInterface => ({
    type: UsersActionsType.SET_ITEMS,
    payload,
});
