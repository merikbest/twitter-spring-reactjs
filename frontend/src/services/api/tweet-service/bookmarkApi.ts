import { AxiosResponse } from "axios";

import { TweetResponse } from "../../../types/tweet";
import { axios } from "../../../core/axios";
import {
    UI_V1_TWEETS_ID_BOOKMARKED,
    UI_V1_TWEETS_USER_BOOKMARKS,
    UI_V1_TWEETS_USER_BOOKMARKS_TWEET_ID
} from "../../../constants/endpoint-constants";

export const BookmarkApi = {
    async getUserBookmarks(pageNumber: number): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(UI_V1_TWEETS_USER_BOOKMARKS, { params: { page: pageNumber } });
    },
    async processUserBookmarks(tweetId: number): Promise<AxiosResponse<boolean>> {
        return await axios.get<boolean>(UI_V1_TWEETS_USER_BOOKMARKS_TWEET_ID(tweetId));
    },
    async getIsTweetBookmarked(tweetId: number): Promise<AxiosResponse<boolean>> {
        return await axios.get<boolean>(UI_V1_TWEETS_ID_BOOKMARKED(tweetId));
    }
};
