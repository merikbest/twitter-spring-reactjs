import { AxiosResponse } from "axios";
import { takeEvery } from "redux-saga/effects";

import {
    createListRequest,
    fetchListsRequest,
    fetchPinnedListsRequest,
    fetchSimpleListsRequest,
    fetchTweetListsWhichUserInRequest,
    fetchUserListsByIdRequest,
    fetchUserListsRequest,
    followListRequest,
    listsSaga,
    pinListRequest,
    processUserToListsRequest,
    unfollowListRequest,
    unpinListRequest
} from "../sagas";
import {
    createList,
    fetchSimpleLists,
    fetchUserListsById,
    followList,
    pinList,
    processUserToLists,
    setCreatedList,
    setFollowList,
    setLists,
    setLoadingState,
    setPinedList,
    setPinedListToUserList,
    setPinnedLists,
    setPinnedListsLoadingState,
    setSimpleLists,
    setSimpleListsLoadingState,
    setUnfollowList,
    setUnpinList,
    setUserLists,
    setUserListsLoadingState,
    unfollowList,
    unpinList
} from "../actionCreators";
import { testCall, testLoadingStatus, testSetResponse, testWatchSaga } from "../../../../util/test-utils/test-helper";
import { ListsApi } from "../../../../services/api/lists-service/listsApi";
import { ListResponse, ListUserResponse, PinnedListResponse, SimpleListResponse } from "../../../../types/lists";
import { ListsRequest, AddUserToListsRequest } from "../contracts/state";
import { updateFollowToFullList } from "../../list/actionCreators";
import { updateFollowListDetail } from "../../listDetail/actionCreators";
import { ListsActionType } from "../contracts/actionTypes";
import { LoadingStatus } from "../../../../types/common";

describe("listsSaga:", () => {
    const mockListResponse = { data: [{ id: 1 }, { id: 2 }] } as AxiosResponse<ListResponse[]>;
    const mockListUserResponse = { data: [{ id: 1 }, { id: 2 }] } as AxiosResponse<ListUserResponse[]>;
    const mockPinnedListResponse = { data: [{ id: 1 }, { id: 2 }] } as AxiosResponse<PinnedListResponse[]>;

    describe("fetchListsRequest:", () => {
        const worker = fetchListsRequest();
        testLoadingStatus(worker, setLoadingState, LoadingStatus.LOADING);
        testCall(worker, ListsApi.getAllTweetLists);
        testSetResponse(worker, mockListResponse, setLists, mockListResponse.data, "ListResponse");
        testLoadingStatus(worker, setLoadingState, LoadingStatus.ERROR);
    });

    describe("fetchUserListsRequest:", () => {
        const worker = fetchUserListsRequest();
        testLoadingStatus(worker, setUserListsLoadingState, LoadingStatus.LOADING);
        testCall(worker, ListsApi.getUserTweetLists);
        testSetResponse(worker, mockListUserResponse, setUserLists, mockListUserResponse.data, "ListUserResponse");
        testLoadingStatus(worker, setUserListsLoadingState, LoadingStatus.ERROR);
    });

    describe("fetchUserListsByIdRequest:", () => {
        const worker = fetchUserListsByIdRequest(fetchUserListsById(1));
        testLoadingStatus(worker, setLoadingState, LoadingStatus.LOADING);
        testCall(worker, ListsApi.getUserTweetListsById, 1);
        testSetResponse(worker, mockListResponse, setLists, mockListResponse.data, "ListUserResponse");
        testLoadingStatus(worker, setLoadingState, LoadingStatus.ERROR);
    });

    describe("fetchTweetListsWhichUserInRequest:", () => {
        const worker = fetchTweetListsWhichUserInRequest();
        testLoadingStatus(worker, setLoadingState, LoadingStatus.LOADING);
        testCall(worker, ListsApi.getTweetListsWhichUserIn);
        testSetResponse(worker, mockListResponse, setLists, mockListResponse.data, "ListResponse");
        testLoadingStatus(worker, setLoadingState, LoadingStatus.ERROR);
    });

    describe("fetchPinnedListsRequest:", () => {
        const worker = fetchPinnedListsRequest();
        testLoadingStatus(worker, setPinnedListsLoadingState, LoadingStatus.LOADING);
        testCall(worker, ListsApi.getUserPinnedLists);
        testSetResponse(worker, mockPinnedListResponse, setPinnedLists, mockPinnedListResponse.data, "PinnedListResponse");
        testLoadingStatus(worker, setPinnedListsLoadingState, LoadingStatus.ERROR);
    });

    describe("fetchSimpleListsRequest:", () => {
        const mockSimpleListResponse = { data: [{ id: 1 }, { id: 2 }] } as AxiosResponse<SimpleListResponse[]>;
        const worker = fetchSimpleListsRequest(fetchSimpleLists(1));
        testLoadingStatus(worker, setSimpleListsLoadingState, LoadingStatus.LOADING);
        testCall(worker, ListsApi.getListsToAddUser, 1);
        testSetResponse(worker, mockSimpleListResponse, setSimpleLists, mockSimpleListResponse.data, "SimpleListResponse");
        testLoadingStatus(worker, setSimpleListsLoadingState, LoadingStatus.ERROR);
    });

    describe("createListRequest:", () => {
        const mockListUserResponse = { data: { id: 1 } } as AxiosResponse<ListUserResponse>;
        const mockAddLists = { name: "test", description: "test", isPrivate: true } as ListsRequest;
        const worker = createListRequest(createList(mockAddLists));
        testLoadingStatus(worker, setLoadingState, LoadingStatus.LOADING);
        testCall(worker, ListsApi.createTweetList, mockAddLists);
        testSetResponse(worker, mockListUserResponse, setCreatedList, mockListUserResponse.data, "ListUserResponse");
        testLoadingStatus(worker, setLoadingState, LoadingStatus.ERROR);
    });

    describe("pinListRequest:", () => {
        const mockPinnedListResponse = { data: { id: 1 } } as AxiosResponse<PinnedListResponse>;
        const worker = pinListRequest(pinList(1));
        testCall(worker, ListsApi.pinList, 1);
        testSetResponse(worker, mockPinnedListResponse, setPinedList, mockPinnedListResponse.data, "PinnedListResponse");
        testSetResponse(worker, mockPinnedListResponse, setPinedListToUserList, mockPinnedListResponse.data, "PinnedListResponse");
        testLoadingStatus(worker, setLoadingState, LoadingStatus.ERROR);
    });

    describe("unpinListRequest:", () => {
        const mockPinnedListResponse = { data: { id: 1 } } as AxiosResponse<PinnedListResponse>;
        const worker = unpinListRequest(unpinList(1));
        testCall(worker, ListsApi.pinList, 1);
        testSetResponse(worker, mockPinnedListResponse, setUnpinList, mockPinnedListResponse.data, "PinnedListResponse");
        testSetResponse(worker, mockPinnedListResponse, setPinedListToUserList, mockPinnedListResponse.data, "PinnedListResponse");
        testLoadingStatus(worker, setLoadingState, LoadingStatus.ERROR);
    });

    describe("followListRequest:", () => {
        const mockListUserResponse = { data: { id: 1 } } as AxiosResponse<ListUserResponse>;
        const worker = followListRequest(followList(1));
        testCall(worker, ListsApi.followList, 1);
        testSetResponse(worker, mockListUserResponse, setFollowList, mockListUserResponse.data, "ListUserResponse");
        testSetResponse(worker, mockPinnedListResponse, updateFollowToFullList, true, "true");
        testSetResponse(worker, mockPinnedListResponse, updateFollowListDetail, true, "true");
        testLoadingStatus(worker, setLoadingState, LoadingStatus.ERROR);
    });

    describe("unfollowListRequest:", () => {
        const mockListUserResponse = { data: { id: 1 } } as AxiosResponse<ListUserResponse>;
        const worker = unfollowListRequest(unfollowList(1));
        testCall(worker, ListsApi.followList, 1);
        testSetResponse(worker, mockListUserResponse, setUnfollowList, mockListUserResponse.data, "ListUserResponse");
        testSetResponse(worker, mockPinnedListResponse, updateFollowToFullList, false, "false");
        testSetResponse(worker, mockPinnedListResponse, updateFollowListDetail, false, "false");
        testLoadingStatus(worker, setLoadingState, LoadingStatus.ERROR);
    });

    describe("processUserToListsRequest:", () => {
        const mockAddUserToListsRequest = { userId: 1 } as AddUserToListsRequest;
        const worker = processUserToListsRequest(processUserToLists(mockAddUserToListsRequest));

        testCall(worker, ListsApi.addUserToLists, mockAddUserToListsRequest);
        testLoadingStatus(worker, setLoadingState, LoadingStatus.ERROR);
    });

    testWatchSaga(listsSaga, [
        { actionType: ListsActionType.FETCH_LISTS, workSaga: fetchListsRequest },
        { actionType: ListsActionType.FETCH_USER_LISTS, workSaga: fetchUserListsRequest },
        { actionType: ListsActionType.FETCH_USER_LISTS_BY_ID, workSaga: fetchUserListsByIdRequest },
        { actionType: ListsActionType.FETCH_TWEET_LISTS_WHICH_USER_IN, workSaga: fetchTweetListsWhichUserInRequest },
        { actionType: ListsActionType.FETCH_PINNED_LISTS, workSaga: fetchPinnedListsRequest },
        { actionType: ListsActionType.FETCH_SIMPLE_LISTS, workSaga: fetchSimpleListsRequest },
        { actionType: ListsActionType.CREATE_LIST, workSaga: createListRequest },
        { actionType: ListsActionType.PIN_LIST, workSaga: pinListRequest },
        { actionType: ListsActionType.UNPIN_LIST, workSaga: unpinListRequest },
        { actionType: ListsActionType.FOLLOW_LIST, workSaga: followListRequest },
        { actionType: ListsActionType.UNFOLLOW_LIST, workSaga: unfollowListRequest },
        { actionType: ListsActionType.PROCESS_USER_TO_LISTS, workSaga: processUserToListsRequest }
    ], takeEvery);
});
