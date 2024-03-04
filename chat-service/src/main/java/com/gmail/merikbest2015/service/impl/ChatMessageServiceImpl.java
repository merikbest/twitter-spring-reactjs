package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.model.Chat;
import com.gmail.merikbest2015.model.ChatMessage;
import com.gmail.merikbest2015.model.ChatParticipant;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.ChatMessageRepository;
import com.gmail.merikbest2015.repository.ChatParticipantRepository;
import com.gmail.merikbest2015.repository.ChatRepository;
import com.gmail.merikbest2015.repository.projection.ChatMessageProjection;
import com.gmail.merikbest2015.repository.projection.ChatProjection;
import com.gmail.merikbest2015.service.ChatMessageService;
import com.gmail.merikbest2015.service.UserService;
import com.gmail.merikbest2015.service.util.ChatServiceHelper;
import com.gmail.merikbest2015.util.AuthUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.gmail.merikbest2015.constants.ErrorMessage.CHAT_NOT_FOUND;
import static com.gmail.merikbest2015.constants.ErrorMessage.CHAT_PARTICIPANT_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class ChatMessageServiceImpl implements ChatMessageService {

    private final ChatRepository chatRepository;
    private final ChatParticipantRepository chatParticipantRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final ChatServiceHelper chatServiceHelper;
    private final UserService userService;

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
        User authUser = userService.getAuthUser();
        Chat chat = chatRepository.getChatById(chatId, authUser.getId(), Chat.class)
                .orElseThrow(() -> new ApiRequestException(CHAT_NOT_FOUND, HttpStatus.NOT_FOUND));
        ChatParticipant chatParticipant = chatParticipantRepository.getChatParticipantExcludeUserId(authUser.getId(), chatId)
                .orElseThrow(() -> new ApiRequestException(CHAT_PARTICIPANT_NOT_FOUND, HttpStatus.NOT_FOUND));
        userService.isParticipantBlocked(authUser.getId(), chatParticipant.getUser().getId());
        chatMessage.setAuthor(authUser);
        chatMessage.setChat(chat);
        chatMessageRepository.save(chatMessage);
        chatParticipantRepository.updateParticipantWhoLeftChat(chatParticipant.getUser().getId(), chat.getId());
        chat.getMessages().add(chatMessage);
        ChatMessageProjection message = chatMessageRepository.getChatMessageById(chatMessage.getId()).get();
        return chat.getParticipants().stream()
                .collect(Collectors.toMap(cp -> cp.getUser().getId(), userId -> message));
    }

    @Override
    @Transactional
    public Map<Long, ChatMessageProjection> addMessageWithTweet(String text, Long tweetId, List<Long> usersIds) {
        chatServiceHelper.isTweetExists(tweetId);
        Map<Long, ChatMessageProjection> chatParticipants = new HashMap<>();
        User authUser = userService.getAuthUser();
        userService.getNotBlockedUsers(usersIds).forEach(user -> {
            ChatMessage chatMessage = new ChatMessage(text, tweetId, authUser);
            Chat chat = chatRepository.getChatByParticipants(authUser.getId(), user.getId());

            if (chat == null) {
                Chat newChat = new Chat();
                newChat.getParticipants().add(new ChatParticipant(newChat, authUser));
                newChat.getParticipants().add(new ChatParticipant(newChat, user));
                chatRepository.save(newChat);
                chatMessage.setChat(newChat);
                chatMessageRepository.save(chatMessage);
                newChat.getMessages().add(chatMessage);
            } else {
                chatMessage.setChat(chat);
                chatMessageRepository.save(chatMessage);
                chatParticipantRepository.updateParticipantWhoLeftChat(user.getId(), chat.getId());
                chat.getMessages().add(chatMessage);
            }
            ChatMessageProjection message = chatMessageRepository.getChatMessageById(chatMessage.getId()).get();
            chatParticipants.put(user.getId(), message);
        });
        return chatParticipants;
    }
}
