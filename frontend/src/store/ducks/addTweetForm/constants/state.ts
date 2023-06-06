import { GiphyDataProps } from "../../../../types/tweet";
import { ReplyType } from "../../../../types/common";
import { ImageObj } from "../../../../components/AddTweetForm/AddTweetForm";

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
}
