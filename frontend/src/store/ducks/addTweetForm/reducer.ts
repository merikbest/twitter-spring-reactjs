import produce, { Draft } from "immer";

import { AddTweetFormActions, AddTweetFormTypes } from "./constants/actionTypes";
import { AddTweetFormState, PollInitialState } from "./constants/state";
import { LoadingStatus, ReplyType } from "../../../types/common";

export const pollInitialState: PollInitialState = {
    choice1: "",
    choice2: "",
    choice3: "",
    choice4: "",
    day: 1,
    hour: 0,
    minute: 0
};

export const initialAddTweetFormState: AddTweetFormState = {
    visiblePoll: false,
    pollData: pollInitialState,
    gif: null,
    scheduledDate: null,
    replyType: ReplyType.EVERYONE,
    imageDescription: "",
    images: [],
    selectedUsers: [],
    // gif modal
    gifs: [],
    loadingState: LoadingStatus.LOADED
};

export const addTweetFormReducer = produce((draft: Draft<AddTweetFormState>, action: AddTweetFormActions) => {
    switch (action.type) {
        case AddTweetFormTypes.SET_OPEN_POLL:
            draft.visiblePoll = true;
            break;

        case AddTweetFormTypes.SET_CLOSE_POLL:
            draft.visiblePoll = false;
            draft.pollData = pollInitialState;
            break;

        case AddTweetFormTypes.SET_POLL_VALUE:
            draft.pollData = { ...draft.pollData, ...action.payload };
            break;

        case AddTweetFormTypes.SET_GIF:
            draft.gif = action.payload;
            break;

        case AddTweetFormTypes.REMOVE_GIF:
            draft.gif = null;
            break;

        case AddTweetFormTypes.SET_SCHEDULE_DATE:
            draft.scheduledDate = action.payload;
            break;

        case AddTweetFormTypes.CLEAR_SCHEDULE_DATE:
            draft.scheduledDate = null;
            break;

        case AddTweetFormTypes.SET_REPLY_TYPE:
            draft.replyType = action.payload;
            break;

        case AddTweetFormTypes.SET_IMAGE_DESCRIPTION:
            draft.imageDescription = action.payload;
            break;

        case AddTweetFormTypes.SET_IMAGES:
            draft.images = action.payload;
            break;

        case AddTweetFormTypes.REMOVE_IMAGES:
            draft.images = [];
            draft.imageDescription = "";
            draft.selectedUsers = [];
            break;

        case AddTweetFormTypes.SET_SELECTED_USER:
            const newSelectedUsers = [...draft.selectedUsers];
            const selectedUserIndex = draft.selectedUsers.findIndex(user => user.id === action.payload.id);

            if (selectedUserIndex === -1) {
                newSelectedUsers.push(action.payload);
            } else {
                newSelectedUsers.splice(selectedUserIndex, 1);
            }
            draft.selectedUsers = newSelectedUsers;
            break;

        case AddTweetFormTypes.REMOVE_SELECTED_USER:
            draft.selectedUsers = draft.selectedUsers.filter((user) => user.id !== action.payload.id);
            break;

        case AddTweetFormTypes.RESET_ADD_TWEET_FORM_STATE:
            draft.visiblePoll = false;
            draft.pollData = pollInitialState;
            draft.gif = null;
            draft.scheduledDate = null;
            draft.replyType = ReplyType.EVERYONE;
            draft.imageDescription = "";
            draft.images = [];
            draft.selectedUsers = [];
            draft.gifs = [];
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case AddTweetFormTypes.SET_GIFS:
            draft.gifs = action.payload;
            break;

        case AddTweetFormTypes.RESET_GIFS:
            draft.gifs = [];
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case AddTweetFormTypes.SET_LOADING_STATE:
            draft.loadingState = action.payload;
            break;

        default:
            break;
    }
}, initialAddTweetFormState);
