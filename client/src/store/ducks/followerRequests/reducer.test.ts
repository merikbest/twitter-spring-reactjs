import {followerRequestsReducer, initialFollowerRequestsState} from "./reducer";
import {testActionDispatch} from "../../../util/testHelper";
import {LoadingStatus} from "../../types";
import {FollowerRequestsActions, FollowerRequestsActionsType} from "./contracts/actionTypes";
import {FollowerUserResponse} from "../../types/user";

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
                payload: [{id: 1}] as FollowerUserResponse[]
            }),
            {
                ...initialFollowerRequestsState,
                items: [{id: 1}] as FollowerUserResponse[],
                loadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            FollowerRequestsActionsType.PROCESS_FOLLOW_REQUEST,
            followerRequestsReducer(
                {
                    ...initialFollowerRequestsState,
                    items: [{id: 1}] as FollowerUserResponse[],
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
                    items: [{id: 1}] as FollowerUserResponse[],
                },
                {
                    type: FollowerRequestsActionsType.RESET_FOLLOWER_REQUESTS_STATE,
                }
            ),
            {
                ...initialFollowerRequestsState,
                items: [],
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
