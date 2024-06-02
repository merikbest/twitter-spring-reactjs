import { testAction } from "../../../../util/test-utils/test-helper";
import {
    deleteList,
    deleteListTweet,
    editList,
    fetchListById,
    fetchTweetsByListId,
    resetListState,
    setBlockedToListTweetsState,
    setFollowToListTweetsState,
    setList,
    setListLoadingState,
    setListTweets,
    setMembersSize,
    setMutedToListTweetsState,
    setTweetsLoadingState,
    setUpdatedBookmarkedListTweetTweetsState,
    setUpdatedListTweet,
    setVoteListTweet,
    updateFollowToFullList
} from "../actionCreators";
import { ListActionType } from "../contracts/actionTypes";
import { BaseListResponse } from "../../../../types/lists";
import { EditListsRequest } from "../contracts/state";
import { LoadingStatus } from "../../../../types/common";
import { NotificationResponse } from "../../../../types/notification";
import { TweetResponse } from "../../../../types/tweet";

describe("list actions", () => {
    testAction(setList, setList({ id: 1 } as BaseListResponse), {
        type: ListActionType.SET_LIST,
        payload: { id: 1 } as BaseListResponse
    });

    testAction(updateFollowToFullList, updateFollowToFullList(true), {
        type: ListActionType.UPDATE_FOLLOW_TO_FULL_LIST,
        payload: true
    });

    testAction(setMembersSize, setMembersSize(true), {
        type: ListActionType.SET_MEMBERS_SIZE,
        payload: true
    });

    testAction(fetchListById, fetchListById(1), {
        type: ListActionType.FETCH_LIST_BY_ID,
        payload: 1
    });

    testAction(fetchTweetsByListId, fetchTweetsByListId({ listId: 1, pageNumber: 1 }), {
        type: ListActionType.FETCH_TWEETS_BY_LIST_ID,
        payload: { listId: 1, pageNumber: 1 }
    });

    testAction(setListTweets, setListTweets({ items: [], pagesCount: 1 }), {
        type: ListActionType.SET_LIST_TWEETS,
        payload: { items: [], pagesCount: 1 }
    });

    testAction(setUpdatedListTweet, setUpdatedListTweet({ id: 1 } as NotificationResponse), {
        type: ListActionType.SET_UPDATED_LIST_TWEET,
        payload: { id: 1 } as NotificationResponse
    });

    testAction(setUpdatedBookmarkedListTweetTweetsState, setUpdatedBookmarkedListTweetTweetsState({
        tweetId: 1,
        isTweetBookmarked: true
    }), {
        type: ListActionType.SET_UPDATED_BOOKMARKED_LIST_TWEET,
        payload: { tweetId: 1, isTweetBookmarked: true }
    });

    testAction(setFollowToListTweetsState, setFollowToListTweetsState({ userId: 1, tweetId: 1, isFollower: true }), {
        type: ListActionType.SET_FOLLOW_TO_LIST_TWEETS_STATE,
        payload: { userId: 1, tweetId: 1, isFollower: true }
    });

    testAction(setBlockedToListTweetsState, setBlockedToListTweetsState({ userId: 1, tweetId: 1, isUserBlocked: true }), {
        type: ListActionType.SET_BLOCKED_TO_LIST_TWEETS_STATE,
        payload: { userId: 1, tweetId: 1, isUserBlocked: true }
    });

    testAction(setMutedToListTweetsState, setMutedToListTweetsState({ userId: 1, tweetId: 1, isUserMuted: true }), {
        type: ListActionType.SET_MUTED_TO_LIST_TWEETS_STATE,
        payload: { userId: 1, tweetId: 1, isUserMuted: true }
    });

    testAction(setVoteListTweet, setVoteListTweet({ id: 1 } as TweetResponse), {
        type: ListActionType.SET_VOTE_LIST_TWEET,
        payload: { id: 1 } as TweetResponse
    });

    testAction(deleteListTweet, deleteListTweet(1), {
        type: ListActionType.DELETE_LIST_TWEET,
        payload: 1
    });

    testAction(setTweetsLoadingState, setTweetsLoadingState(LoadingStatus.LOADING), {
        type: ListActionType.SET_TWEETS_LOADING_STATE,
        payload: LoadingStatus.LOADING
    });

    testAction(editList, editList({ id: 1 } as EditListsRequest), {
        type: ListActionType.EDIT_LIST,
        payload: { id: 1 } as EditListsRequest
    });

    testAction(deleteList, deleteList(1), {
        type: ListActionType.DELETE_LIST,
        payload: 1
    });

    testAction(resetListState, resetListState(), {
        type: ListActionType.RESET_LIST_STATE
    });

    testAction(setListLoadingState, setListLoadingState(LoadingStatus.LOADING), {
        type: ListActionType.SET_LOADING_STATE,
        payload: LoadingStatus.LOADING
    });
});
