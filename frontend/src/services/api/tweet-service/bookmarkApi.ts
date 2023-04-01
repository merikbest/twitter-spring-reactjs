import { AxiosResponse } from "axios";

import { TweetResponse } from "../../../types/tweet";
import { axios } from "../../../core/axios";
import { API_TWEETS_BOOKMARKED, API_TWEETS_USER_BOOKMARKS } from "../../../constants/endpoint-constants";

export const BookmarkApi = {
    async getUserBookmarks(pageNumber: number): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(API_TWEETS_USER_BOOKMARKS, { params: { page: pageNumber } });
    },
    async processUserBookmarks(tweetId: number): Promise<AxiosResponse<boolean>> {
        return await axios.get<boolean>(`${API_TWEETS_USER_BOOKMARKS}/${tweetId}`);
    },
    async getIsTweetBookmarked(tweetId: number): Promise<AxiosResponse<boolean>> {
        return await axios.get<boolean>(API_TWEETS_BOOKMARKED(tweetId));
    }
};
