import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { testApiCall } from "../../../../util/test-utils/api-test-helper";
import { API_TWEETS_POOL, API_TWEETS_VOTE } from "../../../../constants/endpoint-constants";
import { mockFullTweet } from "../../../../util/test-utils/mock-test-data";
import { PollApi } from "../pollApi";

describe("PollApi", () => {
    const mockAdapter = new MockAdapter(axios);
    const tweetNotFoundError = "Tweet not found";

    beforeEach(() => mockAdapter.reset());

    describe("should fetch PollApi.createPoll", () => {
        const mockPoll = { id: 1, text: "test", choices: ["choice 1", "choice 2"] };

        it("[200] should create poll Success", () => {
            testApiCall(mockAdapter, "onPost", API_TWEETS_POOL, 200, mockFullTweet, PollApi.createPoll, mockPoll);
        });
    });

    describe("should fetch PollApi.voteInPoll", () => {
        const mockVote = { tweetId: 1, pollId: 1, pollChoiceId: 1 };

        it("[200] should vote in poll Success", () => {
            testApiCall(mockAdapter, "onPost", API_TWEETS_VOTE, 200, mockFullTweet, PollApi.voteInPoll, mockVote);
        });

        it("[404] should return tweet Not Found", () => {
            testApiCall(mockAdapter, "onPost", API_TWEETS_VOTE, 404, tweetNotFoundError, PollApi.voteInPoll, mockVote);
        });
    });
});
