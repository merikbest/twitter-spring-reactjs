package com.gmail.merikbest2015.twitterspringreactjs.mapper;

import com.gmail.merikbest2015.twitterspringreactjs.dto.request.ChatMessageRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.MessageWithTweetRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.ChatMessageResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.ChatResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.UserResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.projection.chats.ChatMessageProjectionResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.projection.chats.ChatProjectionResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.projection.lists.ListProjectionResponse;
import com.gmail.merikbest2015.twitterspringreactjs.model.Chat;
import com.gmail.merikbest2015.twitterspringreactjs.model.ChatMessage;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.chat.ChatMessageProjection;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.chat.ChatParticipantProjection;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.chat.ChatProjection;
import com.gmail.merikbest2015.twitterspringreactjs.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ChatMapper {

    private final ModelMapper modelMapper;
    private final ChatService chatService;
    private final UserMapper userMapper;

    private ChatMessage convertToChatMessageEntity(ChatMessageRequest chatMessageRequest) {
        return modelMapper.map(chatMessageRequest, ChatMessage.class);
    }

    private ChatResponse convertToChatResponse(Chat chat) {
        return modelMapper.map(chat, ChatResponse.class);
    }

    private List<ChatResponse> convertListToChatResponse(List<Chat> chats) {
        return chats.stream()
                .map(this::convertToChatResponse)
                .collect(Collectors.toList());
    }

    private ChatMessageResponse convertToChatMessageResponse(ChatMessage chatMessage) {
        return modelMapper.map(chatMessage, ChatMessageResponse.class);
    }

    private List<ChatMessageResponse> convertListToChatMessageResponse(List<ChatMessage> chatMessages) {
        return chatMessages.stream()
                .map(this::convertToChatMessageResponse)
                .collect(Collectors.toList());
    }

    public List<ChatProjectionResponse> getUserChats() {
        List<ChatProjection> userChats = chatService.getUserChats();
        return userChats.contains(null) ? new ArrayList<>() : userChats.stream()
                .map(chat -> modelMapper.map(chat, ChatProjectionResponse.class))
                .collect(Collectors.toList());
    }

    public ChatProjectionResponse createChat(Long userId) {
        ChatProjection chat = chatService.createChat(userId);
        return modelMapper.map(chat, ChatProjectionResponse.class);
    }

    public List<ChatMessageProjectionResponse> getChatMessages(Long chatId) {
        List<ChatMessageProjection> chatMessages = chatService.getChatMessages(chatId);
        return chatMessages.contains(null) ? new ArrayList<>() : chatMessages.stream()
                .map(message -> modelMapper.map(message, ChatMessageProjectionResponse.class))
                .collect(Collectors.toList());
    }

    public UserResponse readChatMessages(Long chatId) {
        return userMapper.convertToUserResponse(chatService.readChatMessages(chatId));
    }

    public ChatMessageResponse addMessage(ChatMessageRequest chatMessageRequest) {
        return convertToChatMessageResponse(chatService.addMessage(
                convertToChatMessageEntity(chatMessageRequest), chatMessageRequest.getChatId()));
    }

    public List<ChatMessageResponse> addMessageWithTweet(MessageWithTweetRequest request) {
        return convertListToChatMessageResponse(chatService.addMessageWithTweet(
                request.getText(), request.getTweet(), request.getUsers()));
    }

    public String leaveFromConversation(Long participantId, Long chatId) {
        return chatService.leaveFromConversation(participantId, chatId);
    }

    public UserResponse getParticipant(Long participantId, Long chatId) {
        return userMapper.convertToUserResponse(chatService.getParticipant(participantId, chatId));
    }
}
