import React from "react";
import { Button } from "@material-ui/core";
import ReactRouter from "react-router";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../util/test-utils/test-helper";
import Spinner from "../../../components/Spinner/Spinner";
import FullList from "../FullList";
import { mockFullList, mockUserFullList } from "../../../util/test-utils/mock-test-data";
import TweetComponent from "../../../components/TweetComponent/TweetComponent";
import { TweetsActionType } from "../../../store/ducks/tweets/contracts/actionTypes";
import { ListActionType } from "../../../store/ducks/list/contracts/actionTypes";
import MembersAndFollowersModal from "../FullListTweets/MembersAndFollowersModal/MembersAndFollowersModal";
import EditListModal from "../EditListButton/EditListModal/EditListModal";
import { ListsActionType } from "../../../store/ducks/lists/contracts/actionTypes";
import { LoadingStatus } from "../../../types/common";

window.scrollTo = jest.fn();

describe("FullList", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
        jest.spyOn(ReactRouter, "useParams").mockReturnValue({ listId: "3" });
    });

    it("should render loading Spinner", () => {
        const mockStore = createMockRootState();
        const wrapper = mountWithStore(<FullList />, {
            ...mockStore,
            list: { ...mockStore.list, list: undefined },
            tweets: { ...mockStore.tweets, items: [], pagesCount: 1 }
        });

        expect(wrapper.find(Spinner).exists()).toBe(true);
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: { listId: 3, pageNumber: 0 },
            type: TweetsActionType.FETCH_TWEETS_BY_LIST_ID
        });
        expect(mockDispatchFn).nthCalledWith(2, { payload: 3, type: ListActionType.FETCH_LIST_BY_ID });
    });

    it("should render FullList correctly", () => {
        const wrapper = mountWithStore(<FullList />, { ...mockStore, list: { ...mockStore.list, list: mockFullList } });

        expect(wrapper.find(Spinner).exists()).toBe(false);
        expect(global.window.document.title).toBe(`@${mockFullList.listOwner.username}/${mockFullList.name} / Twitter`);
        expect(wrapper.text().includes(mockFullList.name)).toBe(true);
        expect(wrapper.text().includes(mockFullList.description)).toBe(true);
        expect(wrapper.text().includes(mockFullList.listOwner.fullName)).toBe(true);
        expect(wrapper.text().includes(`@${mockFullList.listOwner.username}`)).toBe(true);
        expect(wrapper.text().includes(`${mockFullList.membersSize} Members`)).toBe(true);
        expect(wrapper.text().includes(`${mockFullList.followersSize} Followers`)).toBe(true);
        expect(wrapper.find(Button).at(0).text().includes("Edit List")).toBe(true);
        expect(wrapper.find(TweetComponent).length).toEqual(2);
    });

    it("should render empty tweets", () => {
        const wrapper = mountWithStore(<FullList />, {
            ...mockStore,
            list: { ...mockStore.list, list: mockFullList },
            tweets: { ...mockStore.tweets, items: [], pagesCount: 1 }
        });

        expect(wrapper.text().includes("There aren’t any Tweets in this List")).toBe(true);
        expect(wrapper.text().includes("When anyone in this List Tweets, they’ll show up here.")).toBe(true);
        expect(wrapper.find(TweetComponent).length).toEqual(0);
    });

    it("should render Members Modal Window", () => {
        const wrapper = mountWithStore(<FullList />, { ...mockStore, list: { ...mockStore.list, list: mockFullList } });
        wrapper.find("#listMembers").at(0).simulate("click");

        expect(wrapper.find(MembersAndFollowersModal).prop("visible")).toBe(true);
        expect(wrapper.find(MembersAndFollowersModal).prop("title")).toBe("List members");
    });

    it("should render Followers Modal Window", () => {
        const wrapper = mountWithStore(<FullList />, { ...mockStore, list: { ...mockStore.list, list: mockFullList } });
        wrapper.find("#listFollowers").at(0).simulate("click");

        expect(wrapper.find(MembersAndFollowersModal).prop("visible")).toBe(true);
        expect(wrapper.find(MembersAndFollowersModal).prop("title")).toBe("List followers");
    });

    it("should render Edit List Modal Window", () => {
        const wrapper = mountWithStore(<FullList />, { ...mockStore, list: { ...mockStore.list, list: mockFullList } });
        wrapper.find(Button).at(0).simulate("click");

        expect(wrapper.find(EditListModal).prop("visible")).toBe(true);
    });

    it("should click follow to list", () => {
        const wrapper = mountWithStore(<FullList />, {
            ...mockStore,
            list: { ...mockStore.list, list: mockUserFullList }
        });
        wrapper.find(Button).at(0).simulate("click");

        expect(mockDispatchFn).nthCalledWith(3, { payload: 1, type: ListsActionType.FOLLOW_LIST });
    });
});
