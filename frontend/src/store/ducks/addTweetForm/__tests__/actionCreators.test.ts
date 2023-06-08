import { testAction } from "../../../../util/test-utils/test-helper";
import {
    clearScheduleDate,
    removeGif,
    removeImages,
    removeSelectedUser,
    resetAddTweetFormState,
    setClosePoll,
    setGif,
    setImageDescription,
    setImages,
    setOpenPoll,
    setPollValue,
    setReplyType,
    setScheduleDate,
    setSelectedUser
} from "../actionCreators";
import { AddTweetFormTypes } from "../constants/actionTypes";
import { pollInitialState } from "../reducer";
import { GiphyDataProps } from "../../../../types/tweet";
import { ReplyType } from "../../../../types/common";
import { ImageObj } from "../../../../components/AddTweetForm/AddTweetForm";
import { UserResponse } from "../../../../types/user";

describe("addTweetForm actions", () => {

    testAction(setOpenPoll, setOpenPoll(), {
        type: AddTweetFormTypes.SET_OPEN_POLL
    });

    testAction(setClosePoll, setClosePoll(), {
        type: AddTweetFormTypes.SET_CLOSE_POLL
    });

    testAction(setPollValue, setPollValue(pollInitialState), {
        type: AddTweetFormTypes.SET_POLL_VALUE,
        payload: pollInitialState
    });

    testAction(setGif, setGif({ id: "1", title: "test" } as GiphyDataProps), {
        type: AddTweetFormTypes.SET_GIF,
        payload: { id: "1", title: "test" } as GiphyDataProps
    });

    testAction(removeGif, removeGif(), {
        type: AddTweetFormTypes.REMOVE_GIF
    });

    testAction(setScheduleDate, setScheduleDate(new Date()), {
        type: AddTweetFormTypes.SET_SCHEDULE_DATE,
        payload: new Date()
    });

    testAction(clearScheduleDate, clearScheduleDate(), {
        type: AddTweetFormTypes.CLEAR_SCHEDULE_DATE
    });

    testAction(setReplyType, setReplyType(ReplyType.EVERYONE), {
        type: AddTweetFormTypes.SET_REPLY_TYPE,
        payload: ReplyType.EVERYONE
    });

    testAction(setImageDescription, setImageDescription("test"), {
        type: AddTweetFormTypes.SET_IMAGE_DESCRIPTION,
        payload: "test"
    });

    testAction(setImages, setImages([{ src: "test" }] as ImageObj[]), {
        type: AddTweetFormTypes.SET_IMAGES,
        payload: [{ src: "test" }] as ImageObj[]
    });

    testAction(removeImages, removeImages(), {
        type: AddTweetFormTypes.REMOVE_IMAGES
    });

    testAction(setSelectedUser, setSelectedUser({ id: 1 } as UserResponse), {
        type: AddTweetFormTypes.SET_SELECTED_USER,
        payload: { id: 1 } as UserResponse
    });

    testAction(removeSelectedUser, removeSelectedUser({ id: 1 } as UserResponse), {
        type: AddTweetFormTypes.REMOVE_SELECTED_USER,
        payload: { id: 1 } as UserResponse
    });

    testAction(resetAddTweetFormState, resetAddTweetFormState(), {
        type: AddTweetFormTypes.RESET_ADD_TWEET_FORM_STATE
    });
});
