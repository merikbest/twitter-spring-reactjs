import {combineReducers} from "redux";

import {tweetsReducer} from "./ducks/tweets/reducer";
import {tweetReducer} from "./ducks/tweet/reducer";
import {tagsReducer} from "./ducks/tags/reducer";
import {usersReducer} from "./ducks/users/reducer";
import {userReducer} from "./ducks/user/reducer";

export const rootReducer = combineReducers({
    tweets: tweetsReducer,
    tweet: tweetReducer,
    tags: tagsReducer,
    users: usersReducer,
    user: userReducer
});
