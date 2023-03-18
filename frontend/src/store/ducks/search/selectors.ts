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
export const selectRecentSearchResult = (state: RootState): CommonUserResponse[] => selectSearch(state).recentSearchResult;
export const selectLoadingSearchResult = (state: RootState): boolean => selectSearch(state).searchLoadingState === LoadingStatus.LOADING;
