import { SearchState } from "./contracts/state";
import { RootState } from "../../store";
import { CommonUserResponse } from "../../../types/user";
import { LoadingStatus } from "../../../types/common";

const selectSearch = (state: RootState): SearchState => state.search;
export const selectSearchResult = (state: RootState): SearchState["searchResult"] => selectSearch(state).searchResult;
export const selectSearchedText = (state: RootState): string | undefined => selectSearchResult(state)?.text;
export const selectSearchTweetCount = (state: RootState): number | undefined => selectSearchResult(state)?.tweetCount;
export const selectSearchTags = (state: RootState): string[] | undefined => selectSearchResult(state)?.tags;
export const selectSearchUsers = (state: RootState): CommonUserResponse[] | undefined => selectSearchResult(state)?.users;
export const selectRecentSearchResult = (state: RootState): SearchState["recentSearchResult"] => selectSearch(state).recentSearchResult;
export const selectRecentUsersSearchResult = (state: RootState) => selectRecentSearchResult(state)?.users ?? [];
export const selectRecentTagsSearchResult = (state: RootState) => selectRecentSearchResult(state)?.tags ?? [];
export const selectRecentTextSearchResult = (state: RootState) => selectRecentSearchResult(state)?.text ?? [];
export const selectIsRecentSearchResultEmpty = (state: RootState) => {
    const recentSearchResult = selectRecentSearchResult(state);
    return recentSearchResult?.text.length === 0 && recentSearchResult?.tags.length === 0 && recentSearchResult?.users.length === 0;
};

export const selectLoadingSearchResult = (state: RootState): boolean => selectSearch(state).searchLoadingState === LoadingStatus.LOADING;
