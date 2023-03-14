import { initialTagsState, tagsReducer } from "../reducer";
import { TagsActions, TagsActionsType } from "../contracts/actionTypes";
import { testActionDispatch } from "../../../../util/test-utils/test-helper";
import { TagResponse } from "../../../../types/tag";
import { LoadingStatus } from "../../../../types/common";

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
                payload: [{ id: 1 }] as TagResponse[]
            }),
            {
                ...initialTagsState,
                tags: [{ id: 1 }] as TagResponse[],
                loadingTagsState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            TagsActionsType.SET_TRENDS,
            tagsReducer(initialTagsState, {
                type: TagsActionsType.SET_TRENDS,
                payload: { items: [{ id: 1 }] as TagResponse[], pagesCount: 2 }
            }),
            {
                ...initialTagsState,
                trends: [{ id: 1 }] as TagResponse[],
                pagesCount: 2,
                loadingTrendsState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            TagsActionsType.RESET_TRENDS_STATE,
            tagsReducer(
                {
                    ...initialTagsState,
                    trends: [{ id: 1 }] as TagResponse[],
                    pagesCount: 11
                },
                {
                    type: TagsActionsType.RESET_TRENDS_STATE
                }),
            {
                ...initialTagsState,
                trends: [],
                pagesCount: 0,
                loadingTrendsState: LoadingStatus.LOADING
            }
        );

        testActionDispatch(
            TagsActionsType.SET_TAGS_LOADING_STATE,
            tagsReducer(initialTagsState,
                {
                    type: TagsActionsType.SET_TAGS_LOADING_STATE,
                    payload: LoadingStatus.SUCCESS
                }),
            {
                ...initialTagsState,
                loadingTagsState: LoadingStatus.SUCCESS
            }
        );

        testActionDispatch(
            TagsActionsType.SET_TRENDS_LOADING_STATE,
            tagsReducer(initialTagsState,
                {
                    type: TagsActionsType.SET_TRENDS_LOADING_STATE,
                    payload: LoadingStatus.SUCCESS
                }),
            {
                ...initialTagsState,
                loadingTrendsState: LoadingStatus.SUCCESS
            }
        );
    });
});
