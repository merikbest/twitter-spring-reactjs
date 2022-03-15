import {testAction} from "../../../util/testHelper";
import {fetchTags, fetchTrends, resetTagsState, setTags, setTagsLoadingState} from "./actionCreators";
import {TagsActionsType} from "./contracts/actionTypes";
import {TagResponse} from "../../types/tag";
import {LoadingStatus} from "../../types";

describe("tags actions", () => {
    testAction(setTags, setTags([{id: 1}] as TagResponse[]), {
        type: TagsActionsType.SET_TAGS,
        payload: [{id: 1}] as TagResponse[]
    });

    testAction(setTagsLoadingState, setTagsLoadingState(LoadingStatus.LOADING), {
        type: TagsActionsType.SET_LOADING_STATE,
        payload: LoadingStatus.LOADING
    });

    testAction(fetchTags, fetchTags(), {
        type: TagsActionsType.FETCH_TAGS
    });

    testAction(fetchTrends, fetchTrends(), {
        type: TagsActionsType.FETCH_TRENDS
    });

    testAction(resetTagsState, resetTagsState(), {
        type: TagsActionsType.RESET_TAGS_STATE
    });
});
