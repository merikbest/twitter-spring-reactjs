import {combineReducers} from "redux";
import {tweetsReducer} from "./ducks/tweets/reducer";

export const rootReducer = combineReducers({
    tweets: tweetsReducer
});
