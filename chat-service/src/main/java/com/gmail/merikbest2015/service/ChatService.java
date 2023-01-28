package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.model.ChatMessage;
import com.gmail.merikbest2015.repository.projection.ChatMessageProjection;
import com.gmail.merikbest2015.repository.projection.ChatProjection;

import java.util.List;
import java.util.Map;

public interface ChatService {

    ChatProjection getChatById(Long chatId);

    List<ChatProjection> getUserChats();

    ChatProjection createChat(Long userId);

    List<ChatMessageProjection> getChatMessages(Long chatId);

    Long readChatMessages(Long chatId);

    Map<String, Object> addMessage(ChatMessage chatMessage, Long chatId);

//    Map<String, Object> addMessageWithTweet(String text, Long tweetId, List<Long> usersIds);
//
//    UserProjection getParticipant(Long participantId, Long chatId);
//
//    String leaveFromConversation(Long participantId, Long chatId);
//
//    Page<UserChatProjection> searchUsersByUsername(String username, Pageable pageable);
}
