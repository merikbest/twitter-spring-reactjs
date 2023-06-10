import { Action } from "redux";

import { PollInitialState } from "./state";
import { GiphyDataProps } from "../../../../types/tweet";
import { LoadingStatus, ReplyType } from "../../../../types/common";
import { ImageObj } from "../../../../components/AddTweetForm/AddTweetForm";
import { UserResponse } from "../../../../types/user";

export enum AddTweetFormTypes {
    SET_OPEN_POLL = "addTweetForm/SET_OPEN_POLL",
    SET_CLOSE_POLL = "addTweetForm/SET_CLOSE_POLL",
    SET_POLL_VALUE = "addTweetForm/SET_POLL_VALUE",
    SET_GIF = "addTweetForm/SET_GIF",
    REMOVE_GIF = "addTweetForm/REMOVE_GIF",
    SET_SCHEDULE_DATE = "addTweetForm/SET_SCHEDULE_DATE",
    CLEAR_SCHEDULE_DATE = "addTweetForm/CLEAR_SCHEDULE_DATE",
    SET_REPLY_TYPE = "addTweetForm/SET_REPLY_TYPE",
    SET_IMAGE_DESCRIPTION = "addTweetForm/SET_IMAGE_DESCRIPTION",
    SET_IMAGES = "addTweetForm/SET_IMAGES",
    REMOVE_IMAGES = "addTweetForm/REMOVE_IMAGES",
    SET_SELECTED_USER = "addTweetForm/SET_SELECTED_USER",
    REMOVE_SELECTED_USER = "addTweetForm/REMOVE_SELECTED_USER",
    RESET_ADD_TWEET_FORM_STATE = "addTweetForm/RESET_ADD_TWEET_FORM_STATE",
    // gif modal
    SET_GIFS = "addTweetForm/SET_GIFS",
    FETCH_GIFS = "addTweetForm/FETCH_GIFS",
    RESET_GIFS = "addTweetForm/RESET_GIFS",
    SET_LOADING_STATE = "addTweetForm/SET_LOADING_STATE",
}

export interface SetOpenPollActionInterface extends Action<AddTweetFormTypes> {
    type: AddTweetFormTypes.SET_OPEN_POLL;
}

export interface SetClosePollActionInterface extends Action<AddTweetFormTypes> {
    type: AddTweetFormTypes.SET_CLOSE_POLL;
}

export interface SetPollValueActionInterface extends Action<AddTweetFormTypes> {
    type: AddTweetFormTypes.SET_POLL_VALUE;
    payload: PollInitialState;
}

export interface SetGifActionInterface extends Action<AddTweetFormTypes> {
    type: AddTweetFormTypes.SET_GIF;
    payload: GiphyDataProps;
}

export interface RemoveGifActionInterface extends Action<AddTweetFormTypes> {
    type: AddTweetFormTypes.REMOVE_GIF;
}

export interface SetScheduleDateActionInterface extends Action<AddTweetFormTypes> {
    type: AddTweetFormTypes.SET_SCHEDULE_DATE;
    payload: Date;
}

export interface ClearScheduleDateActionInterface extends Action<AddTweetFormTypes> {
    type: AddTweetFormTypes.CLEAR_SCHEDULE_DATE;
}

export interface SetReplyTypeActionInterface extends Action<AddTweetFormTypes> {
    type: AddTweetFormTypes.SET_REPLY_TYPE;
    payload: ReplyType;
}

export interface SetImageDescriptionActionInterface extends Action<AddTweetFormTypes> {
    type: AddTweetFormTypes.SET_IMAGE_DESCRIPTION;
    payload: string;
}

export interface SetImagesActionInterface extends Action<AddTweetFormTypes> {
    type: AddTweetFormTypes.SET_IMAGES;
    payload: ImageObj[];
}

export interface RemoveImagesActionInterface extends Action<AddTweetFormTypes> {
    type: AddTweetFormTypes.REMOVE_IMAGES;
}

export interface SetSelectedUserActionInterface extends Action<AddTweetFormTypes> {
    type: AddTweetFormTypes.SET_SELECTED_USER;
    payload: UserResponse;
}

export interface RemoveSelectedUserActionInterface extends Action<AddTweetFormTypes> {
    type: AddTweetFormTypes.REMOVE_SELECTED_USER;
    payload: UserResponse;
}

export interface ResetAddTweetFormStateActionInterface extends Action<AddTweetFormTypes> {
    type: AddTweetFormTypes.RESET_ADD_TWEET_FORM_STATE;
}

// gif modal
export interface SetGifsActionInterface extends Action<AddTweetFormTypes> {
    type: AddTweetFormTypes.SET_GIFS;
    payload: GiphyDataProps[];
}

export interface FetchGifsActionInterface extends Action<AddTweetFormTypes> {
    type: AddTweetFormTypes.FETCH_GIFS;
    payload: string;
}

export interface ResetGifsActionInterface extends Action<AddTweetFormTypes> {
    type: AddTweetFormTypes.RESET_GIFS;
}

export interface SetLoadingGifsStateActionInterface extends Action<AddTweetFormTypes> {
    type: AddTweetFormTypes.SET_LOADING_STATE;
    payload: LoadingStatus;
}

export type AddTweetFormActions =
    SetOpenPollActionInterface |
    SetClosePollActionInterface |
    SetPollValueActionInterface |
    SetGifActionInterface |
    RemoveGifActionInterface |
    SetScheduleDateActionInterface |
    ClearScheduleDateActionInterface |
    SetReplyTypeActionInterface |
    SetImageDescriptionActionInterface |
    SetImagesActionInterface |
    RemoveImagesActionInterface |
    SetSelectedUserActionInterface |
    RemoveSelectedUserActionInterface |
    ResetAddTweetFormStateActionInterface |
    SetGifsActionInterface |
    ResetGifsActionInterface |
    SetLoadingGifsStateActionInterface
