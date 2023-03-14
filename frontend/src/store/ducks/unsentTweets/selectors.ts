import { RootState } from "../../store";
import { UnsentTweetsState } from "./contracts/state";
import { LoadingStatus } from "../../../types/common";

export const selectUnsentTweetsState = (state: RootState): UnsentTweetsState => state.unsentTweets;
export const selectIstUnsentTweetsLoading = (state: RootState): boolean => selectUnsentTweetsState(state).loadingState === LoadingStatus.LOADING;
export const selectUnsentTweets = (state: RootState): UnsentTweetsState["items"] => selectUnsentTweetsState(state).items;
export const selectUnsentTweetsPagesCount = (state: RootState): number => selectUnsentTweetsState(state).pagesCount;
