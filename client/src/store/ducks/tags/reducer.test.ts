import {initialTagsState, tagsReducer} from "./reducer";
import {TagsActions, TagsActionsType} from "./contracts/actionTypes";
import {testActionDispatch} from "../../../util/testHelper";
import {LoadingStatus} from "../../types";
import {TagResponse} from "../../types/tag";

describe("tagsReducer:", () => {
    describe("initial state:", () => {
        it("should return initial state", () => {
            expect(tagsReducer(undefined, {} as TagsActions)).toEqual(initialTagsState);
        });
    });

    describe("tags handlers:", () => {
        testActionDispatch(
            TagsActionsType.SET_TAGS,
            tagsReducer(initialTagsState, {
                type: TagsActionsType.SET_TAGS,
                payload: [{id: 1}] as TagResponse[]
            }),
            {
                ...initialTagsState,
                items: [{id: 1}] as TagResponse[],
                loadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            TagsActionsType.RESET_TAGS_STATE,
            tagsReducer(
                {
                    ...initialTagsState,
                    items: [{id: 1}] as TagResponse[]
                },
                {
                    type: TagsActionsType.RESET_TAGS_STATE
                }),
            {
                ...initialTagsState,
                items: [],
                loadingState: LoadingStatus.LOADING
            }
        );

        testActionDispatch(
            TagsActionsType.SET_LOADING_STATE,
            tagsReducer(initialTagsState,
                {
                    type: TagsActionsType.SET_LOADING_STATE,
                    payload: LoadingStatus.SUCCESS
                }),
            {
                ...initialTagsState,
                loadingState: LoadingStatus.SUCCESS
            }
        );
    });
});