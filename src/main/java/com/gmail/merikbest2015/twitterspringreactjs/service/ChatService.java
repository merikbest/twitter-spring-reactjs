package com.gmail.merikbest2015.twitterspringreactjs.service;

import com.gmail.merikbest2015.twitterspringreactjs.model.ChatMessage;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.chat.ChatMessageProjection;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.chat.ChatProjection;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.user.BaseUserProjection;

import java.util.List;
import java.util.Map;

public interface ChatService {

    List<ChatProjection> getUserChats();

    ChatProjection createChat(Long userId);

    List<ChatMessageProjection> getChatMessages(Long chatId);

    Integer readChatMessages(Long chatId);

    Map<String, Object> addMessage(ChatMessage chatMessage, Long chatId);

    List<ChatMessageProjection> addMessageWithTweet(String text, Long tweetId, List<Long> usersIds);

    BaseUserProjection getParticipant(Long participantId, Long chatId);

    String leaveFromConversation(Long participantId, Long chatId);
}
