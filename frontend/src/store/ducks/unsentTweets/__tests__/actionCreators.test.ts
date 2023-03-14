import { testAction } from "../../../../util/test-utils/test-helper";
import { fetchUnsentTweets, resetUnsentTweets, setUnsentTweets, setUnsentTweetsLoadingState } from "../actionCreators";
import { TweetResponse } from "../../../../types/tweet";
import { UnsentTweetActionType } from "../contracts/actionTypes";
import { LoadingStatus } from "../../../../types/common";

describe("unsentTweets actions", () => {
    testAction(setUnsentTweets, setUnsentTweets({ items: [{ id: 1 }] as TweetResponse[], pagesCount: 1 }), {
        type: UnsentTweetActionType.SET_UNSENT_TWEETS,
        payload: { items: [{ id: 1 }] as TweetResponse[], pagesCount: 1 }
    });

    testAction(fetchUnsentTweets, fetchUnsentTweets(1), {
        type: UnsentTweetActionType.FETCH_UNSENT_TWEETS,
        payload: 1
    });

    testAction(resetUnsentTweets, resetUnsentTweets(), {
        type: UnsentTweetActionType.RESET_UNSENT_TWEETS
    });

    testAction(setUnsentTweetsLoadingState, setUnsentTweetsLoadingState(LoadingStatus.LOADING), {
        type: UnsentTweetActionType.SET_LOADING_STATE,
        payload: LoadingStatus.LOADING
    });
});
