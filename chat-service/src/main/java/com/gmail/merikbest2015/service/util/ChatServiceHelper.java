package com.gmail.merikbest2015.service.util;

import com.gmail.merikbest2015.dto.response.chat.ChatTweetResponse;
import com.gmail.merikbest2015.dto.response.chat.ChatUserParticipantResponse;
import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.feign.TweetClient;
import com.gmail.merikbest2015.feign.UserClient;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import static com.gmail.merikbest2015.constants.ErrorMessage.*;

@Component
@RequiredArgsConstructor
public class ChatServiceHelper {

    private final UserClient userClient;
    private final TweetClient tweetClient;

    public ChatUserParticipantResponse getChatParticipant(Long userId) {
        return userClient.getChatParticipant(userId);
    }

    public ChatTweetResponse getChatTweet(Long tweetId) {
        return tweetClient.getChatTweet(tweetId);
    }

    public void isParticipantBlocked(Long authUserId, Long userId) {
        if (userClient.isUserBlockedByMyProfile(authUserId) || userClient.isMyProfileBlockedByUser(userId)) {
            throw new ApiRequestException(CHAT_PARTICIPANT_BLOCKED, HttpStatus.BAD_REQUEST);
        }
    }

    public void checkChatMessageLength(String text) {
        if (text.length() == 0) {
            throw new ApiRequestException(INCORRECT_CHAT_MESSAGE_LENGTH, HttpStatus.BAD_REQUEST);
        }
    }

    public void isTweetExists(Long tweetId) {
        if (!tweetClient.isTweetExists(tweetId)) {
            throw new ApiRequestException(TWEET_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
    }

    public void isUserExists(Long userId) {
        if (!userClient.isUserExists(userId)) {
            throw new ApiRequestException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
    }
}
