package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.dto.HeaderResponse;
import com.gmail.merikbest2015.dto.UserResponse;
import com.gmail.merikbest2015.dto.response.UserChatResponse;
import com.gmail.merikbest2015.model.ChatMessage;
import com.gmail.merikbest2015.repository.projection.ChatMessageProjection;
import com.gmail.merikbest2015.repository.projection.ChatProjection;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;

public interface ChatService {

    ChatProjection getChatById(Long chatId);

    List<ChatProjection> getUserChats();

    ChatProjection createChat(Long userId);

    List<ChatMessageProjection> getChatMessages(Long chatId);

    Long readChatMessages(Long chatId);

    Map<Long, ChatMessageProjection> addMessage(ChatMessage chatMessage, Long chatId);

    Map<Long, ChatMessageProjection> addMessageWithTweet(String text, Long tweetId, List<Long> usersIds);

    UserResponse getParticipant(Long participantId, Long chatId);

    String leaveFromConversation(Long participantId, Long chatId);

    HeaderResponse<UserChatResponse> searchUsersByUsername(String username, Pageable pageable);
}
