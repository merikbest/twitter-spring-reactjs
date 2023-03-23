import React from "react";

import { createMockRootState, mountWithStore } from "../../../../util/test-utils/test-helper";
import Spinner from "../../../Spinner/Spinner";
import SearchResults from "../SearchResults";
import { mockListsOwnerMember } from "../../../../util/test-utils/mock-test-data";
import { LoadingStatus } from "../../../../types/common";
import TextSearchResult from "../../TextSearchResult/TextSearchResult";
import UserSearchResult from "../../UserSearchResult/UserSearchResult";

describe("SearchResults", () => {
    const mockStore = createMockRootState(LoadingStatus.LOADED);

    it("should render loading Spinner", () => {
        const wrapper = mountWithStore(<SearchResults />, createMockRootState());
        expect(wrapper.find(Spinner).exists()).toBe(true);
    });

    it("should render search results", () => {
        const mockSearchResult = {
            ...mockStore,
            search: {
                ...mockStore.search,
                searchResult: {
                    text: "test",
                    tweetCount: 123,
                    tags: ["#test"],
                    users: mockListsOwnerMember
                }
            }
        };
        const wrapper = mountWithStore(<SearchResults />, mockSearchResult);
        expect(wrapper.find(TextSearchResult).length).toEqual(3);
        expect(wrapper.find(UserSearchResult).length).toEqual(3);
    });
});
