import { followerRequestsReducer, initialFollowerRequestsState } from "../reducer";
import { testActionDispatch } from "../../../../util/test-utils/test-helper";
import { FollowerRequestsActions, FollowerRequestsActionsType } from "../contracts/actionTypes";
import { FollowerUserResponse } from "../../../../types/user";
import { LoadingStatus } from "../../../../types/common";

describe("followerRequestsReducer:", () => {
    describe("initial state:", () => {
        it("should return initial state", () => {
            expect(followerRequestsReducer(undefined, {} as FollowerRequestsActions)).toEqual(initialFollowerRequestsState);
        });
    });

    describe("followerRequests handlers:", () => {
        testActionDispatch(
            FollowerRequestsActionsType.SET_FOLLOWER_REQUESTS,
            followerRequestsReducer(initialFollowerRequestsState, {
                type: FollowerRequestsActionsType.SET_FOLLOWER_REQUESTS,
                payload: { items: [{ id: 1 }] as FollowerUserResponse[], pagesCount: 2 }
            }),
            {
                ...initialFollowerRequestsState,
                items: [{ id: 1 }] as FollowerUserResponse[],
                pagesCount: 2,
                loadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            FollowerRequestsActionsType.PROCESS_FOLLOW_REQUEST,
            followerRequestsReducer(
                {
                    ...initialFollowerRequestsState,
                    items: [{ id: 1 }] as FollowerUserResponse[]
                },
                {
                    type: FollowerRequestsActionsType.PROCESS_FOLLOW_REQUEST,
                    payload: 1
                }
            ),
            {
                ...initialFollowerRequestsState,
                items: [],
                loadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            FollowerRequestsActionsType.RESET_FOLLOWER_REQUESTS_STATE,
            followerRequestsReducer(
                {
                    ...initialFollowerRequestsState,
                    items: [{ id: 1 }] as FollowerUserResponse[]
                },
                {
                    type: FollowerRequestsActionsType.RESET_FOLLOWER_REQUESTS_STATE
                }
            ),
            {
                ...initialFollowerRequestsState,
                items: [],
                pagesCount: 0,
                loadingState: LoadingStatus.LOADING
            }
        );

        testActionDispatch(
            FollowerRequestsActionsType.SET_LOADING_STATE,
            followerRequestsReducer(initialFollowerRequestsState, {
                type: FollowerRequestsActionsType.SET_LOADING_STATE,
                payload: LoadingStatus.SUCCESS
            }),
            {
                ...initialFollowerRequestsState,
                loadingState: LoadingStatus.SUCCESS
            }
        );
    });
});
