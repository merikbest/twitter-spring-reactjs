package com.gmail.merikbest2015.twitterspringreactjs.mapper;

import com.gmail.merikbest2015.twitterspringreactjs.dto.request.ChatMessageRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.MessageWithTweetRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.BaseUserResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.chats.ChatMessageResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.chats.ChatResponse;
import com.gmail.merikbest2015.twitterspringreactjs.model.ChatMessage;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.chat.ChatMessageProjection;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.chat.ChatProjection;
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
    private final UserMapper userMapper;
    private final ChatService chatService;

    private ChatMessage convertToChatMessageEntity(ChatMessageRequest chatMessageRequest) {
        return modelMapper.map(chatMessageRequest, ChatMessage.class);
    }

    private ChatResponse convertToChatResponse(ChatProjection chat) {
        return modelMapper.map(chat, ChatResponse.class);
    }

    private List<ChatResponse> convertListToChatResponse(List<ChatProjection> chats) {
        return chats.stream()
                .map(this::convertToChatResponse)
                .collect(Collectors.toList());
    }

    private ChatMessageResponse convertToChatMessageResponse(ChatMessageProjection chatMessage) {
        return modelMapper.map(chatMessage, ChatMessageResponse.class);
    }

    private List<ChatMessageResponse> convertListToChatMessageResponse(List<ChatMessageProjection> chatMessages) {
        return chatMessages.stream()
                .map(this::convertToChatMessageResponse)
                .collect(Collectors.toList());
    }

    public List<ChatResponse> getUserChats() {
        return convertListToChatResponse(chatService.getUserChats());
    }

    public ChatResponse createChat(Long userId) {
        return convertToChatResponse(chatService.createChat(userId));
    }

    public List<ChatMessageResponse> getChatMessages(Long chatId) {
        List<ChatMessageProjection> chatMessages = chatService.getChatMessages(chatId);
        return chatMessages.contains(null) ? new ArrayList<>() : convertListToChatMessageResponse(chatMessages);
    }

    public Integer readChatMessages(Long chatId) {
        return chatService.readChatMessages(chatId);
    }

    public ChatMessageResponse addMessage(ChatMessageRequest chatMessageRequest) {
        Map<String, Object> messageMap = chatService.addMessage(
                convertToChatMessageEntity(chatMessageRequest), chatMessageRequest.getChatId());
        ChatMessageResponse message = convertToChatMessageResponse((ChatMessageProjection) messageMap.get("message"));
        message.setChatParticipantsIds((List<Long>) messageMap.get("chatParticipantsIds"));
        return message;
    }

    public List<ChatMessageResponse> addMessageWithTweet(MessageWithTweetRequest request) {
        return convertListToChatMessageResponse(
                chatService.addMessageWithTweet(request.getText(), request.getTweet(), request.getUsers()));
    }

    public String leaveFromConversation(Long participantId, Long chatId) {
        return chatService.leaveFromConversation(participantId, chatId);
    }

    public BaseUserResponse getParticipant(Long participantId, Long chatId) {
        return userMapper.convertToBaseUserResponse(chatService.getParticipant(participantId, chatId));
    }
}
