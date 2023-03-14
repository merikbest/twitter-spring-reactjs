import { initialListMembersState, listMembersReducer } from "../reducer";
import { ListMembersActions, ListMembersActionsType } from "../contracts/actionTypes";
import { testActionDispatch } from "../../../../util/test-utils/test-helper";
import { ListsOwnerMemberResponse } from "../../../../types/lists";
import { LoadingStatus } from "../../../../types/common";

describe("listMembersReducer:", () => {
    describe("initial state:", () => {
        it("should return initial state", () => {
            expect(listMembersReducer(undefined, {} as ListMembersActions)).toEqual(initialListMembersState);
        });
    });

    describe("listMembers handlers:", () => {
        testActionDispatch(
            ListMembersActionsType.SET_LIST_MEMBERS,
            listMembersReducer(initialListMembersState, {
                type: ListMembersActionsType.SET_LIST_MEMBERS,
                payload: [{ id: 1 }] as ListsOwnerMemberResponse[]
            }),
            {
                ...initialListMembersState,
                members: [{ id: 1 }] as ListsOwnerMemberResponse[],
                membersLoadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            ListMembersActionsType.SET_LIST_SUGGESTED,
            listMembersReducer(initialListMembersState, {
                type: ListMembersActionsType.SET_LIST_SUGGESTED,
                payload: [{ id: 1 }] as ListsOwnerMemberResponse[]
            }),
            {
                ...initialListMembersState,
                suggested: [{ id: 1 }] as ListsOwnerMemberResponse[],
                suggestedLoadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            ListMembersActionsType.SET_USER_TO_LIST,
            listMembersReducer(
                {
                    ...initialListMembersState,
                    suggested: [{ id: 1, isMemberInList: false }] as ListsOwnerMemberResponse[]
                },
                {
                    type: ListMembersActionsType.SET_USER_TO_LIST,
                    payload: { userId: 1, isUserAdded: true, isSuggested: true }
                }
            ),
            {
                ...initialListMembersState,
                suggested: [{ id: 1, isMemberInList: true }] as ListsOwnerMemberResponse[],
                membersLoadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            ListMembersActionsType.RESET_LIST_MEMBERS_STATE,
            listMembersReducer(
                {
                    ...initialListMembersState,
                    members: [{ id: 1 }] as ListsOwnerMemberResponse[],
                    membersLoadingState: LoadingStatus.SUCCESS
                },
                {
                    type: ListMembersActionsType.RESET_LIST_MEMBERS_STATE
                }
            ),
            {
                ...initialListMembersState,
                members: [],
                membersLoadingState: LoadingStatus.LOADING
            }
        );

        testActionDispatch(
            ListMembersActionsType.RESET_LIST_SUGGESTED_STATE,
            listMembersReducer(
                {
                    ...initialListMembersState,
                    suggested: [{ id: 1 }] as ListsOwnerMemberResponse[],
                    suggestedLoadingState: LoadingStatus.SUCCESS
                },
                {
                    type: ListMembersActionsType.RESET_LIST_SUGGESTED_STATE
                }
            ),
            {
                ...initialListMembersState,
                suggested: [],
                suggestedLoadingState: LoadingStatus.LOADING
            }
        );

        testActionDispatch(
            ListMembersActionsType.RESET_LIST_MEMBERS,
            listMembersReducer(
                {
                    ...initialListMembersState,
                    members: [{ id: 1 }] as ListsOwnerMemberResponse[]
                },
                {
                    type: ListMembersActionsType.RESET_LIST_MEMBERS
                }
            ),
            {
                ...initialListMembersState,
                members: []
            }
        );

        testActionDispatch(
            ListMembersActionsType.SET_LOADING_MEMBERS_STATE,
            listMembersReducer(initialListMembersState, {
                type: ListMembersActionsType.SET_LOADING_MEMBERS_STATE,
                payload: LoadingStatus.SUCCESS
            }),
            {
                ...initialListMembersState,
                membersLoadingState: LoadingStatus.SUCCESS
            }
        );

        testActionDispatch(
            ListMembersActionsType.SET_LOADING_SUGGESTED_STATE,
            listMembersReducer(initialListMembersState, {
                type: ListMembersActionsType.SET_LOADING_SUGGESTED_STATE,
                payload: LoadingStatus.SUCCESS
            }),
            {
                ...initialListMembersState,
                suggestedLoadingState: LoadingStatus.SUCCESS
            }
        );
    });
});
