import {
    AddTweetFormTypes,
    ClearImageDescriptionActionInterface,
    RemoveImagesActionInterface,
    ClearScheduleDateActionInterface,
    RemoveGifActionInterface,
    SetClosePollActionInterface,
    SetGifActionInterface,
    SetImageDescriptionActionInterface,
    SetImagesActionInterface,
    SetOpenPollActionInterface,
    SetPollValueActionInterface,
    SetReplyTypeActionInterface,
    SetScheduleDateActionInterface
} from "./constants/actionTypes";
import { PollInitialState } from "./constants/state";
import { GiphyDataProps } from "../../../types/tweet";
import { ReplyType } from "../../../types/common";
import { ImageObj } from "../../../components/AddTweetForm/AddTweetForm";

export const setOpenPoll = (): SetOpenPollActionInterface => ({
    type: AddTweetFormTypes.SET_OPEN_POLL
});

export const setClosePoll = (): SetClosePollActionInterface => ({
    type: AddTweetFormTypes.SET_CLOSE_POLL
});

export const setPollValue = (payload: PollInitialState): SetPollValueActionInterface => ({
    type: AddTweetFormTypes.SET_POLL_VALUE,
    payload
});

export const setGif = (payload: GiphyDataProps): SetGifActionInterface => ({
    type: AddTweetFormTypes.SET_GIF,
    payload
});

export const removeGif = (): RemoveGifActionInterface => ({
    type: AddTweetFormTypes.REMOVE_GIF
});

export const setScheduleDate = (payload: Date): SetScheduleDateActionInterface => ({
    type: AddTweetFormTypes.SET_SCHEDULE_DATE,
    payload
});

export const clearScheduleDate = (): ClearScheduleDateActionInterface => ({
    type: AddTweetFormTypes.CLEAR_SCHEDULE_DATE
});

export const setReplyType = (payload: ReplyType): SetReplyTypeActionInterface => ({
    type: AddTweetFormTypes.SET_REPLY_TYPE,
    payload
});

export const setImageDescription = (payload: string): SetImageDescriptionActionInterface => ({
    type: AddTweetFormTypes.SET_IMAGE_DESCRIPTION,
    payload
});

export const clearImageDescription = (): ClearImageDescriptionActionInterface => ({
    type: AddTweetFormTypes.CLEAR_IMAGE_DESCRIPTION
});

export const setImages = (payload: ImageObj[]): SetImagesActionInterface => ({
    type: AddTweetFormTypes.SET_IMAGES,
    payload
});

export const removeImages = (): RemoveImagesActionInterface => ({
    type: AddTweetFormTypes.REMOVE_IMAGES
});
