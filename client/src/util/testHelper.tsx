import React from "react";
import {call, put, takeLatest} from "redux-saga/effects";
import {LoadingStatus} from "../store/types";
import {RootState} from "../store/store";
import {TweetImageResponse, TweetResponse} from "../store/types/tweet";
import {
    AuthUserResponse,
    BlockedUserResponse,
    FollowerUserResponse,
    MutedUserResponse,
    UserDetailResponse,
    UserProfileResponse,
    UserResponse
} from "../store/types/user";
import {ChatMessageResponse, ChatResponse} from "../store/types/chat";
import {
    BaseListResponse,
    ListResponse,
    ListsOwnerMemberResponse,
    ListUserResponse,
    PinnedListResponse,
    SimpleListResponse
} from "../store/types/lists";
import {NotificationInfoResponse, NotificationResponse, NotificationUserResponse} from "../store/types/notification";
import {TagResponse} from "../store/types/tag";

// @ts-ignore
export const testAction = (action, payload, expectedPayload) => {
    describe(`${action.name}`, () => {
        Object.keys(expectedPayload).forEach((key) => {
            it(`should return a payload ${key}`, () => {
                expect(payload[key]).toEqual(expectedPayload[key]);
            });
        });

        it("should have all tested payload properties", () => {
            expect(Object.keys(payload).length).toBe(Object.keys(expectedPayload).length);
        });

        it("should not return undefined", () => {
            expect(payload.type).not.toBe(undefined);
        });
    });
};

// @ts-ignore
export const testActionDispatch = (actionType, actualState, expectedState) => {
    describe(`${actionType} action is dispatched`, () => {
        it("should return the expected state", () => {
            expect(actualState).toEqual(expectedState);
        });
    });
};

// @ts-ignore
export const testLoadingStatus = (worker, loadingAction, loadingStatus) => {
    it(`should yield put ${loadingAction.name} with ${loadingStatus}`, () => {
        let actualYield;
        
        if (loadingStatus === LoadingStatus.ERROR) {
            actualYield = worker.throw("ERROR").value;
        } else {
            actualYield = worker.next().value;
        }
        const expectedYield = put(loadingAction(loadingStatus));

        expect(actualYield).toEqual(expectedYield);
    })
};

// @ts-ignore
export const testCall = (worker, apiCall, payload?, data = {}) => {
    it(`should call ${apiCall.name}`, () => {
        const actualYield = worker.next(data).value;
        let expectedYield;
        
        if (payload !== undefined) {
            expectedYield = call(apiCall, payload);
        } else {
            expectedYield = call(apiCall);
        }

        expect(actualYield).toEqual(expectedYield);
    })
};

// @ts-ignore
export const testSetResponse = (worker, mockData = {}, action, payload: {}, responseType) => {
    it(`should yield put ${action.name} with ${responseType} type`, () => {
        const actualYield = worker.next(mockData).value;
        const expectedYield = put(action(payload));

        expect(actualYield).toEqual(expectedYield);
    });
};

// @ts-ignore
export const testWatchSaga = (watchSaga, requests, effect = takeLatest) => {
    describe(`watch ${watchSaga.name}:`, () => {
        const watcher = watchSaga();
        
        // @ts-ignore
        requests.forEach((request) => {
            it(`should listen to ${request.actionType} and yield ${request.workSaga.name}`, () => {
                const actualYield = watcher.next().value;
                const expectedYield = effect(request.actionType, request.workSaga);

                expect(actualYield).toEqual(expectedYield);
            });
        })
    });
};

export const mockListsOwnerMemberResponse = [{id: 1}, {id: 2}] as ListsOwnerMemberResponse[];
export const mockMutedUserResponse = [{id: 1}, {id: 2}] as MutedUserResponse[];
export const mockBlockedUserResponse = [{id: 1}, {id: 2}] as BlockedUserResponse[];
export const mockChatMessageResponse = [{id: 1}, {id: 2}] as ChatMessageResponse[];
export const mockChatResponse = [{id: 1}, {id: 2}] as ChatResponse[];
export const mockFollowerUserResponse = [{id: 1}, {id: 2}] as FollowerUserResponse[];
export const mockBaseListResponse = {id: 1} as BaseListResponse;
export const mockListResponse = [{id: 1}, {id: 2}] as ListResponse[];
export const mockListUserResponse = [{id: 1}, {id: 2}] as ListUserResponse[];
export const mockPinnedListResponse = [{id: 1}, {id: 2}] as PinnedListResponse[];
export const mockSimpleListResponse = [{id: 1}, {id: 2}] as SimpleListResponse[];
export const mockNotificationResponse = [{id: 1}, {id: 1}] as NotificationResponse[];
export const mockNotificationUserResponse = [{id: 1}, {id: 1}] as NotificationUserResponse[];
export const mockNotificationInfoResponse = {id: 1} as NotificationInfoResponse;
export const mockTagResponse = [{id: 1}, {id: 2}] as TagResponse[];
export const mockTweetResponse = {id: 1} as TweetResponse;
export const mockUserResponse = [{id: 1}, {id: 2}] as UserResponse[];
export const mockTweetResponseArray = [{id: 1}, {id: 2}] as TweetResponse[];
export const mockAuthUserResponse = {id: 1} as AuthUserResponse;
export const mockUserDetailResponse = {id: 1} as UserDetailResponse;
export const mockUserProfileResponse = {id: 1} as UserProfileResponse;
export const mockTweetImageResponse = [{tweetId: 1, imageId: 1}, {tweetId: 2, imageId: 2}] as TweetImageResponse[];

export const createMockRootState = (loadingStatus = LoadingStatus.LOADING): RootState => {
    return {
        blockedAndMutedUsers: {
            mutedUsers: mockMutedUserResponse,
            blockedUsers: mockBlockedUserResponse,
            loadingState: loadingStatus
        },
        chatMessages: {
            items: mockChatMessageResponse,
            loadingState: loadingStatus
        },
        chats: {
            items: mockChatResponse,
            loadingState: loadingStatus
        },
        followerRequests: {
            items: mockFollowerUserResponse,
            loadingState: loadingStatus
        },
        list: {
            list: mockBaseListResponse,
            loadingState: loadingStatus
        },
        listDetail: {
            item: mockBaseListResponse,
            loadingState: loadingStatus
        },
        listMembers: {
            members: mockListsOwnerMemberResponse,
            suggested: mockListsOwnerMemberResponse,
            membersLoadingState: loadingStatus,
            suggestedLoadingState: loadingStatus,
            loadingState: loadingStatus
        },
        lists: {
            lists: mockListResponse,
            userLists: mockListUserResponse,
            pinnedLists: mockPinnedListResponse,
            simpleLists: mockSimpleListResponse,
            listsLoadingState: loadingStatus,
            userListsLoadingState: loadingStatus,
            pinnedListsLoadingState: loadingStatus,
            simpleListsLoadingState: loadingStatus,
            loadingState: loadingStatus
        },
        notifications: {
            notificationsList: mockNotificationResponse,
            tweetAuthors: mockNotificationUserResponse,
            notificationInfo: mockNotificationInfoResponse,
            notificationInfoLoadingState: loadingStatus,
            loadingState: loadingStatus
        },
        tags: {
            items: mockTagResponse,
            loadingState: loadingStatus
        },
        tweet: {
            tweet: mockTweetResponse,
            likedUsers: mockUserResponse,
            retweetedUsers: mockUserResponse,
            replies: mockTweetResponseArray,
            loadingState: loadingStatus,
            likedUsersLoadingState: loadingStatus,
            retweetedUsersLoadingState: loadingStatus,
            repliesLoadingState: loadingStatus,
        },
        tweets: {
            items: mockTweetResponseArray,
            pagesCount: 1,
            loadingState: loadingStatus
        },
        user: {
            data: mockAuthUserResponse,
            status: loadingStatus,
        },
        userDetail: {
            item: mockUserDetailResponse,
            loadingState: loadingStatus
        },
        userProfile: {
            user: mockUserProfileResponse,
            images: mockTweetImageResponse,
            imagesLoadingState: loadingStatus,
            loadingState: loadingStatus
        },
        users: {
            users: mockUserResponse,
            loadingState: loadingStatus
        },
        usersSearch: {
            users: mockUserResponse,
            followers: mockUserResponse,
            loadingState: loadingStatus
        },
        userTweets: {
            items: mockTweetResponseArray,
            pagesCount: 1,
            loadingState: loadingStatus
        },
    } as RootState;
};
