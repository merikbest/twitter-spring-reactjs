import { AxiosResponse } from "axios";

import { UserTweetRequest } from "../../../store/ducks/userTweets/contracts/state";
import { TweetResponse } from "../../../types/tweet";
import { axios } from "../../../core/axios";
import {
    API_TWEETS_RETWEET,
    API_TWEETS_RETWEETED_USERS,
    API_TWEETS_USER_REPLIES
} from "../../../constants/endpoint-constants";
import { FetchTweetUsersPayload } from "../../../store/ducks/tweet/contracts/state";
import { UserResponse } from "../../../types/user";
import { TweetActionPayload } from "../../../store/ducks/tweets/contracts/state";
import { NotificationTweetResponse } from "../../../types/notification";

export const RetweetApi = {
    async getUserRetweetsAndReplies({ userId, page }: UserTweetRequest): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(API_TWEETS_USER_REPLIES(userId), { params: { page: page } });
    },
    async getRetweetedUsersByTweetId({ tweetId, pageNumber }: FetchTweetUsersPayload): Promise<AxiosResponse<UserResponse[]>> {
        return await axios.get<UserResponse[]>(API_TWEETS_RETWEETED_USERS(tweetId), { params: { page: pageNumber } });
    },
    async retweet({ userId, tweetId }: TweetActionPayload): Promise<AxiosResponse<NotificationTweetResponse>> {
        return await axios.get<NotificationTweetResponse>(`${API_TWEETS_RETWEET}/${userId ?? 0}/${tweetId}`);
    }
};
