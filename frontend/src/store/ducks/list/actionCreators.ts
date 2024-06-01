import {
    DeleteListActionInterface,
    DeleteListTweetActionInterface,
    EditListActionInterface,
    FetchListByIdActionInterface,
    FetchTweetsByListIdActionInterface,
    ListActionType,
    ResetListStateActionInterface,
    SetBlockedToListTweetsStateActionInterface,
    SetFollowToListTweetsStateActionInterface,
    SetListActionInterface,
    SetListLoadingStateInterface,
    SetListTweetsActionInterface,
    SetMembersSizeActionInterface,
    SetMutedToListTweetsStateActionInterface,
    SetTweetsLoadingStateInterface,
    SetUpdatedBookmarkedListTweetActionInterface,
    SetUpdatedListTweetActionInterface,
    SetVoteListTweetActionInterface,
    UpdateFollowToFullListActionInterface
} from "./contracts/actionTypes";
import { BaseListResponse } from "../../../types/lists";
import { EditListsRequest, ListState, TweetsByListIdRequest } from "./contracts/state";
import { LoadingStatus, PageableResponse } from "../../../types/common";
import { NotificationReplyResponse, NotificationResponse } from "../../../types/notification";
import { UpdatedBookmarkedTweetPayload } from "../tweets/contracts/state";
import {
    BlockedToTweetsPayload,
    FollowToTweetsPayload,
    MutedToTweetsPayload,
    TweetResponse
} from "../../../types/tweet";

export const setList = (payload: BaseListResponse): SetListActionInterface => ({
    type: ListActionType.SET_LIST,
    payload
});

export const updateFollowToFullList = (payload: boolean): UpdateFollowToFullListActionInterface => ({
    type: ListActionType.UPDATE_FOLLOW_TO_FULL_LIST,
    payload
});

export const setMembersSize = (payload: boolean): SetMembersSizeActionInterface => ({
    type: ListActionType.SET_MEMBERS_SIZE,
    payload
});

export const fetchListById = (payload: number): FetchListByIdActionInterface => ({
    type: ListActionType.FETCH_LIST_BY_ID,
    payload
});

export const fetchTweetsByListId = (payload: TweetsByListIdRequest): FetchTweetsByListIdActionInterface => ({
    type: ListActionType.FETCH_TWEETS_BY_LIST_ID,
    payload
});

export const setListTweets = (payload: PageableResponse<ListState["tweets"]>): SetListTweetsActionInterface => ({
    type: ListActionType.SET_LIST_TWEETS,
    payload
});

export const setUpdatedListTweet = (payload: NotificationResponse | NotificationReplyResponse): SetUpdatedListTweetActionInterface => ({
    type: ListActionType.SET_UPDATED_LIST_TWEET,
    payload
});

export const setUpdatedBookmarkedListTweetTweetsState = (payload: UpdatedBookmarkedTweetPayload): SetUpdatedBookmarkedListTweetActionInterface => ({
    type: ListActionType.SET_UPDATED_BOOKMARKED_LIST_TWEET,
    payload
});

export const setFollowToListTweetsState = (payload: FollowToTweetsPayload): SetFollowToListTweetsStateActionInterface => ({
    type: ListActionType.SET_FOLLOW_TO_LIST_TWEETS_STATE,
    payload
});

export const setBlockedToListTweetsState = (payload: BlockedToTweetsPayload): SetBlockedToListTweetsStateActionInterface => ({
    type: ListActionType.SET_BLOCKED_TO_LIST_TWEETS_STATE,
    payload
});

export const setMutedToListTweetsState = (payload: MutedToTweetsPayload): SetMutedToListTweetsStateActionInterface => ({
    type: ListActionType.SET_MUTED_TO_LIST_TWEETS_STATE,
    payload
});

export const setVoteListTweet = (payload: TweetResponse): SetVoteListTweetActionInterface => ({
    type: ListActionType.SET_VOTE_LIST_TWEET,
    payload
});

export const deleteListTweet = (payload: number): DeleteListTweetActionInterface => ({
    type: ListActionType.DELETE_LIST_TWEET,
    payload
});

export const setTweetsLoadingState = (payload: LoadingStatus): SetTweetsLoadingStateInterface => ({
    type: ListActionType.SET_TWEETS_LOADING_STATE,
    payload
});

export const editList = (payload: EditListsRequest): EditListActionInterface => ({
    type: ListActionType.EDIT_LIST,
    payload
});

export const deleteList = (payload: number): DeleteListActionInterface => ({
    type: ListActionType.DELETE_LIST,
    payload
});

export const resetListState = (): ResetListStateActionInterface => ({
    type: ListActionType.RESET_LIST_STATE
});

export const setListLoadingState = (payload: LoadingStatus): SetListLoadingStateInterface => ({
    type: ListActionType.SET_LOADING_STATE,
    payload
});
