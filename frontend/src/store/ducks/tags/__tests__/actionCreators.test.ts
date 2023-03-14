import { testAction } from "../../../../util/test-utils/test-helper";
import {
    fetchTags,
    fetchTrends,
    resetTrendsState,
    setTags,
    setTagsLoadingState,
    setTrends,
    setTrendsLoadingState
} from "../actionCreators";
import { TagsActionsType } from "../contracts/actionTypes";
import { TagResponse } from "../../../../types/tag";
import { LoadingStatus } from "../../../../types/common";

describe("tags actions", () => {
    testAction(setTags, setTags([{ id: 1 }] as TagResponse[]), {
        type: TagsActionsType.SET_TAGS,
        payload: [{ id: 1 }] as TagResponse[]
    });

    testAction(fetchTags, fetchTags(), {
        type: TagsActionsType.FETCH_TAGS
    });

    testAction(setTagsLoadingState, setTagsLoadingState(LoadingStatus.LOADING), {
        type: TagsActionsType.SET_TAGS_LOADING_STATE,
        payload: LoadingStatus.LOADING
    });

    testAction(setTrends, setTrends({ items: [{ id: 1 }] as TagResponse[], pagesCount: 1 }), {
        type: TagsActionsType.SET_TRENDS,
        payload: { items: [{ id: 1 }] as TagResponse[], pagesCount: 1 }
    });

    testAction(fetchTrends, fetchTrends(1), {
        type: TagsActionsType.FETCH_TRENDS,
        payload: 1
    });

    testAction(setTrendsLoadingState, setTrendsLoadingState(LoadingStatus.LOADING), {
        type: TagsActionsType.SET_TRENDS_LOADING_STATE,
        payload: LoadingStatus.LOADING
    });

    testAction(resetTrendsState, resetTrendsState(), {
        type: TagsActionsType.RESET_TRENDS_STATE
    });
});
