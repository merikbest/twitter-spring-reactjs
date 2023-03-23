import React from "react";
import { Button } from "@material-ui/core";

import { createMockRootState, mockDispatch, mountWithStore } from "../../../../util/test-utils/test-helper";
import RecentSearchResults from "../RecentSearchResults";
import Spinner from "../../../Spinner/Spinner";
import { LoadingStatus } from "../../../../types/common";
import { SEARCH_TERMS } from "../../../../constants/common-constants";
import { SearchActionsType } from "../../../../store/ducks/search/contracts/actionTypes";
import { mockListsOwnerMember } from "../../../../util/test-utils/mock-test-data";
import UserSearchResult from "../../UserSearchResult/UserSearchResult";
import TextSearchResult from "../../TextSearchResult/TextSearchResult";

describe("RecentSearchResults", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);
    const mockSearchResult = {
        ...mockStore,
        search: {
            ...mockStore.search, recentSearchResult: { users: mockListsOwnerMember, tags: ["#test"], text: ["test"] } }
    };
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render loading Spinner", () => {
        const wrapper = mountWithStore(<RecentSearchResults />, createMockRootState());
        expect(wrapper.find(Spinner).exists()).toBe(true);
    });

    it("should render empty search result", () => {
        const mockSearchResult = {
            ...mockStore,
            search: {
                ...mockStore.search,
                recentSearchResult: { users: [], tags: [], text: [] }
            }
        };
        const wrapper = mountWithStore(<RecentSearchResults />, mockSearchResult);
        expect(wrapper.text().includes("Try searching for people, topics, or keywords")).toBe(true);
    });

    it("should fetch recent search result", () => {
        const searchTerms = { text: ["test"], tags: ["#test"], users: [1, 2] };
        localStorage.setItem(SEARCH_TERMS, JSON.stringify(searchTerms));
        mountWithStore(<RecentSearchResults />, mockStore);
        expect(mockDispatchFn).nthCalledWith(1, {
            payload: searchTerms,
            type: SearchActionsType.FETCH_RECENT_SEARCH_RESULT
        });
        localStorage.removeItem(SEARCH_TERMS);
    });

    it("should render search results", () => {
        const wrapper = mountWithStore(<RecentSearchResults />, mockSearchResult);
        expect(wrapper.find(TextSearchResult).length).toEqual(2);
        expect(wrapper.find(UserSearchResult).length).toEqual(3);
    });

    it("should click clear search terms", () => {
        const wrapper = mountWithStore(<RecentSearchResults />, mockSearchResult);
        wrapper.find(Button).simulate("click");
        expect(mockDispatchFn).nthCalledWith(1, { type: SearchActionsType.RESET_SEARCH_RESULT });
    });
});
