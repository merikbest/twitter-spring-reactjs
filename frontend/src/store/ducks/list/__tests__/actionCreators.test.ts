import { testAction } from "../../../../util/test-utils/test-helper";
import {
    deleteList,
    editList,
    fetchListById,
    fetchTweetsByListId,
    resetListState,
    setList,
    setListLoadingState,
    setListTweets,
    setMembersSize,
    setTweetsLoadingState,
    updateFollowToFullList
} from "../actionCreators";
import { ListActionType } from "../contracts/actionTypes";
import { BaseListResponse } from "../../../../types/lists";
import { EditListsRequest } from "../contracts/state";
import { LoadingStatus } from "../../../../types/common";

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
