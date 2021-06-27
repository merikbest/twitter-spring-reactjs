import { RootState } from '../../store';
import {TagsState } from './contracts/state';
import {LoadingStatus} from "../../types";

export const selectTags = (state: RootState): TagsState => state.tags;
export const selectTagsItems = (state: RootState) => selectTags(state).items;
export const selectLoadingState = (state: RootState): LoadingStatus => selectTags(state).loadingState;
export const selectIsTagsLoading = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADING;
export const selectIsTagsLoaded = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADED;

