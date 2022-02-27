package com.gmail.merikbest2015.twitterspringreactjs.mapper;

import com.gmail.merikbest2015.twitterspringreactjs.dto.request.ChatMessageRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.MessageWithTweetRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.UserResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.chats.ChatMessageResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.chats.ChatResponse;
import com.gmail.merikbest2015.twitterspringreactjs.model.ChatMessage;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.chat.ChatMessageProjection;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.chat.ChatProjection;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.user.UserProjection;
import com.gmail.merikbest2015.twitterspringreactjs.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ChatMapper {

    private final ModelMapper modelMapper;
    private final ChatService chatService;

    private ChatMessage convertToChatMessageEntity(ChatMessageRequest chatMessageRequest) {
        return modelMapper.map(chatMessageRequest, ChatMessage.class);
    }

    private <T, S> S convertProjectionToResponse(T user, Class<S> type) {
        return modelMapper.map(user, type);
    }

    private <T, S> List<S> convertProjectionListToResponseList(List<T> users, Class<S> type) {
        return users.stream()
                .map(user -> convertProjectionToResponse(user, type))
                .collect(Collectors.toList());
    }

    public List<ChatResponse> getUserChats() {
        List<ChatProjection> chats = chatService.getUserChats();
        return convertProjectionListToResponseList(chats, ChatResponse.class);
    }

    public ChatResponse createChat(Long userId) {
        ChatProjection chat = chatService.createChat(userId);
        return convertProjectionToResponse(chat, ChatResponse.class);
    }

    public List<ChatMessageResponse> getChatMessages(Long chatId) {
        List<ChatMessageProjection> chatMessages = chatService.getChatMessages(chatId);
        return chatMessages.contains(null)
                ? new ArrayList<>()
                : convertProjectionListToResponseList(chatMessages, ChatMessageResponse.class);
    }

    public Integer readChatMessages(Long chatId) {
        return chatService.readChatMessages(chatId);
    }

    public ChatMessageResponse addMessage(ChatMessageRequest chatMessageRequest) {
        Map<String, Object> messageMap = chatService.addMessage(
                convertToChatMessageEntity(chatMessageRequest), chatMessageRequest.getChatId());
        ChatMessageProjection chatMessageProjection = (ChatMessageProjection) messageMap.get("message");
        ChatMessageResponse message = convertProjectionToResponse(chatMessageProjection, ChatMessageResponse.class);
        message.setChatParticipantsIds((List<Long>) messageMap.get("chatParticipantsIds"));
        return message;
    }

    public List<ChatMessageResponse> addMessageWithTweet(MessageWithTweetRequest request) {
        List<ChatMessageProjection> message = chatService.addMessageWithTweet(request.getText(), request.getTweetId(), request.getUsersIds());
        return convertProjectionListToResponseList(message, ChatMessageResponse.class);
    }

    public String leaveFromConversation(Long participantId, Long chatId) {
        return chatService.leaveFromConversation(participantId, chatId);
    }

    public UserResponse getParticipant(Long participantId, Long chatId) {
        UserProjection participant = chatService.getParticipant(participantId, chatId);
        return convertProjectionToResponse(participant, UserResponse.class);
    }
}
