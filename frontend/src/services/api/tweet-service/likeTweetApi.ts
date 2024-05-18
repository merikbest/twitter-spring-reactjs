import { AxiosResponse } from "axios";

import { UserTweetRequest } from "../../../store/ducks/userTweets/contracts/state";
import { TweetResponse } from "../../../types/tweet";
import { axios } from "../../../core/axios";
import { UI_V1_TWEETS_LIKE, UI_V1_TWEETS_ID_LIKED_USERS, UI_V1_TWEETS_LIKED_USER_ID } from "../../../constants/endpoint-constants";
import { FetchTweetUsersPayload } from "../../../store/ducks/tweet/contracts/state";
import { UserResponse } from "../../../types/user";
import { TweetActionPayload } from "../../../store/ducks/tweets/contracts/state";
import { NotificationTweetResponse } from "../../../types/notification";

export const LikeTweetApi = {
    async getUserLikedTweets({ userId, page }: UserTweetRequest): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(UI_V1_TWEETS_LIKED_USER_ID(userId), { params: { page: page } });
    },
    async getLikedUsersByTweetId({ tweetId, pageNumber }: FetchTweetUsersPayload): Promise<AxiosResponse<UserResponse[]>> {
        return await axios.get<UserResponse[]>(UI_V1_TWEETS_ID_LIKED_USERS(tweetId), { params: { page: pageNumber } });
    },
    async likeTweet({ userId, tweetId }: TweetActionPayload): Promise<AxiosResponse<NotificationTweetResponse>> {
        return await axios.get<NotificationTweetResponse>(`${UI_V1_TWEETS_LIKE}/${userId ?? 0}/${tweetId}`);
    }
};
