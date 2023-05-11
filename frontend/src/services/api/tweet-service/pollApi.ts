import { AxiosResponse } from "axios";

import { AddTweet, Vote } from "../../../store/ducks/tweets/contracts/state";
import { TweetResponse } from "../../../types/tweet";
import { axios } from "../../../core/axios";
import { API_TWEETS_POOL, API_TWEETS_VOTE } from "../../../constants/endpoint-constants";

export const PollApi = {
    async createPoll(request: AddTweet): Promise<AxiosResponse<TweetResponse>> {
        return await axios.post<TweetResponse>(API_TWEETS_POOL, request);
    },
    async voteInPoll(payload: Vote): Promise<AxiosResponse<TweetResponse>> {
        return await axios.post<TweetResponse>(API_TWEETS_VOTE, payload);
    }
};
