import produce, { Draft } from "immer";

import { AddTweetFormActions, AddTweetFormTypes } from "./constants/actionTypes";
import { AddTweetFormState, PollInitialState } from "./constants/state";
import { ReplyType } from "../../../types/common";

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
    images: []
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

        case AddTweetFormTypes.CLEAR_IMAGE_DESCRIPTION:
            draft.imageDescription = "";
            break;

        case AddTweetFormTypes.SET_IMAGES:
            draft.images = action.payload;
            break;

        case AddTweetFormTypes.REMOVE_IMAGES:
            draft.images = [];
            draft.imageDescription = "";
            break;

        default:
            break;
    }
}, initialAddTweetFormState);
