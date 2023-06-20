// @ts-nocheck
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { configure, mount } from "enzyme";
import { call, put, takeLatest } from "redux-saga/effects";
import configureStore from "redux-mock-store";
import { Link, Router } from "react-router-dom";
import * as redux from "react-redux";
import { Provider } from "react-redux";
import { createMemoryHistory } from "history";
import routeData from "react-router";
import { AxiosResponse } from "axios";
import { TextDecoder, TextEncoder } from "util";

import { RootState } from "../../store/store";
import {
    createMockMyProfile,
    mockFullTweet,
    mockProfileImages,
    mockTweets,
    mockUser,
    mockUserDetailResponse,
    mockUsers
} from "./mock-test-data";
import { LoadingStatus, PageableResponse, ReplyType } from "../../types/common";
import { PAGE_TOTAL_COUNT } from "../../constants/common-constants";
import { pollInitialState } from "../../store/ducks/addTweetForm/reducer";
import { initialRegistrationInfo } from "../../store/ducks/authentication/reducer";

(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;
configure({ adapter: new Adapter() });

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

export const testActionDispatch = (actionType, actualState, expectedState) => {
    describe(`${actionType} action is dispatched`, () => {
        it("should return the expected state", () => {
            expect(actualState).toEqual(expectedState);
        });
    });
};

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
    });
};

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
    });
};

export const testSetResponse = (worker, mockData = {}, action, payload: {}, responseType) => {
    it(`should yield put ${action.name} with ${responseType} type`, () => {
        const actualYield = worker.next(mockData).value;
        const expectedYield = put(action(payload));

        expect(actualYield).toEqual(expectedYield);
    });
};

export const testWatchSaga = (watchSaga, requests, effect = takeLatest) => {
    describe(`watch ${watchSaga.name}:`, () => {
        const watcher = watchSaga();

        requests.forEach((request) => {
            it(`should listen to ${request.actionType} and yield ${request.workSaga.name}`, () => {
                const actualYield = watcher.next().value;
                const expectedYield = effect(request.actionType, request.workSaga);

                expect(actualYield).toEqual(expectedYield);
            });
        });
    });
};

export const mountWithStore = (component, mockState?, mockHistory?) => {
    const mockStore = configureStore([]);
    const store = mockStore(mockState);

    return mount(
        <Router history={mockHistory ? mockHistory : createMemoryHistory()}>
            <Provider store={store}>
                {component}
            </Provider>
        </Router>
    );
};

export const mockExpectedResponse = <T, >(response: AxiosResponse<T>): PageableResponse<T> => {
    return {
        items: response.data,
        pagesCount: parseInt(response.headers[PAGE_TOTAL_COUNT])
    };
};

export const mockDispatch = () => {
    const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    return mockDispatchFn;
};

export const mockLocation = (mockLocationState: { tag: string } | { text: string } | { mock: string }): void => {
    jest.spyOn(routeData, "useLocation").mockReturnValue({
        pathname: "/search",
        hash: "",
        search: "",
        state: mockLocationState
    });
};

export const testClickOnLink = (component: any, path: string, linkIndex: number): void => {
    const mockStore = createMockRootState();
    const history = createMemoryHistory();
    const pushSpy = jest.spyOn(history, "push");
    const wrapper = mountWithStore(component, mockStore, history);

    wrapper.find(Link).at(linkIndex).simulate("click", { button: 0 });

    expect(pushSpy).toHaveBeenCalled();
    expect(pushSpy).toHaveBeenCalledWith(path);
};

export const createMockRootState = (loadingStatus = LoadingStatus.LOADING): RootState => {
    return {
        chat: {
            item: undefined,
            loadingState: loadingStatus
        },
        tweetAdditionalInfo: {
            tweetAdditionalInfo: undefined,
            isTweetBookmarked: false,
            loadingState: loadingStatus
        },
        actionSnackbar: {
            snackBarMessage: "",
            openSnackBar: false
        },
        user: {
            data: mockUser,
            status: loadingStatus
        },
        blockedAndMutedUsers: {
            mutedUsers: [],
            blockedUsers: [],
            pagesCount: 0,
            loadingState: loadingStatus
        },
        chatMessages: {
            items: [],
            loadingState: loadingStatus
        },
        chats: {
            items: [],
            loadingState: loadingStatus
        },
        followerRequests: {
            items: [],
            pagesCount: 0,
            loadingState: loadingStatus
        },
        list: {
            list: undefined,
            loadingState: loadingStatus
        },
        listDetail: {
            item: undefined,
            loadingState: loadingStatus
        },
        listMembers: {
            members: [],
            suggested: [],
            membersLoadingState: loadingStatus,
            suggestedLoadingState: loadingStatus
        },
        lists: {
            lists: [],
            userLists: [],
            pinnedLists: [],
            simpleLists: [],
            listsLoadingState: loadingStatus,
            userListsLoadingState: loadingStatus,
            pinnedListsLoadingState: loadingStatus,
            simpleListsLoadingState: loadingStatus,
            loadingState: loadingStatus
        },
        notifications: {
            notificationsList: [],
            pagesCount: 0,
            tweetAuthors: [],
            notificationInfo: undefined,
            notificationInfoLoadingState: loadingStatus,
            loadingState: loadingStatus,
            loadingTweetAuthorsState: loadingStatus
        },
        tags: {
            tags: [],
            loadingTagsState: loadingStatus,
            trends: [],
            pagesCount: 0,
            loadingTrendsState: loadingStatus
        },
        topics: {
            topics: [],
            followedTopics: [],
            topicsByCategories: [],
            topicsLoadingState: loadingStatus,
            followedTopicsLoadingState: loadingStatus,
            topicsByCategoriesLoadingState: loadingStatus
        },
        tweet: {
            tweet: mockFullTweet,
            errorMessage: "",
            likedUsers: mockUsers,
            retweetedUsers: mockUsers,
            taggedImageUsers: mockUsers,
            usersPagesCount: 0,
            replies: mockTweets,
            loadingState: loadingStatus,
            likedUsersLoadingState: loadingStatus,
            retweetedUsersLoadingState: loadingStatus,
            taggedImageUsersLoadingState: loadingStatus,
            repliesLoadingState: loadingStatus,
            quotedUsersLoadingState: loadingStatus
        },
        tweets: {
            items: mockTweets,
            pagesCount: 1,
            loadingState: loadingStatus
        },
        userDetail: {
            item: mockUserDetailResponse,
            loadingState: loadingStatus
        },
        userProfile: {
            user: createMockMyProfile(),
            images: mockProfileImages,
            imagesLoadingState: loadingStatus,
            loadingState: loadingStatus
        },
        users: {
            users: mockUsers,
            pagesCount: 1,
            loadingState: loadingStatus
        },
        usersSearch: {
            users: mockUsers,
            pagesCount: 1,
            followers: mockUsers,
            loadingState: loadingStatus
        },
        userTweets: {
            items: [],
            pagesCount: 1,
            loadingState: loadingStatus
        },
        unsentTweets: {
            items: [],
            pagesCount: 0,
            loadingState: loadingStatus
        },
        search: {
            searchResult: undefined,
            recentSearchResult: undefined,
            searchLoadingState: loadingStatus
        },
        addTweetForm: {
            pollData: pollInitialState,
            visiblePoll: false,
            gif: null,
            scheduledDate: null,
            replyType: ReplyType.EVERYONE,
            imageDescription: "",
            images: [],
            selectedUsers: [],
            gifs: [],
            loadingState: loadingStatus
        },
        authentication: {
            registrationInfo: initialRegistrationInfo,
            registrationStep: null,
            errorMessage: null,
            loadingState: LoadingStatus.LOADED
        }
    } as RootState;
};
