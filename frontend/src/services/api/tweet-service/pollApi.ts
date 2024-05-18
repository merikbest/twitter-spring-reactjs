import { AxiosResponse } from "axios";

import { TweetRequest, VoteRequest } from "../../../store/ducks/tweets/contracts/state";
import { TweetResponse } from "../../../types/tweet";
import { axios } from "../../../core/axios";
import { UI_V1_TWEETS_POOL, UI_V1_TWEETS_VOTE } from "../../../constants/endpoint-constants";

export const PollApi = {
    async createPoll(request: TweetRequest): Promise<AxiosResponse<TweetResponse>> {
        return await axios.post<TweetResponse>(UI_V1_TWEETS_POOL, request);
    },
    async voteInPoll(payload: VoteRequest): Promise<AxiosResponse<TweetResponse>> {
        return await axios.post<TweetResponse>(UI_V1_TWEETS_VOTE, payload);
    }
};
