import {combineReducers} from "redux";

import {tweetsReducer} from "./ducks/tweets/reducer";
import {tweetReducer} from "./ducks/tweet/reducer";
import {tagsReducer} from "./ducks/tags/reducer";
import {usersReducer} from "./ducks/users/reducer";
import {userReducer} from "./ducks/user/reducer";
import {userTweetsReducer} from "./ducks/userTweets/reducer";
import {userProfileReducer} from "./ducks/userProfile/reducer";

export const rootReducer = combineReducers({
    tweets: tweetsReducer,
    tweet: tweetReducer,
    tags: tagsReducer,
    user: userReducer,
    users: usersReducer,
    userProfile: userProfileReducer,
    userTweets: userTweetsReducer,
});
