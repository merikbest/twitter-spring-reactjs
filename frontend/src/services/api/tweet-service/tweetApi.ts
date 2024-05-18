import { AxiosResponse } from "axios";

import { TweetAdditionalInfoResponse, TweetImageResponse, TweetResponse } from "../../../types/tweet";
import { axios } from "../../../core/axios";
import {
    UI_V1_TWEETS,
    UI_V1_TWEETS_CHANGE_REPLY,
    UI_V1_TWEETS_FOLLOWER,
    UI_V1_TWEETS_ID,
    UI_V1_TWEETS_IMAGE_TAGGED,
    UI_V1_TWEETS_IMAGES_USER_ID,
    UI_V1_TWEETS_ID_INFO,
    UI_V1_TWEETS_MEDIA,
    UI_V1_TWEETS_MEDIA_USER_ID,
    UI_V1_TWEETS_QUOTE,
    UI_V1_TWEETS_ID_QUOTES,
    UI_V1_TWEETS_ID_REPLIES,
    UI_V1_TWEETS_REPLY,
    UI_V1_TWEETS_SEARCH_TEXT,
    UI_V1_TWEETS_UPLOAD,
    UI_V1_TWEETS_USER_ID,
    UI_V1_TWEETS_VIDEO
} from "../../../constants/endpoint-constants";
import { UserTweetRequest } from "../../../store/ducks/userTweets/contracts/state";
import { Image } from "../../../types/common";
import {
    AddQuoteTweetRequest,
    ChangeReplyTypeRequest,
    TweetRequest
} from "../../../store/ducks/tweets/contracts/state";
import { FetchTweetUsersPayload, ReplyTweetRequest } from "../../../store/ducks/tweet/contracts/state";
import { UserResponse } from "../../../types/user";

export const TweetApi = {
    async getTweets(pageNumber: number): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(UI_V1_TWEETS, { params: { page: pageNumber } });
    },
    async getTweetById(tweetId: number): Promise<AxiosResponse<TweetResponse>> {
        return await axios.get<TweetResponse>(UI_V1_TWEETS_ID(tweetId));
    },
    async getUserTweets({ userId, page }: UserTweetRequest): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(UI_V1_TWEETS_USER_ID(userId), { params: { page: page } });
    },
    async getUserMediaTweets({ userId, page }: UserTweetRequest): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(UI_V1_TWEETS_MEDIA_USER_ID(userId), { params: { page: page } });
    },
    async getUserTweetImages(userId: number): Promise<AxiosResponse<TweetImageResponse[]>> {
        return await axios.get<TweetImageResponse[]>(UI_V1_TWEETS_IMAGES_USER_ID(userId));
    },
    async getTweetAdditionalInfoById(tweetId: number): Promise<AxiosResponse<TweetAdditionalInfoResponse>> {
        return await axios.get<TweetAdditionalInfoResponse>(UI_V1_TWEETS_ID_INFO(tweetId));
    },
    async getRepliesByTweetId(tweetId: number): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(UI_V1_TWEETS_ID_REPLIES(tweetId));
    },
    async getQuotesByTweetId(tweetId: number, pageNumber: number): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(UI_V1_TWEETS_ID_QUOTES(tweetId), { params: { page: pageNumber } });
    },
    async getMediaTweets(pageNumber: number): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(UI_V1_TWEETS_MEDIA, { params: { page: pageNumber } });
    },
    async getTweetsWithVideo(pageNumber: number): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(UI_V1_TWEETS_VIDEO, { params: { page: pageNumber } });
    },
    async getFollowersTweets(pageNumber: number): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(UI_V1_TWEETS_FOLLOWER, { params: { page: pageNumber } });
    },
    async uploadTweetImage(formData: FormData): Promise<AxiosResponse<Image>> {
        return await axios.post<Image>(UI_V1_TWEETS_UPLOAD, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    },
    async getTaggedImageUsers({ tweetId, pageNumber }: FetchTweetUsersPayload): Promise<AxiosResponse<UserResponse[]>> {
        return await axios.get<UserResponse[]>(`${UI_V1_TWEETS_IMAGE_TAGGED}/${tweetId}`, { params: { page: pageNumber } });
    },
    async createTweet(request: TweetRequest): Promise<AxiosResponse<TweetResponse>> {
        return await axios.post<TweetResponse>(UI_V1_TWEETS, request);
    },
    async deleteTweet(tweetId: number): Promise<AxiosResponse<string>> {
        return await axios.delete<string>(`${UI_V1_TWEETS}/${tweetId}`);
    },
    async searchTweets(text: string, pageNumber: number): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(UI_V1_TWEETS_SEARCH_TEXT(text), { params: { page: pageNumber } });
    },
    async replyTweet(request: ReplyTweetRequest): Promise<AxiosResponse<TweetResponse>> {
        return await axios.post<TweetResponse>(`${UI_V1_TWEETS_REPLY}/${request.userId ?? 0}/${request.tweetId}`, request);
    },
    async quoteTweet(request: AddQuoteTweetRequest): Promise<AxiosResponse<TweetResponse>> {
        return await axios.post<TweetResponse>(`${UI_V1_TWEETS_QUOTE}/${request.userId ?? 0}/${request.tweetId}`, request);
    },
    async changeTweetReplyType(request: ChangeReplyTypeRequest): Promise<AxiosResponse<TweetResponse>> {
        return await axios.get<TweetResponse>(`${UI_V1_TWEETS_CHANGE_REPLY}/${request.userId ?? 0}/${request.tweetId}`,
            { params: { replyType: request.replyType } });
    }
};
