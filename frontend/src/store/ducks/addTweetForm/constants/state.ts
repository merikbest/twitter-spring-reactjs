import { GiphyDataProps } from "../../../../types/tweet";
import { LoadingStatus, ReplyType } from "../../../../types/common";
import { ImageObj } from "../../../../components/AddTweetForm/AddTweetForm";
import { UserResponse } from "../../../../types/user";

export interface PollInitialState {
    choice1: string;
    choice2: string;
    choice3: string;
    choice4: string;
    day: number;
    hour: number;
    minute: number;
}

export interface AddTweetFormState {
    visiblePoll: boolean;
    pollData: PollInitialState;
    gif: GiphyDataProps | null;
    scheduledDate: Date | null;
    replyType: ReplyType;
    imageDescription: string;
    images: ImageObj[];
    selectedUsers: UserResponse[];
    // gif modal
    gifs: GiphyDataProps[];
    loadingState: LoadingStatus;
}
