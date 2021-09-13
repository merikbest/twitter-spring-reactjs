import {LoadingStatus} from "../../../types";
import {Lists} from "../../lists/contracts/state";

export interface AddUserToList {
    userId: number;
    listId: number;
}

export interface ListState {
    list: Lists | undefined;
    loadingState: LoadingStatus;
}
