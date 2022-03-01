import {
    DeleteListActionInterface,
    EditListActionInterface,
    FetchListByIdActionInterface,
    FetchTweetsByListIdActionInterface,
    ListActionType,
    ResetListStateActionInterface,
    SetFollowToFullListActionInterface,
    SetListActionInterface,
    SetListLoadingStateInterface,
    SetListsTweetsActionInterface,
    SetMembersSizeActionInterface,
    SetUnfollowToFullListActionInterface,
} from "./contracts/actionTypes";
import {LoadingStatus} from "../../types";
import {BaseListResponse} from "../../types/lists";
import {TweetResponse} from "../../types/tweet";
import {EditListsRequest} from "./contracts/state";

export const setList = (payload: BaseListResponse): SetListActionInterface => ({ // +
    type: ListActionType.SET_LIST,
    payload
});

export const setFollowToFullList = (): SetFollowToFullListActionInterface => ({ // +
    type: ListActionType.SET_FOLLOW_TO_FULL_LIST,
});

export const setUnfollowToFullList = (): SetUnfollowToFullListActionInterface => ({ // +
    type: ListActionType.SET_UNFOLLOW_TO_FULL_LIST,
});

export const setListsTweets = (payload: TweetResponse[]): SetListsTweetsActionInterface => ({ // +
    type: ListActionType.SET_LIST_TWEETS,
    payload
});

export const setMembersSize = (payload: boolean): SetMembersSizeActionInterface => ({ // +
    type: ListActionType.SET_MEMBERS_SIZE,
    payload
});

export const fetchListById = (payload: number): FetchListByIdActionInterface => ({ // +
    type: ListActionType.FETCH_LIST_BY_ID,
    payload
});

export const fetchTweetsByListId = (payload: { listId: number, pageNumber: number }): FetchTweetsByListIdActionInterface => ({ // +
    type: ListActionType.FETCH_TWEETS_BY_LIST_ID,
    payload
});

export const editList = (payload: EditListsRequest): EditListActionInterface => ({ // +
    type: ListActionType.EDIT_LIST,
    payload
});

export const deleteList = (payload: number): DeleteListActionInterface => ({ // +
    type: ListActionType.DELETE_LIST,
    payload
});

export const resetListState = (): ResetListStateActionInterface => ({ // +
    type: ListActionType.RESET_LIST_STATE,
});

export const setListLoadingState = (payload: LoadingStatus): SetListLoadingStateInterface => ({ // +
    type: ListActionType.SET_LOADING_STATE,
    payload
});
