package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.dto.request.IdsRequest;
import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.feign.UserClient;
import com.gmail.merikbest2015.model.Chat;
import com.gmail.merikbest2015.model.ChatMessage;
import com.gmail.merikbest2015.model.ChatParticipant;
import com.gmail.merikbest2015.repository.ChatMessageRepository;
import com.gmail.merikbest2015.repository.ChatParticipantRepository;
import com.gmail.merikbest2015.repository.ChatRepository;
import com.gmail.merikbest2015.repository.projection.ChatMessageProjection;
import com.gmail.merikbest2015.repository.projection.ChatProjection;
import com.gmail.merikbest2015.service.ChatMessageService;
import com.gmail.merikbest2015.service.util.ChatServiceHelper;
import com.gmail.merikbest2015.util.AuthUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import static com.gmail.merikbest2015.constants.ErrorMessage.CHAT_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class ChatMessageServiceImpl implements ChatMessageService {

    private final ChatRepository chatRepository;
    private final ChatParticipantRepository chatParticipantRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final ChatServiceHelper chatServiceHelper;
    private final UserClient userClient;

    @Override
    @Transactional(readOnly = true)
    public List<ChatMessageProjection> getChatMessages(Long chatId) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        chatRepository.getChatById(chatId, authUserId, ChatProjection.class)
                .orElseThrow(() -> new ApiRequestException(CHAT_NOT_FOUND, HttpStatus.NOT_FOUND));
        return chatMessageRepository.getChatMessages(chatId);
    }

    @Override
    @Transactional
    public Long readChatMessages(Long chatId) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        chatRepository.getChatById(chatId, authUserId, ChatProjection.class)
                .orElseThrow(() -> new ApiRequestException(CHAT_NOT_FOUND, HttpStatus.NOT_FOUND));
        chatMessageRepository.readChatMessages(chatId, authUserId);
        return chatMessageRepository.getUnreadMessagesCount(authUserId);
    }

    @Override
    @Transactional
    public Map<Long, ChatMessageProjection> addMessage(ChatMessage chatMessage, Long chatId) {
        chatServiceHelper.checkChatMessageLength(chatMessage.getText());
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        Chat chat = chatRepository.getChatById(chatId, authUserId, Chat.class)
                .orElseThrow(() -> new ApiRequestException(CHAT_NOT_FOUND, HttpStatus.NOT_FOUND));
        Long chatParticipantId = chatParticipantRepository.getChatParticipantId(authUserId, chatId);
        chatServiceHelper.isParticipantBlocked(authUserId, chatParticipantId);
        chatMessage.setAuthorId(authUserId);
        chatMessage.setChat(chat);
        chatMessageRepository.save(chatMessage);
        chatParticipantRepository.updateParticipantWhoLeftChat(chatParticipantId, chatId);
        chat.getMessages().add(chatMessage);
        ChatMessageProjection message = chatMessageRepository.getChatMessageById(chatMessage.getId()).get();
        return chatParticipantRepository.getChatParticipantIds(chatId).stream()
                .collect(Collectors.toMap(Function.identity(), (userId) -> message));
    }

    @Override
    @Transactional
    public Map<Long, ChatMessageProjection> addMessageWithTweet(String text, Long tweetId, List<Long> usersIds) {
        chatServiceHelper.isTweetExists(tweetId);
        List<Long> validUserIds = userClient.validateChatUsersIds(new IdsRequest(usersIds));
        Map<Long, ChatMessageProjection> chatParticipants = new HashMap<>();
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        validUserIds.forEach(userId -> {
            ChatMessage chatMessage = new ChatMessage(text, tweetId, authUserId);
            Chat chat = chatRepository.getChatByParticipants(authUserId, userId);
            Boolean isUserBlockedByMyProfile = userClient.isMyProfileBlockedByUser(userId);

            if (chat == null && !isUserBlockedByMyProfile) {
                Chat newChat = new Chat();
                chatRepository.save(newChat);
                ChatParticipant authorParticipant = chatParticipantRepository.save(new ChatParticipant(authUserId, newChat));
                ChatParticipant userParticipant = chatParticipantRepository.save(new ChatParticipant(userId, newChat));
                newChat.setParticipants(List.of(authorParticipant, userParticipant));
                chatMessage.setChat(newChat);
                chatMessageRepository.save(chatMessage);
                newChat.getMessages().add(chatMessage);
            } else if (!isUserBlockedByMyProfile) {
                chatMessage.setChat(chat);
                chatMessageRepository.save(chatMessage);
                chatParticipantRepository.updateParticipantWhoLeftChat(userId, chat.getId());
                chat.getMessages().add(chatMessage);
            }
            ChatMessageProjection message = chatMessageRepository.getChatMessageById(chatMessage.getId()).get();
            chatParticipants.put(userId, message);
        });
        return chatParticipants;
    }
}
