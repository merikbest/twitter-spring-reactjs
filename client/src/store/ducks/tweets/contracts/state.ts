import {LoadingStatus} from "../../../types";
import {User} from "../../user/contracts/state";

export enum AddFormState {
    LOADING = "LOADING",
    ERROR = "ERROR",
    NEVER = "NEVER"
}

export interface Image {
    id: number;
    src: string;
}

export interface Tweet {
    id: string;
    text: string;
    dateTime: string;
    images?: Image[];
    likes: User[];
    user: User;
}

export interface TweetsState {
    items: Tweet[];
    loadingState: LoadingStatus;
    addFormState: AddFormState;
}
