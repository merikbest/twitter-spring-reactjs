import { AxiosResponse } from "axios";

import { axios } from "../../core/axios";
import {
    AddQuoteTweet,
    AddTweet,
    ChangeReplyTypeRequest,
    TweetActionPayload,
    Vote
} from "../../store/ducks/tweets/contracts/state";
import { FetchTweetUsersPayload, ReplyTweet } from "../../store/ducks/tweet/contracts/state";
import { TweetAdditionalInfoResponse, TweetImageResponse, TweetResponse } from "../../types/tweet";
import { NotificationTweetResponse } from "../../types/notification";
import { UserResponse } from "../../types/user";
import {
    API_TWEETS,
    API_TWEETS_BOOKMARKED,
    API_TWEETS_CHANGE_REPLY,
    API_TWEETS_FOLLOWER,
    API_TWEETS_IMAGES,
    API_TWEETS_INFO,
    API_TWEETS_LIKE,
    API_TWEETS_LIKED_USERS,
    API_TWEETS_MEDIA,
    API_TWEETS_POOL,
    API_TWEETS_QUOTE,
    API_TWEETS_QUOTES,
    API_TWEETS_REPLIES,
    API_TWEETS_REPLY,
    API_TWEETS_RETWEET,
    API_TWEETS_RETWEETED_USERS,
    API_TWEETS_SCHEDULE,
    API_TWEETS_SEARCH,
    API_TWEETS_UPLOAD,
    API_TWEETS_USER_BOOKMARKS,
    API_TWEETS_USER_LIKED,
    API_TWEETS_USER_MEDIA,
    API_TWEETS_USER_MENTIONS,
    API_TWEETS_USER_REPLIES,
    API_TWEETS_USER_TWEETS,
    API_TWEETS_VIDEO,
    API_TWEETS_VOTE
} from "../../constants/endpoint-constants";
import { UserTweetRequest } from "../../store/ducks/userTweets/contracts/state";
import { Image } from "../../types/common";

export const TweetApi = {
    async getTweets(pageNumber: number): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(API_TWEETS, { params: { page: pageNumber } });
    },
    async getTweetById(tweetId: number): Promise<AxiosResponse<TweetResponse>> {
        return await axios.get<TweetResponse>(`${API_TWEETS}/${tweetId}`);
    },
    async getUserTweets({ userId, page }: UserTweetRequest): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(API_TWEETS_USER_TWEETS(userId), { params: { page: page } });
    },
    async getUserMediaTweets({ userId, page }: UserTweetRequest): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(API_TWEETS_USER_MEDIA(userId), { params: { page: page } });
    },
    async getUserMentions(pageNumber: number): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(API_TWEETS_USER_MENTIONS, { params: { page: pageNumber } });
    },
    async getUserTweetImages(userId: number): Promise<AxiosResponse<TweetImageResponse[]>> {
        return await axios.get<TweetImageResponse[]>(`${API_TWEETS_IMAGES}/${userId}`);
    },
    async getTweetAdditionalInfoById(tweetId: number): Promise<AxiosResponse<TweetAdditionalInfoResponse>> {
        return await axios.get<TweetAdditionalInfoResponse>(API_TWEETS_INFO(tweetId));
    },
    async getRepliesByTweetId(tweetId: number): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(API_TWEETS_REPLIES(tweetId));
    },
    async getQuotesByTweetId(tweetId: number, pageNumber: number): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(API_TWEETS_QUOTES(tweetId), { params: { page: pageNumber } });
    },
    async getMediaTweets(pageNumber: number): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(API_TWEETS_MEDIA, { params: { page: pageNumber } });
    },
    async getTweetsWithVideo(pageNumber: number): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(API_TWEETS_VIDEO, { params: { page: pageNumber } });
    },
    async getFollowersTweets(pageNumber: number): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(API_TWEETS_FOLLOWER, { params: { page: pageNumber } });
    },
    // async getScheduledTweets(pageNumber: number): Promise<AxiosResponse<TweetResponse[]>> {
    //     return await axios.get<TweetResponse[]>(API_TWEETS_SCHEDULE, { params: { page: pageNumber } });
    // },
    async createTweet(request: AddTweet): Promise<AxiosResponse<TweetResponse>> {
        return await axios.post<TweetResponse>(API_TWEETS, request);
    },
    // async createScheduledTweet(request: AddTweet): Promise<AxiosResponse<TweetResponse>> {
    //     return await axios.post<TweetResponse>(API_TWEETS_SCHEDULE, request);
    // },
    // async updateScheduledTweet(request: AddTweet): Promise<AxiosResponse<TweetResponse>> {
    //     return await axios.put<TweetResponse>(API_TWEETS_SCHEDULE, request);
    // },
    // async deleteScheduledTweets(request: { tweetsIds: number[] }): Promise<AxiosResponse<string>> {
    //     return await axios.delete<string>(API_TWEETS_SCHEDULE, { data: request });
    // },
    async deleteTweet(tweetId: number): Promise<AxiosResponse<string>> {
        return await axios.delete<string>(`${API_TWEETS}/${tweetId}`);
    },
    async searchTweets(text: string, pageNumber: number): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(`${API_TWEETS_SEARCH}/${text}`, { params: { page: pageNumber } });
    },
    async replyTweet(request: ReplyTweet): Promise<AxiosResponse<TweetResponse>> {
        return await axios.post<TweetResponse>(`${API_TWEETS_REPLY}/${request.userId ?? 0}/${request.tweetId}`, request);
    },
    async quoteTweet(request: AddQuoteTweet): Promise<AxiosResponse<TweetResponse>> {
        return await axios.post<TweetResponse>(`${API_TWEETS_QUOTE}/${request.userId ?? 0}/${request.tweetId}`, request);
    },
    async changeTweetReplyType(request: ChangeReplyTypeRequest): Promise<AxiosResponse<TweetResponse>> {
        return await axios.get<TweetResponse>(`${API_TWEETS_CHANGE_REPLY}/${request.userId ?? 0}/${request.tweetId}`,
            { params: { replyType: request.replyType } });
    },
    // async getUserBookmarks(pageNumber: number): Promise<AxiosResponse<TweetResponse[]>> {
    //     return await axios.get<TweetResponse[]>(API_TWEETS_USER_BOOKMARKS, { params: { page: pageNumber } });
    // },
    // async addTweetToBookmarks(tweetId: number): Promise<AxiosResponse<boolean>> {
    //     return await axios.get<boolean>(`${API_TWEETS_USER_BOOKMARKS}/${tweetId}`);
    // },
    // async getIsTweetBookmarked(tweetId: number): Promise<AxiosResponse<boolean>> {
    //     return await axios.get<boolean>(API_TWEETS_BOOKMARKED(tweetId));
    // },
    // async getUserLikedTweets({ userId, page }: UserTweetRequest): Promise<AxiosResponse<TweetResponse[]>> {
    //     return await axios.get<TweetResponse[]>(API_TWEETS_USER_LIKED(userId), { params: { page: page } });
    // },
    // async getLikedUsersByTweetId({ tweetId, pageNumber }: FetchTweetUsersPayload): Promise<AxiosResponse<UserResponse[]>> {
    //     return await axios.get<UserResponse[]>(API_TWEETS_LIKED_USERS(tweetId), { params: { page: pageNumber } });
    // },
    // async likeTweet({ userId, tweetId }: TweetActionPayload): Promise<AxiosResponse<NotificationTweetResponse>> {
    //     return await axios.get<NotificationTweetResponse>(`${API_TWEETS_LIKE}/${userId ?? 0}/${tweetId}`);
    // },
    // async createPoll(request: AddTweet): Promise<AxiosResponse<TweetResponse>> {
    //     return await axios.post<TweetResponse>(API_TWEETS_POOL, request);
    // },
    // async voteInPoll(payload: Vote): Promise<AxiosResponse<TweetResponse>> {
    //     return await axios.post<TweetResponse>(API_TWEETS_VOTE, payload);
    // },
    // async getUserRetweetsAndReplies({ userId, page }: UserTweetRequest): Promise<AxiosResponse<TweetResponse[]>> {
    //     return await axios.get<TweetResponse[]>(API_TWEETS_USER_REPLIES(userId), { params: { page: page } });
    // },
    // async retweet({ userId, tweetId }: TweetActionPayload): Promise<AxiosResponse<NotificationTweetResponse>> {
    //     return await axios.get<NotificationTweetResponse>(`${API_TWEETS_RETWEET}/${userId ?? 0}/${tweetId}`);
    // },
    // async getRetweetedUsersByTweetId({ tweetId, pageNumber }: FetchTweetUsersPayload): Promise<AxiosResponse<UserResponse[]>> {
    //     return await axios.get<UserResponse[]>(API_TWEETS_RETWEETED_USERS(tweetId), { params: { page: pageNumber } });
    // },
    async uploadTweetImage(formData: FormData): Promise<AxiosResponse<Image>> {
        return await axios.post<Image>(API_TWEETS_UPLOAD, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    }
};
