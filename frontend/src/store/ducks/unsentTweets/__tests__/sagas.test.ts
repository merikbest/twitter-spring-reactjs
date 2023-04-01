import { AxiosResponse } from "axios";

import { testCall, testLoadingStatus, testSetResponse, testWatchSaga } from "../../../../util/test-utils/test-helper";
import { fetchUnsentTweetsRequest, unsentTweetsSaga } from "../sagas";
import { fetchUnsentTweets, setUnsentTweets, setUnsentTweetsLoadingState } from "../actionCreators";
import { TweetResponse } from "../../../../types/tweet";
import { UnsentTweetActionType } from "../contracts/actionTypes";
import { LoadingStatus } from "../../../../types/common";
import { PAGE_TOTAL_COUNT } from "../../../../constants/common-constants";
import { ScheduledTweetApi } from "../../../../services/api/tweet-service/scheduledTweetApi";

describe("unsentTweetsSaga:", () => {

    describe("fetchUnsentTweetsRequest:", () => {
        const mockTweets = [{ id: 1 }, { id: 2 }] as TweetResponse[];
        const mockPageableTweets = {
            data: mockTweets,
            headers: { PAGE_TOTAL_COUNT: 1 }
        } as AxiosResponse<TweetResponse[]>;
        const worker = fetchUnsentTweetsRequest(fetchUnsentTweets(1));

        testLoadingStatus(worker, setUnsentTweetsLoadingState, LoadingStatus.LOADING);
        testCall(worker, ScheduledTweetApi.getScheduledTweets, 1);
        testSetResponse(worker, mockPageableTweets, setUnsentTweets, {
            items: mockPageableTweets.data,
            pagesCount: parseInt(mockPageableTweets.headers[PAGE_TOTAL_COUNT])
        }, "TweetResponse");
        testLoadingStatus(worker, setUnsentTweetsLoadingState, LoadingStatus.ERROR);
    });

    testWatchSaga(unsentTweetsSaga, [
        { actionType: UnsentTweetActionType.FETCH_UNSENT_TWEETS, workSaga: fetchUnsentTweetsRequest }
    ]);
});
