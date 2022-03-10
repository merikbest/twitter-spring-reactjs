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
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class ChatMapper {

    private final BasicMapper basicMapper;
    private final ChatService chatService;

    private ChatMessageResponse getChatMessageResponse(Map<String, Object> messageMap) {
        ChatMessageProjection chatMessageProjection = (ChatMessageProjection) messageMap.get("message");
        ChatMessageResponse message = basicMapper.convertToResponse(chatMessageProjection, ChatMessageResponse.class);
        message.setChatParticipantsIds((List<Long>) messageMap.get("chatParticipantsIds"));
        return message;
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

    public Integer readChatMessages(Long chatId) {
        return chatService.readChatMessages(chatId);
    }

    public ChatMessageResponse addMessage(ChatMessageRequest chatMessageRequest) {
        Map<String, Object> messageMap = chatService.addMessage(
                basicMapper.convertToEntity(chatMessageRequest, ChatMessage.class), chatMessageRequest.getChatId());
        return getChatMessageResponse(messageMap);
    }

    public ChatMessageResponse addMessageWithTweet(MessageWithTweetRequest request) {
        Map<String, Object> messageMap = chatService.addMessageWithTweet(request.getText(), request.getTweetId(), request.getUsersIds());
        return getChatMessageResponse(messageMap);
    }

    public String leaveFromConversation(Long participantId, Long chatId) {
        return chatService.leaveFromConversation(participantId, chatId);
    }

    public UserResponse getParticipant(Long participantId, Long chatId) {
        UserProjection participant = chatService.getParticipant(participantId, chatId);
        return basicMapper.convertToResponse(participant, UserResponse.class);
    }
}
