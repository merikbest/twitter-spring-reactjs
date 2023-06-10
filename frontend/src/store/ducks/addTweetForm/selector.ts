import { RootState } from "../../store";
import { AddTweetFormState } from "./constants/state";
import { LoadingStatus } from "../../../types/common";

export const selectAddTweetFormState = (state: RootState): AddTweetFormState => state.addTweetForm;
export const selectVisiblePoll = (state: RootState) => selectAddTweetFormState(state).visiblePoll;
export const selectPollData = (state: RootState) => selectAddTweetFormState(state).pollData;
export const selectGif = (state: RootState) => selectAddTweetFormState(state).gif;
export const selectScheduledDate = (state: RootState) => selectAddTweetFormState(state).scheduledDate;
export const selectReplyType = (state: RootState) => selectAddTweetFormState(state).replyType;
export const selectImages = (state: RootState) => selectAddTweetFormState(state).images;
export const selectImageDescription = (state: RootState) => selectAddTweetFormState(state).imageDescription;
export const selectSelectedUsers = (state: RootState) => selectAddTweetFormState(state).selectedUsers;
export const selectGifs = (state: RootState) => selectAddTweetFormState(state).gifs;
export const selectIsGifsLoading = (state: RootState) => selectAddTweetFormState(state).loadingState === LoadingStatus.LOADING;
export const selectIsGifsLoaded = (state: RootState) => selectAddTweetFormState(state).loadingState === LoadingStatus.LOADED;
