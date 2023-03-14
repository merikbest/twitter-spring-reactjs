import { initialUnsentTweetsState, unsentTweetsReducer } from "../reducer";
import { UnsentTweetActionType, UnsentTweetsActions } from "../contracts/actionTypes";
import { testActionDispatch } from "../../../../util/test-utils/test-helper";
import { TweetResponse } from "../../../../types/tweet";
import { LoadingStatus } from "../../../../types/common";

describe("unsentTweetsReducer:", () => {

    describe("initial state:", () => {
        it("should return initial state", () => {
            expect(unsentTweetsReducer(undefined, {} as UnsentTweetsActions)).toEqual(initialUnsentTweetsState);
        });
    });

    describe("unsentTweets handlers:", () => {
        testActionDispatch(
            UnsentTweetActionType.SET_UNSENT_TWEETS,
            unsentTweetsReducer(initialUnsentTweetsState, {
                type: UnsentTweetActionType.SET_UNSENT_TWEETS,
                payload: { items: [{ id: 1 }] as TweetResponse[], pagesCount: 1 }
            }),
            {
                ...initialUnsentTweetsState,
                items: [{ id: 1 }] as TweetResponse[],
                pagesCount: 1,
                loadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            UnsentTweetActionType.RESET_UNSENT_TWEETS,
            unsentTweetsReducer({
                ...initialUnsentTweetsState,
                items: [{ id: 1 }] as TweetResponse[],
                pagesCount: 2
            }, {
                type: UnsentTweetActionType.RESET_UNSENT_TWEETS
            }),
            {
                ...initialUnsentTweetsState,
                items: [],
                pagesCount: 0,
                loadingState: LoadingStatus.LOADING
            }
        );

        testActionDispatch(
            UnsentTweetActionType.SET_LOADING_STATE,
            unsentTweetsReducer(initialUnsentTweetsState, {
                type: UnsentTweetActionType.SET_LOADING_STATE,
                payload: LoadingStatus.SUCCESS
            }),
            {
                ...initialUnsentTweetsState,
                loadingState: LoadingStatus.SUCCESS
            }
        );
    });
});
