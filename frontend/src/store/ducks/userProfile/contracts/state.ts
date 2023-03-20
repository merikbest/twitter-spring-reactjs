import { UserProfileResponse } from "../../../../types/user";
import { TweetImageResponse } from "../../../../types/tweet";
import { LoadingStatus } from "../../../../types/common";

export interface UserProfileState {
    user: UserProfileResponse | undefined;
    images: TweetImageResponse[];
    imagesLoadingState: LoadingStatus;
    loadingState: LoadingStatus;
}

export interface ChatParticipantRequest {
    participantId: number;
    chatId: number;
}
