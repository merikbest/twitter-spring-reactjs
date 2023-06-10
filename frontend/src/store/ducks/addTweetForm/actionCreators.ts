import {
    AddTweetFormTypes,
    ClearScheduleDateActionInterface,
    FetchGifsActionInterface,
    RemoveGifActionInterface,
    RemoveImagesActionInterface,
    RemoveSelectedUserActionInterface,
    ResetAddTweetFormStateActionInterface,
    ResetGifsActionInterface,
    SetClosePollActionInterface,
    SetGifActionInterface,
    SetGifsActionInterface,
    SetImageDescriptionActionInterface,
    SetImagesActionInterface,
    SetLoadingGifsStateActionInterface,
    SetOpenPollActionInterface,
    SetPollValueActionInterface,
    SetReplyTypeActionInterface,
    SetScheduleDateActionInterface,
    SetSelectedUserActionInterface
} from "./constants/actionTypes";
import { PollInitialState } from "./constants/state";
import { GiphyDataProps } from "../../../types/tweet";
import { LoadingStatus, ReplyType } from "../../../types/common";
import { ImageObj } from "../../../components/AddTweetForm/AddTweetForm";
import { UserResponse } from "../../../types/user";

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

export const setImages = (payload: ImageObj[]): SetImagesActionInterface => ({
    type: AddTweetFormTypes.SET_IMAGES,
    payload
});

export const removeImages = (): RemoveImagesActionInterface => ({
    type: AddTweetFormTypes.REMOVE_IMAGES
});

export const setSelectedUser = (payload: UserResponse): SetSelectedUserActionInterface => ({
    type: AddTweetFormTypes.SET_SELECTED_USER,
    payload
});

export const removeSelectedUser = (payload: UserResponse): RemoveSelectedUserActionInterface => ({
    type: AddTweetFormTypes.REMOVE_SELECTED_USER,
    payload
});

export const resetAddTweetFormState = (): ResetAddTweetFormStateActionInterface => ({
    type: AddTweetFormTypes.RESET_ADD_TWEET_FORM_STATE
});

// gif modal
export const setGifs = (payload: GiphyDataProps[]): SetGifsActionInterface => ({
    type: AddTweetFormTypes.SET_GIFS,
    payload
});

export const fetchGifs = (payload: string): FetchGifsActionInterface => ({
    type: AddTweetFormTypes.FETCH_GIFS,
    payload
});

export const resetGifs = (): ResetGifsActionInterface => ({
    type: AddTweetFormTypes.RESET_GIFS
});

export const setLoadingGifsState = (payload: LoadingStatus): SetLoadingGifsStateActionInterface => ({
    type: AddTweetFormTypes.SET_LOADING_STATE,
    payload
});
