import { Action } from "redux";

import { PollInitialState } from "./state";
import { GiphyDataProps } from "../../../../types/tweet";
import { ReplyType } from "../../../../types/common";
import { ImageObj } from "../../../../components/AddTweetForm/AddTweetForm";

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
    CLEAR_IMAGE_DESCRIPTION = "addTweetForm/CLEAR_IMAGE_DESCRIPTION",
    SET_IMAGES = "addTweetForm/SET_IMAGES",
    REMOVE_IMAGES = "addTweetForm/REMOVE_IMAGES",
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

export interface ClearImageDescriptionActionInterface extends Action<AddTweetFormTypes> {
    type: AddTweetFormTypes.CLEAR_IMAGE_DESCRIPTION;
}

export interface SetImagesActionInterface extends Action<AddTweetFormTypes> {
    type: AddTweetFormTypes.SET_IMAGES;
    payload: ImageObj[];
}

export interface RemoveImagesActionInterface extends Action<AddTweetFormTypes> {
    type: AddTweetFormTypes.REMOVE_IMAGES;
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
    ClearImageDescriptionActionInterface |
    SetImagesActionInterface |
    RemoveImagesActionInterface
