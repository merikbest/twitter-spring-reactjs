package com.gmail.merikbest2015.mapper;

import com.gmail.merikbest2015.dto.HeaderResponse;
import com.gmail.merikbest2015.dto.UserResponse;
import com.gmail.merikbest2015.dto.request.ChatMessageRequest;
import com.gmail.merikbest2015.dto.request.MessageWithTweetRequest;
import com.gmail.merikbest2015.dto.response.ChatMessageResponse;
import com.gmail.merikbest2015.dto.response.ChatResponse;
import com.gmail.merikbest2015.dto.response.UserChatResponse;
import com.gmail.merikbest2015.model.ChatMessage;
import com.gmail.merikbest2015.repository.projection.ChatMessageProjection;
import com.gmail.merikbest2015.repository.projection.ChatProjection;
import com.gmail.merikbest2015.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class ChatMapper {

    private final BasicMapper basicMapper;
    private final ChatService chatService;

    public ChatResponse getChatById(Long chatId) {
        ChatProjection chat = chatService.getChatById(chatId);
        return basicMapper.convertToResponse(chat, ChatResponse.class);
    }

    public List<ChatResponse> getUserChats() {
        List<ChatProjection> chats = chatService.getUserChats();
        return basicMapper.convertToResponseList(chats, ChatResponse.class);
    }

    public ChatResponse createChat(Long userId) {
        ChatProjection chat = chatService.createChat(userId);
        return basicMapper.convertToResponse(chat, ChatResponse.class);
    }

    public List<ChatMessageResponse> getChatMessages(Long chatId) {
        List<ChatMessageProjection> chatMessages = chatService.getChatMessages(chatId);
        return basicMapper.convertToResponseList(chatMessages, ChatMessageResponse.class);
    }

    public Long readChatMessages(Long chatId) {
        return chatService.readChatMessages(chatId);
    }

    public Map<Long, ChatMessageResponse> addMessage(ChatMessageRequest request) {
        Map<Long, ChatMessageProjection> messages = chatService.addMessage(
                basicMapper.convertToResponse(request, ChatMessage.class), request.getChatId());
        return getChatMessageResponse(messages);
    }

    public Map<Long, ChatMessageResponse> addMessageWithTweet(MessageWithTweetRequest request) {
        Map<Long, ChatMessageProjection> messages = chatService.addMessageWithTweet(
                request.getText(), request.getTweetId(), request.getUsersIds());
        return getChatMessageResponse(messages);
    }

    public String leaveFromConversation(Long participantId, Long chatId) {
        return chatService.leaveFromConversation(participantId, chatId);
    }

    public UserResponse getParticipant(Long participantId, Long chatId) {
        return chatService.getParticipant(participantId, chatId);
    }

    public HeaderResponse<UserChatResponse> searchParticipantsByUsername(String username, Pageable pageable) {
        return chatService.searchUsersByUsername(username, pageable);
    }

    private Map<Long, ChatMessageResponse> getChatMessageResponse(Map<Long, ChatMessageProjection> messages) {
        Map<Long, ChatMessageResponse> messagesResponse = new HashMap<>();
        messages.forEach((userId, messageProjection) -> {
            ChatMessageResponse messageResponse = basicMapper.convertToResponse(messageProjection, ChatMessageResponse.class);
            messagesResponse.put(userId, messageResponse);
        });
        return messagesResponse;
    }
}
