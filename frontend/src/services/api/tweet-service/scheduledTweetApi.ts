import { AxiosResponse } from "axios";

import { TweetResponse } from "../../../types/tweet";
import { axios } from "../../../core/axios";
import { UI_V1_TWEETS_SCHEDULE } from "../../../constants/endpoint-constants";
import { TweetRequest } from "../../../store/ducks/tweets/contracts/state";

export const ScheduledTweetApi = {
    async getScheduledTweets(pageNumber: number): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(UI_V1_TWEETS_SCHEDULE, { params: { page: pageNumber } });
    },
    async createScheduledTweet(request: TweetRequest): Promise<AxiosResponse<TweetResponse>> {
        return await axios.post<TweetResponse>(UI_V1_TWEETS_SCHEDULE, request);
    },
    async updateScheduledTweet(request: TweetRequest): Promise<AxiosResponse<TweetResponse>> {
        return await axios.put<TweetResponse>(UI_V1_TWEETS_SCHEDULE, request);
    },
    async deleteScheduledTweets(request: { tweetsIds: number[] }): Promise<AxiosResponse<string>> {
        return await axios.delete<string>(UI_V1_TWEETS_SCHEDULE, { data: request });
    },
};
