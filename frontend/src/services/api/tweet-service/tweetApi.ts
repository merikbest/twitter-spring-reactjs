import { AxiosResponse } from "axios";

import { TweetAdditionalInfoResponse, TweetImageResponse, TweetResponse } from "../../../types/tweet";
import { axios } from "../../../core/axios";
import {
    API_TWEETS,
    API_TWEETS_CHANGE_REPLY,
    API_TWEETS_FOLLOWER,
    API_TWEETS_IMAGES,
    API_TWEETS_INFO,
    API_TWEETS_MEDIA,
    API_TWEETS_QUOTE,
    API_TWEETS_QUOTES,
    API_TWEETS_REPLIES,
    API_TWEETS_REPLY,
    API_TWEETS_SEARCH,
    API_TWEETS_UPLOAD,
    API_TWEETS_USER_MEDIA,
    API_TWEETS_USER_TWEETS,
    API_TWEETS_VIDEO
} from "../../../constants/endpoint-constants";
import { UserTweetRequest } from "../../../store/ducks/userTweets/contracts/state";
import { Image } from "../../../types/common";
import { AddQuoteTweet, AddTweet, ChangeReplyTypeRequest } from "../../../store/ducks/tweets/contracts/state";
import { ReplyTweet } from "../../../store/ducks/tweet/contracts/state";

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
    async uploadTweetImage(formData: FormData): Promise<AxiosResponse<Image>> {
        return await axios.post<Image>(API_TWEETS_UPLOAD, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    },
    async createTweet(request: AddTweet): Promise<AxiosResponse<TweetResponse>> {
        return await axios.post<TweetResponse>(API_TWEETS, request);
    },
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
    }
};
