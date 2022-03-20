import {
    fetchUserLikedTweetsRequest,
    fetchUserMediaTweetsRequest,
    fetchUserRetweetsAndRepliesRequest,
    fetchUserTweetsRequest,
    userTweetsSaga
} from "./sagas";
import {
    fetchUserLikedTweets,
    fetchUserMediaTweets,
    fetchUserRetweetsAndReplies,
    fetchUserTweets,
    setUserTweets,
    setUserTweetsLoadingStatus
} from "./actionCreators";
import {LoadingStatus} from "../../types";
import {testCall, testLoadingStatus, testSetResponse, testWatchSaga} from "../../../util/testHelper";
import {UserApi} from "../../../services/api/userApi";
import {AxiosResponse} from "axios";
import {TweetResponse} from "../../types/tweet";
import {UserTweetsActionType} from "./contracts/actionTypes";

describe("userTweetsSaga:", () => {
    const mockTweets = [{id: 1}, {id: 2}] as TweetResponse[];
    const mockPageableTweets = {data: mockTweets, headers: {"page-total-count": 1}} as AxiosResponse<TweetResponse[]>;

    describe("fetchUserTweetsRequest:", () => {
        const worker = fetchUserTweetsRequest(fetchUserTweets({userId: "1", page: 1}));

        testLoadingStatus(worker, setUserTweetsLoadingStatus, LoadingStatus.LOADING);
        testCall(worker, UserApi.getUserTweets, {userId: "1", page: 1});
        testSetResponse(worker, mockPageableTweets, setUserTweets, {
            items: mockPageableTweets.data,
            pagesCount: parseInt(mockPageableTweets.headers["page-total-count"])
        }, "TweetResponse");
        testLoadingStatus(worker, setUserTweetsLoadingStatus, LoadingStatus.ERROR)
    });

    describe("fetchUserLikedTweetsRequest:", () => {
        const worker = fetchUserLikedTweetsRequest(fetchUserLikedTweets({userId: "1", page: 1}));

        testLoadingStatus(worker, setUserTweetsLoadingStatus, LoadingStatus.LOADING);
        testCall(worker, UserApi.getUserLikedTweets, {userId: "1", page: 1});
        testSetResponse(worker, mockPageableTweets, setUserTweets, {
            items: mockPageableTweets.data,
            pagesCount: parseInt(mockPageableTweets.headers["page-total-count"])
        }, "TweetResponse");
        testLoadingStatus(worker, setUserTweetsLoadingStatus, LoadingStatus.ERROR)
    });

    describe("fetchUserMediaTweetsRequest:", () => {
        const worker = fetchUserMediaTweetsRequest(fetchUserMediaTweets({userId: "1", page: 1}));

        testLoadingStatus(worker, setUserTweetsLoadingStatus, LoadingStatus.LOADING);
        testCall(worker, UserApi.getUserMediaTweets, {userId: "1", page: 1});
        testSetResponse(worker, mockPageableTweets, setUserTweets, {
            items: mockPageableTweets.data,
            pagesCount: parseInt(mockPageableTweets.headers["page-total-count"])
        }, "TweetResponse");
        testLoadingStatus(worker, setUserTweetsLoadingStatus, LoadingStatus.ERROR)
    });

    describe("fetchUserRetweetsAndReplies:", () => {
        const worker = fetchUserRetweetsAndRepliesRequest(fetchUserRetweetsAndReplies({userId: "1", page: 1}));

        testLoadingStatus(worker, setUserTweetsLoadingStatus, LoadingStatus.LOADING);
        testCall(worker, UserApi.getUserRetweetsAndReplies, {userId: "1", page: 1});
        testSetResponse(worker, mockPageableTweets, setUserTweets, {
            items: mockPageableTweets.data,
            pagesCount: parseInt(mockPageableTweets.headers["page-total-count"])
        }, "TweetResponse");
        testLoadingStatus(worker, setUserTweetsLoadingStatus, LoadingStatus.ERROR)
    });

    testWatchSaga(userTweetsSaga, [
        {actionType: UserTweetsActionType.FETCH_TWEETS, workSaga: fetchUserTweetsRequest},
        {actionType: UserTweetsActionType.FETCH_LIKED_TWEETS, workSaga: fetchUserLikedTweetsRequest},
        {actionType: UserTweetsActionType.FETCH_MEDIA_TWEETS, workSaga: fetchUserMediaTweetsRequest},
        {actionType: UserTweetsActionType.FETCH_RETWEETS_AND_REPLIES, workSaga: fetchUserRetweetsAndRepliesRequest},
    ]);
});
