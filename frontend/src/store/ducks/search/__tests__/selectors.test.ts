import { createMockRootState } from "../../../../util/test-utils/test-helper";
import {
    selectIsRecentSearchResultEmpty,
    selectLoadingSearchResult,
    selectRecentSearchResult,
    selectRecentTagsSearchResult,
    selectRecentTextSearchResult,
    selectRecentUsersSearchResult,
    selectSearchedText,
    selectSearchResult,
    selectSearchTags,
    selectSearchTweetCount,
    selectSearchUsers
} from "../selectors";
import { CommonUserResponse } from "../../../../types/user";

describe("search selectors:", () => {
    const mockState = createMockRootState();
    const mockSearchResult = {
        text: "test",
        tweetCount: 1,
        tags: ["#test"],
        users: [{ id: 1 }] as CommonUserResponse[]
    };
    const mockRecentSearchResult = {
        users: [{ id: 1 }] as CommonUserResponse[],
        tags: ["#test"],
        text: ["test"]
    };
    const mockSearchResultState = {
        ...mockState,
        search: { ...mockState.search, searchResult: mockSearchResult }
    };
    const mockRecentSearchResultState = {
        ...mockState,
        search: { ...mockState.search, recentSearchResult: mockRecentSearchResult }
    };

    describe("selectSearchResult", () => {
        it("should return TagResponse array", () => {
            expect(selectSearchResult(mockSearchResultState)).toBe(mockSearchResult);
        });
    });

    describe("selectSearchedText", () => {
        it("should return TagResponse array", () => {
            expect(selectSearchedText(mockSearchResultState)).toBe("test");
        });
    });

    describe("selectSearchTweetCount", () => {
        it("should return TagResponse array", () => {
            expect(selectSearchTweetCount(mockSearchResultState)).toBe(1);
        });
    });

    describe("selectSearchTags", () => {
        it("should return TagResponse array", () => {
            expect(selectSearchTags(mockSearchResultState)).toBe(mockSearchResult.tags);
        });
    });

    describe("selectSearchUsers", () => {
        it("should return TagResponse array", () => {
            expect(selectSearchUsers(mockSearchResultState)).toBe(mockSearchResult.users);
        });
    });

    describe("selectRecentSearchResult", () => {
        it("should return TagResponse array", () => {
            expect(selectRecentSearchResult(mockRecentSearchResultState)).toBe(mockRecentSearchResult);
        });
    });

    describe("selectRecentUsersSearchResult", () => {
        it("should return TagResponse array", () => {
            expect(selectRecentUsersSearchResult(mockRecentSearchResultState)).toBe(mockRecentSearchResult.users);
        });
    });

    describe("selectRecentTagsSearchResult", () => {
        it("should return TagResponse array", () => {
            expect(selectRecentTagsSearchResult(mockRecentSearchResultState)).toBe(mockRecentSearchResult.tags);
        });
    });

    describe("selectRecentTextSearchResult", () => {
        it("should return TagResponse array", () => {
            expect(selectRecentTextSearchResult(mockRecentSearchResultState)).toBe(mockRecentSearchResult.text);
        });
    });

    describe("selectIsRecentSearchResultEmpty", () => {
        it("should return TagResponse array", () => {
            expect(selectIsRecentSearchResultEmpty(mockRecentSearchResultState)).toBe(false);
        });
    });

    describe("selectLoadingSearchResult", () => {
        it("should return TagResponse array", () => {
            expect(selectLoadingSearchResult(mockRecentSearchResultState)).toBe(true);
        });
    });
});
