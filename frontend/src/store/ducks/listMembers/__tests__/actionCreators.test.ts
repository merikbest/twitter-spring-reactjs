import { testAction } from "../../../../util/test-utils/test-helper";
import {
    fetchListFollowers,
    fetchListMembers,
    fetchListMembersByUsername,
    processUserToListMembers,
    resetListMembers,
    resetListMembersState,
    resetListSuggested,
    setListMembers,
    setListSuggested,
    setLoadingMembersState,
    setLoadingSuggestedState,
    setUserToList
} from "../actionCreators";
import { ListMembersActionsType } from "../contracts/actionTypes";
import { ListsOwnerMemberResponse } from "../../../../types/lists";
import { LoadingStatus } from "../../../../types/common";

describe("listMembers actions", () => {
    testAction(setListMembers, setListMembers([{ id: 1 }] as ListsOwnerMemberResponse[]), {
        type: ListMembersActionsType.SET_LIST_MEMBERS,
        payload: [{ id: 1 }] as ListsOwnerMemberResponse[]
    });

    testAction(setListSuggested, setListSuggested([{ id: 1 }] as ListsOwnerMemberResponse[]), {
        type: ListMembersActionsType.SET_LIST_SUGGESTED,
        payload: [{ id: 1 }] as ListsOwnerMemberResponse[]
    });

    testAction(fetchListMembers, fetchListMembers({ listId: 1, listOwnerId: 2 }), {
        type: ListMembersActionsType.FETCH_LIST_MEMBERS,
        payload: { listId: 1, listOwnerId: 2 }
    });

    testAction(fetchListFollowers, fetchListFollowers({ listId: 1, listOwnerId: 2 }), {
        type: ListMembersActionsType.FETCH_LIST_FOLLOWERS,
        payload: { listId: 1, listOwnerId: 2 }
    });

    testAction(fetchListMembersByUsername, fetchListMembersByUsername({ listId: 1, username: "test" }), {
        type: ListMembersActionsType.FETCH_LIST_MEMBERS_BY_USERNAME,
        payload: { listId: 1, username: "test" }
    });

    testAction(processUserToListMembers, processUserToListMembers({ userId: 1, listId: 1 }), {
        type: ListMembersActionsType.PROCESS_USER_TO_LIST_MEMBERS,
        payload: { userId: 1, listId: 1 }
    });

    testAction(setUserToList, setUserToList({ userId: 1, isUserAdded: true, isSuggested: true }), {
        type: ListMembersActionsType.SET_USER_TO_LIST,
        payload: { userId: 1, isUserAdded: true, isSuggested: true }
    });

    testAction(resetListMembersState, resetListMembersState(), {
        type: ListMembersActionsType.RESET_LIST_MEMBERS_STATE
    });

    testAction(resetListMembers, resetListMembers(), {
        type: ListMembersActionsType.RESET_LIST_MEMBERS
    });

    testAction(resetListSuggested, resetListSuggested(), {
        type: ListMembersActionsType.RESET_LIST_SUGGESTED_STATE
    });

    testAction(setLoadingMembersState, setLoadingMembersState(LoadingStatus.LOADING), {
        type: ListMembersActionsType.SET_LOADING_MEMBERS_STATE,
        payload: LoadingStatus.LOADING
    });

    testAction(setLoadingSuggestedState, setLoadingSuggestedState(LoadingStatus.LOADING), {
        type: ListMembersActionsType.SET_LOADING_SUGGESTED_STATE,
        payload: LoadingStatus.LOADING
    });
});
