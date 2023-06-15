import { combineReducers } from "redux";

import { tweetsReducer } from "./ducks/tweets/reducer";
import { tweetReducer } from "./ducks/tweet/reducer";
import { tagsReducer } from "./ducks/tags/reducer";
import { usersReducer } from "./ducks/users/reducer";
import { userReducer } from "./ducks/user/reducer";
import { userTweetsReducer } from "./ducks/userTweets/reducer";
import { userProfileReducer } from "./ducks/userProfile/reducer";
import { usersSearchReducer } from "./ducks/usersSearch/reducer";
import { chatsReducer } from "./ducks/chats/reducer";
import { chatMessagesReducer } from "./ducks/chatMessages/reducer";
import { notificationsReducer } from "./ducks/notifications/reducer";
import { listsReducer } from "./ducks/lists/reducer";
import { listReducer } from "./ducks/list/reducer";
import { followerRequestsReducer } from "./ducks/followerRequests/reducer";
import { blockedAndMutedUsersReducer } from "./ducks/blockedAndMutedUsers/reducer";
import { listMembersReducer } from "./ducks/listMembers/reducer";
import { userDetailReducer } from "./ducks/userDetail/reducer";
import { listDetailReducer } from "./ducks/listDetail/reducer";
import { unsentTweetsReducer } from "./ducks/unsentTweets/reducer";
import { actionSnackbarReducer } from "./ducks/actionSnackbar/reducer";
import { tweetAdditionalInfoReducer } from "./ducks/tweetAdditionalInfo/reducer";
import { chatReducer } from "./ducks/chat/reducer";
import { topicsReducer } from "./ducks/topics/reducer";
import { searchReducer } from "./ducks/search/reducer";
import { addTweetFormReducer } from "./ducks/addTweetForm/reducer";
import { authenticationReducer } from "./ducks/authentication/reducer";

export const rootReducer = combineReducers({
    tweets: tweetsReducer,
    tweet: tweetReducer,
    tags: tagsReducer,
    topics: topicsReducer,
    user: userReducer,
    users: usersReducer,
    userProfile: userProfileReducer,
    userTweets: userTweetsReducer,
    usersSearch: usersSearchReducer,
    chats: chatsReducer,
    chatMessages: chatMessagesReducer,
    notifications: notificationsReducer,
    lists: listsReducer,
    list: listReducer,
    followerRequests: followerRequestsReducer,
    blockedAndMutedUsers: blockedAndMutedUsersReducer,
    listMembers: listMembersReducer,
    userDetail: userDetailReducer,
    listDetail: listDetailReducer,
    unsentTweets: unsentTweetsReducer,
    actionSnackbar: actionSnackbarReducer,
    tweetAdditionalInfo: tweetAdditionalInfoReducer,
    chat: chatReducer,
    search: searchReducer,
    addTweetForm: addTweetFormReducer,
    authentication: authenticationReducer
});
